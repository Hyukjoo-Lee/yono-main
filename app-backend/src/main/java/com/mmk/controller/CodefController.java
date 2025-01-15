package com.mmk.controller;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mmk.dto.MonthlySummary;
import com.mmk.dto.TransDTO;

import io.codef.api.EasyCodef;
import io.codef.api.EasyCodefServiceType;
import io.codef.api.EasyCodefUtil;

@RestController
@RequestMapping("/codef")
public class CodefController {
    // codef 회원가입후 DEMO 버전 신청
    // 마이페이지 - 키 관리에서 clindeId, clientSecret 확인
    @Value("${CODEF_CLIENT_ID}")
    private String clientId;

    @Value("${CODEF_SECRET}")
    private String clientSecret;

    @Value("${CODEF_PUBLIC_KEY}")
    private String publickey;

    @Value("${CODEF_CONNECTEDID:defaultValue}")
    private String connectedId;

    private EasyCodef codef;

    @GetMapping("/getToken")
    public void getToken() {
        codef = new EasyCodef();
        codef.setClientInfoForDemo(clientId, clientSecret);

        try {
            String access_token = codef.requestToken(EasyCodefServiceType.DEMO);
            System.out.println("Access Token: " + access_token);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // Connected ID 발급
    @GetMapping("/getConId")
    public void getConId(String organization, String companyId, String companyPwd) {
        codef = new EasyCodef();
        codef.setClientInfoForDemo(clientId, clientSecret);
        codef.setPublicKey(publickey);

        // organization, companyId, companyPwd 로 UserCard Table 에 있는지 조회
        // 없으면 ConnectedId 발급받아서 DB에 넣는 코드 실행

        List<HashMap<String, Object>> accountList = new ArrayList<HashMap<String, Object>>();
        HashMap<String, Object> accountMap = getConIdParameterMap(organization, companyId, companyPwd);
        
        accountList.add(accountMap);

        HashMap<String, Object> parameterMap = new HashMap<String, Object>();
        parameterMap.put("accountList", accountList);

        // 계정 등록 요청(Connected ID 발급 요청) - 서비스타입(API:정식, DEMO:데모, SANDBOX:샌드박스)
        String result = "";
        try {
            result = codef.createAccount(EasyCodefServiceType.DEMO, parameterMap);
        } catch (Exception e) {
            e.printStackTrace();
        }

        // 결과 확인
        System.out.println(result);
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
    @GetMapping("getCardHistory")
    public CompletableFuture<List<MonthlySummary>> getCardHistory() {
        String productUrl = "/v1/kr/card/p/account/approval-list";

        codef = new EasyCodef();
        codef.setClientInfoForDemo(clientId, clientSecret);
        codef.setPublicKey(publickey);

        HashMap<String, Object> parameterMap = getCardHistoryParameterMap();

        return CompletableFuture.supplyAsync(() -> {
            try {
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

    private HashMap<String, Object> getCardHistoryParameterMap() {
        HashMap<String, Object> parameterMap = new HashMap<>();
        parameterMap.put("connectedId", connectedId);
        parameterMap.put("organization", "0302");
        parameterMap.put("startDate", "20241001");
        parameterMap.put("endDate", "20241130");
        parameterMap.put("orderBy", "1");
        parameterMap.put("cardNo", "카드번호입력");
        parameterMap.put("memberStoreInfoType", "1");
        parameterMap.put("inquiryType", "0");
        try {
            parameterMap.put("카드 비밀번호", EasyCodefUtil.encryptRSA("카드 비밀번호", codef.getPublicKey()));
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

    @GetMapping("/getUserCardList")
    public List<Map<String, Object>> getUserCardList() {
        codef = new EasyCodef();
        codef.setClientInfoForDemo(clientId, clientSecret);
        codef.setPublicKey(publickey);
        HashMap<String, Object> parameterMap = new HashMap<>();
        parameterMap.put("connectedId", connectedId);
        parameterMap.put("organization", "0304"); // 기관 코드
        parameterMap.put("inquiryType", "0"); // 카드 이미지 포함 여부
        String productUrl = "/v1/kr/card/p/account/card-list"; // 보유 카드 URL

        try {
            String jsonResult = codef.requestProduct(productUrl, EasyCodefServiceType.DEMO, parameterMap);
            ObjectMapper objectMapper = new ObjectMapper();
            String dataArrayJson = objectMapper.readTree(jsonResult).get("data").toString();

            List<Map<String, Object>> result = objectMapper.readValue(dataArrayJson,
                    new TypeReference<List<Map<String, Object>>>() {
                    });

            if (result == null || result.isEmpty()) {
                throw new RuntimeException("카드 정보가 존재하지 않습니다.");
            }

            List<Map<String, Object>> filteredResult = new ArrayList<>();
            result.forEach(card -> {
                Map<String, Object> filteredCard = new HashMap<>();
                filteredCard.put("cardName", card.get("resCardName"));
                filteredCard.put("cardNo", card.get("resCardNo"));
                filteredCard.put("userName", card.get("resUserNm"));
                filteredCard.put("validPeriod", card.get("resValidPeriod"));
                filteredCard.put("imageLink", card.get("resImageLink"));

                filteredResult.add(filteredCard);
            });

            return filteredResult;

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("카드 리스트 정보 요청에 실패하였습니다.");
        }
    }

    @GetMapping("getUserPerformance")
    public List<Map<String, Object>> getUserPerformance() {
        codef = new EasyCodef();
        codef.setClientInfoForDemo(clientId, clientSecret);
        codef.setPublicKey(publickey);
        HashMap<String, Object> parameterMap = new HashMap<>();
        parameterMap.put("connectedId", connectedId);
        parameterMap.put("organization", "0304");
        String productUrl = "/v1/kr/card/p/account/result-check-list";

        try {
            String jsonResult = codef.requestProduct(productUrl, EasyCodefServiceType.DEMO, parameterMap);
            ObjectMapper objectMapper = new ObjectMapper();
            String dataArrayJson = objectMapper.readTree(jsonResult).get("data").toString();

            List<Map<String, Object>> result = objectMapper.readValue(dataArrayJson,
                    new TypeReference<List<Map<String, Object>>>() {
                    });

            if (result == null || result.isEmpty()) {
                throw new RuntimeException("카드 정보가 존재하지 않습니다.");
            }

            // 카드 이름, 카드 번호, 카드 회사, 혜택 이름, 혜택 카테고리 필터링
            List<Map<String, Object>> filteredResult = new ArrayList<>();

            result.forEach(card -> {
                String cardName = (String) card.get("resCardName");
                String cardNo = (String) card.get("resCardNo");
                String cardCompany = (String) card.get("resCardCompany");

                List<Map<String, Object>> benefitList = objectMapper.convertValue(
                        card.get("resCardBenefitList"),
                        new TypeReference<List<Map<String, Object>>>() {
                        });

                List<Map<String, Object>> benefitInfoList = new ArrayList<>();
                if (benefitList != null) {
                    benefitList.forEach(benefit -> {
                        Map<String, Object> benefitInfo = new HashMap<>();
                        benefitInfo.put("benefitName", benefit.get("resCardBenefitName"));
                        benefitInfo.put("businessTypes", benefit.get("resBusinessTypes"));
                        benefitInfoList.add(benefitInfo);
                    });
                }

                Map<String, Object> cardInfo = new HashMap<>();
                cardInfo.put("cardName", cardName);
                cardInfo.put("cardNo", cardNo);
                cardInfo.put("cardCompany", cardCompany);
                cardInfo.put("benefits", benefitInfoList);

                filteredResult.add(cardInfo);
            });

            return filteredResult;

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("카드 리스트 정보 요청에 실패하였습니다.");
        }
    }

}
