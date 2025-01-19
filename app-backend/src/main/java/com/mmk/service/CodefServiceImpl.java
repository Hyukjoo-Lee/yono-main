package com.mmk.service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mmk.dto.CardSummaryDTO;
import com.mmk.dto.MonthlySummary;
import com.mmk.dto.MonthlyTransDTO;
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
        HashMap<String, Object> parameterMap = new HashMap<>(
            Map.of(
                "countryCode", "KR",
                "businessType", "CD",
                "clientType", "P",
                "organization", organization,
                "loginType", "1",
                "id", companyId
            )
        );
        try {
            parameterMap.put("password", EasyCodefUtil.encryptRSA(companyPwd, codef.getPublicKey()));
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
        return parameterMap;
    }


    //카드 월별 사용 내역
    private static final ExecutorService executor = Executors.newFixedThreadPool(10);

    public CompletableFuture<List<MonthlySummary>> getCardHistory(UserCardEntity userCardEntity) {
        long startTime = System.nanoTime();
        String productUrl = "/v1/kr/card/p/account/approval-list";

        codef = new EasyCodef();
        codef.setClientInfoForDemo(clientId, clientSecret);
        codef.setPublicKey(publickey);

        String connectedId = userCardEntity.getCardCompanyEntity().getConnedtedId();
        String organization = userCardEntity.getCardEntity().getOrganizationCode();
        String cardNo = userCardEntity.getUserCardNum();
        String cardPwd = userCardEntity.getCardPwd();

        HashMap<String, Object> parameterMap = getCardHistoryParameterMap(connectedId, organization, cardNo, cardPwd);

        return CompletableFuture.supplyAsync(() -> {
            try {
                String result = codef.requestProduct(productUrl, EasyCodefServiceType.DEMO, parameterMap);
                long endTime = System.nanoTime();
                System.out.println("CODEF 데이터 호출 소요 시간: " + (endTime - startTime) + "ns");
                System.out.println(result);
                return result;
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }, executor)
        .thenApply(result -> getCardHistoryprocessResult(result))
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
        
        HashMap<String, Object> parameterMap = new HashMap<>(
            Map.of(
                "connectedId", connectedId,
                "organization", organization,
                "startDate", startDate,
                "endDate", endDate,
                "orderBy", "1",
                "cardNo", cardNo,
                "memberStoreInfoType", "1",
                "inquiryType", "0"
            )
        );
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
            List<MonthlyTransDTO> transactionDTOList = objectMapper.readValue(dataArrayJson, new TypeReference<List<MonthlyTransDTO>>() {});
    
            Map<String, Map<String, Integer>> groupedData = transactionDTOList.stream()
                .map(card -> new CardSummaryDTO(
                    card.getUsedDate().substring(0, 6),
                    (card.getStoreType() != null && !card.getStoreType().isEmpty()) ? card.getStoreType() : "기타",
                    Integer.parseInt(card.getUsedAmount())
                ))
                .collect(Collectors.groupingBy(
                    CardSummaryDTO::getMonth,
                    Collectors.groupingBy(
                        CardSummaryDTO::getStoreType,
                        Collectors.summingInt(CardSummaryDTO::getUsedAmount)
                    )
                ));
            return groupedData.entrySet().stream()
                .map(entry -> new MonthlySummary(
                    entry.getKey().substring(4) + "월",
                    entry.getValue()
                ))
                .collect(Collectors.toList());
        } catch (Exception e) {
            System.err.println("Error processing card history: " + e.getMessage());
            return Collections.emptyList();
        }
    }
}
