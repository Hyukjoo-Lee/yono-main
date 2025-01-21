package com.mmk.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import io.codef.api.EasyCodef;
import io.codef.api.EasyCodefServiceType;

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

    @GetMapping("/getUserCardList")
    public List<Map<String, Object>> getUserCardList() {
        codef = new EasyCodef();
        codef.setClientInfoForDemo(clientId, clientSecret);
        codef.setPublicKey(publickey);
        HashMap<String, Object> parameterMap = new HashMap<>();
        parameterMap.put("connectedId", connectedId);
        parameterMap.put("organization", "0313"); // 기관 코드
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
        parameterMap.put("organization", "0313");
        String productUrl = "/v1/kr/card/p/account/result-check-list";

        try {
            String jsonResult = codef.requestProduct(productUrl, EasyCodefServiceType.DEMO, parameterMap);
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode dataNode = objectMapper.readTree(jsonResult).get("data");

            // JSON이 배열인지 객체인지 확인
            List<Map<String, Object>> result;
            if (dataNode.isArray()) {
                result = objectMapper.convertValue(dataNode, new TypeReference<List<Map<String, Object>>>() {
                });
            } else if (dataNode.isObject()) {
                Map<String, Object> singleCard = objectMapper.convertValue(dataNode,
                        new TypeReference<Map<String, Object>>() {
                        });
                result = new ArrayList<>();
                result.add(singleCard); // 단일 객체를 리스트로 변환
            } else {
                throw new RuntimeException("알 수 없는 JSON 데이터 형식입니다: " + dataNode);
            }

            if (result.isEmpty()) {
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
