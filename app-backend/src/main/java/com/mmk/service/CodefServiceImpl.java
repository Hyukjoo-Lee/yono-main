package com.mmk.service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mmk.dto.MonthlySummary;
import com.mmk.dto.TransDTO;
import com.mmk.entity.UserCardEntity;

import io.codef.api.EasyCodef;
import io.codef.api.EasyCodefServiceType;
import io.codef.api.EasyCodefUtil;

@Service
public class CodefServiceImpl implements CodefService {
    @Value("${CODEF_CLIENT_ID}")
    private String clientId;

    @Value("${CODEF_SECRET}")
    private String clientSecret;

    @Value("${CODEF_PUBLIC_KEY}")
    private String publickey;

    private EasyCodef codef;

    // Connected Id 발급
    @Override
    public String getConId(String organization, String companyId, String companyPwd) {
        codef = new EasyCodef();
        codef.setClientInfoForDemo(clientId, clientSecret);
        codef.setPublicKey(publickey);

        List<HashMap<String, Object>> accountList = new ArrayList<HashMap<String, Object>>();
        HashMap<String, Object> accountMap = getConIdParameterMap(organization, companyId, companyPwd);
        
        accountList.add(accountMap);

        HashMap<String, Object> parameterMap = new HashMap<String, Object>();
        parameterMap.put("accountList", accountList);

        // 계정 등록 요청(Connected ID 발급 요청) - 서비스타입(API:정식, DEMO:데모, SANDBOX:샌드박스)
        String result = "";
        try {
            result = codef.createAccount(EasyCodefServiceType.DEMO, parameterMap);
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = objectMapper.readTree(result);
            String connectedId = jsonNode.path("data").path("connectedId").asText();
            return connectedId;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    private HashMap<String, Object> getConIdParameterMap(String organization, String companyId, String companyPwd) {
        HashMap<String, Object> parameterMap = new HashMap<>();
        parameterMap.put("countryCode", "KR");
        parameterMap.put("businessType", "CD");
        parameterMap.put("clientType", "P");
        parameterMap.put("organization", organization);
        parameterMap.put("loginType", "1");
        parameterMap.put("id", companyId);

        try {
            // RSA암호화가 필요한 필드는 encryptRSA(String plainText, String publicKey) 메서드를 이용해 암호화
            parameterMap.put("password", EasyCodefUtil.encryptRSA(companyPwd, codef.getPublicKey())); // 카드사 비밀번호 입력
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
        return parameterMap;
    }

    // 카드 사용 내역
    public CompletableFuture<List<MonthlySummary>> getCardHistory(UserCardEntity userCardEntity) {
        String productUrl = "/v1/kr/card/p/account/approval-list";

        codef = new EasyCodef();
        codef.setClientInfoForDemo(clientId, clientSecret);
        codef.setPublicKey(publickey);

        String connectedId = userCardEntity.getConnectedId();
        String organization = userCardEntity.getCardEntity().getOrganizationCode();
        String cardNo = userCardEntity.getUserCardNum();
        String cardPwd = userCardEntity.getCardPwd();

        HashMap<String, Object> parameterMap = getCardHistoryParameterMap(connectedId, organization, cardNo, cardPwd);

        return CompletableFuture.supplyAsync(() -> {
            try {
                System.out.println(codef.requestProduct(productUrl, EasyCodefServiceType.DEMO, parameterMap));
                return codef.requestProduct(productUrl, EasyCodefServiceType.DEMO, parameterMap);
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }).thenApply(result -> getCardHistoryprocessResult(result))
                .exceptionally(e -> {
                    e.printStackTrace();
                    return Collections.emptyList();
                });
    }

    private HashMap<String, Object> getCardHistoryParameterMap(String connectedId, String organization, String cardNo, String cardPwd) {
        LocalDate today = LocalDate.now();
        LocalDate twoMonthsAgoFirstDay = today.minusMonths(2).withDayOfMonth(1);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");

        String startDate = twoMonthsAgoFirstDay.format(formatter);
        String endDate = today.format(formatter);

        HashMap<String, Object> parameterMap = new HashMap<>();
        parameterMap.put("connectedId", connectedId);
        parameterMap.put("organization", organization);
        parameterMap.put("startDate", startDate);
        parameterMap.put("endDate", endDate);
        parameterMap.put("orderBy", "1");
        parameterMap.put("cardNo", cardNo);
        parameterMap.put("memberStoreInfoType", "1");
        parameterMap.put("inquiryType", "0");
        try {
            parameterMap.put("카드 비밀번호", EasyCodefUtil.encryptRSA(cardPwd, codef.getPublicKey()));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return parameterMap;
    }

    private List<MonthlySummary> getCardHistoryprocessResult(String result) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);

            String dataArrayJson = objectMapper.readTree(result).get("data").toString();
            List<TransDTO> transactionDTOList = objectMapper.readValue(dataArrayJson,
                    new TypeReference<List<TransDTO>>() {
                    });

            Map<String, Map<String, Integer>> groupedData = transactionDTOList.parallelStream()
                    .collect(Collectors.groupingBy(
                            card -> card.getUsedDate().substring(0, 6),
                            Collectors.groupingBy(
                                    card -> (card.getStoreType() != null && !card.getStoreType().isEmpty())
                                            ? card.getStoreType()
                                            : "기타",
                                    Collectors.summingInt(card -> Integer.parseInt(card.getUsedAmount())))));

            return groupedData.entrySet().stream()
                    .map(entry -> {
                        MonthlySummary summary = new MonthlySummary();
                        summary.setMonth(entry.getKey().substring(4) + "월");
                        summary.setCategoryTotals(entry.getValue());
                        return summary;
                    })
                    .collect(Collectors.toList());
        } catch (Exception e) {
            e.printStackTrace();
            return Collections.emptyList();
        }
    }
}
