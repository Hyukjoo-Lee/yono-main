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

    @GetMapping("/getConId")
    public void getConId() {
        codef = new EasyCodef();
        codef.setClientInfoForDemo(clientId, clientSecret);
        codef.setPublicKey(publickey);

        List<HashMap<String, Object>> accountList = new ArrayList<HashMap<String, Object>>();
        HashMap<String, Object> accountMap = new HashMap<String, Object>();
        accountMap.put("countryCode", "KR");
        accountMap.put("businessType", "CD");
        accountMap.put("clientType", "P");

        // 기관코드는 각 상품 페이지 (https://developer.codef.io/products/card/overview)에서 확인 가능
        // 카드사마다 기관코드가 다름, 아래 예시는 현대카드
        accountMap.put("organization", "0302");

        // login 방법이 공인인증서, 아이디 & 비번 2가지 방법이 있는데 아이디 & 비번을 선택
        // 공인인증서 loginType = 0, 아이디 & 비번 loginType = 1
        accountMap.put("loginType", "1");

        accountMap.put("id", "카드사 아이디 입력"); // 카드사 아이디 입력

        try {
            // RSA암호화가 필요한 필드는 encryptRSA(String plainText, String publicKey) 메서드를 이용해 암호화
            accountMap.put("password", EasyCodefUtil.encryptRSA("카드사비밀번호 입력", codef.getPublicKey())); // 카드사 비밀번호 입력
        } catch (Exception e) {
            e.printStackTrace();
            return;
        }
        accountList.add(accountMap);

        System.out.println("어카운트 리스트:" + accountList);

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

    @GetMapping("getCardHistory")
    public CompletableFuture<List<MonthlySummary>> getCardHistory() {
        String productUrl = "/v1/kr/card/p/account/approval-list";

        codef = new EasyCodef();
        codef.setClientInfoForDemo(clientId, clientSecret);
        codef.setPublicKey(publickey);

        HashMap<String, Object> parameterMap = createParameterMap();

        return CompletableFuture.supplyAsync(() -> {
            try {
                return codef.requestProduct(productUrl, EasyCodefServiceType.DEMO, parameterMap);
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }).thenApply(result -> processResult(result))
        .exceptionally(e -> {
            e.printStackTrace();
            return Collections.emptyList();
        });
    }

    private HashMap<String, Object> createParameterMap() {
        HashMap<String, Object> parameterMap = new HashMap<>();
        parameterMap.put("connectedId", connectedId);
        parameterMap.put("organization", "0302");
        parameterMap.put("startDate", "20241001");
        parameterMap.put("endDate", "20241130");
        parameterMap.put("orderBy", "1");
        parameterMap.put("cardNo", "카드번호 입력");
        parameterMap.put("memberStoreInfoType", "1");
        parameterMap.put("inquiryType", "0");
        try {
            parameterMap.put("카드 비밀번호", EasyCodefUtil.encryptRSA("카드비밀번호 입력", codef.getPublicKey()));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return parameterMap;
    }

    private List<MonthlySummary> processResult(String result) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);

            String dataArrayJson = objectMapper.readTree(result).get("data").toString();
            List<TransDTO> transactionDTOList = objectMapper.readValue(dataArrayJson,
                    new TypeReference<List<TransDTO>>() {});

            Map<String, Map<String, Integer>> groupedData = transactionDTOList.parallelStream()
                    .collect(Collectors.groupingBy(
                            card -> card.getUsedDate().substring(0, 6),
                            Collectors.groupingBy(card -> (card.getStoreType() != null && !card.getStoreType().isEmpty())
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

    @GetMapping("getUserCards")
    public void getUserCards() {
        codef = new EasyCodef();
        codef.setClientInfoForDemo(clientId, clientSecret);
        codef.setPublicKey(publickey);

        HashMap<String, Object> parameterMap = new HashMap<String, Object>();
        
        parameterMap.put("connectedId", connectedId);
        parameterMap.put("organization", "0302"); // 기관 코드
        parameterMap.put("inquiryType", "1"); // 카드 이미지 포함 여부

        String productUrl = "/v1/kr/card/p/account/card-list"; // 보유 카드 URL

        String result = "";
        try {
            result = codef.requestProduct(productUrl, EasyCodefServiceType.DEMO, parameterMap);
            System.out.println(result);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @GetMapping("getUserPerformance")
    public void getUserPerformance() {
        codef = new EasyCodef();
        codef.setClientInfoForDemo(clientId, clientSecret);
        codef.setPublicKey(publickey);

        HashMap<String, Object> parameterMap = new HashMap<String, Object>();
        
        parameterMap.put("connectedId", connectedId);
        parameterMap.put("organization", "0302"); // 기관 코드

        String productUrl = "/v1/kr/card/p/account/result-check-list"; // 보유 카드 URL

        String result = "";
        try {
            result = codef.requestProduct(productUrl, EasyCodefServiceType.DEMO, parameterMap);
            System.out.println(result);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }



}
