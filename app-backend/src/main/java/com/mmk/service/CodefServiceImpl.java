package com.mmk.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mmk.dao.CardCompanyDAO;
// import com.mmk.dto.CardBenefitDTO;
import com.mmk.dto.CardCompanyDTO;
import com.mmk.dto.CardDTO;
import com.mmk.entity.CardCompanyEntity;
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

    @Autowired
    private CardCompanyDAO cardCompanyDAO;

    @Autowired
    private CardService cardService;

    // @Autowired
    // private CardBenefitService cardBenefitService;

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
            System.out.println("result: " + result);
            String code = jsonNode.path("result").path("code").asText();
            if (code.equals("CF-00000")) {
                String connectedId = jsonNode.path("data").path("connectedId").asText();
                return connectedId;
            } else {
                String errorMessage = jsonNode.path("data").path("errorList").get(0).path("message").asText();
                return "error" + errorMessage;
            }
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
                        "id", companyId));
        try {
            parameterMap.put("password", EasyCodefUtil.encryptRSA(companyPwd, codef.getPublicKey()));
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
        return parameterMap;
    }

    // 지정한 기간 동안의 카드 사용 내역 불러오기
    public String getCardHistory(UserCardEntity userCardEntity, String startDate, String endDate) {
        long startTime = System.nanoTime();
        String productUrl = "/v1/kr/card/p/account/approval-list";

        codef = new EasyCodef();
        codef.setClientInfoForDemo(clientId, clientSecret);
        codef.setPublicKey(publickey);

        String connectedId = userCardEntity.getCardCompanyEntity().getConnedtedId();
        String organization = userCardEntity.getCardEntity().getOrganizationCode();
        String cardNo = userCardEntity.getUserCardNum();
        String cardPwd = userCardEntity.getCardPwd();

        HashMap<String, Object> parameterMap = getCardHistoryParameterMap(connectedId, organization, cardNo, cardPwd,
                startDate, endDate);

        try {
            String result = codef.requestProduct(productUrl, EasyCodefServiceType.DEMO, parameterMap);
            long endTime = System.nanoTime();
            System.out.println("CODEF 데이터 호출 소요 시간: " + (endTime - startTime) + "ns");
            System.out.println("result: " + result);
            return result;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    private HashMap<String, Object> getCardHistoryParameterMap(String connectedId, String organization, String cardNo,
            String cardPwd, String startDate, String endDate) {
        HashMap<String, Object> parameterMap = new HashMap<>(
                Map.of(
                        "connectedId", connectedId,
                        "organization", organization,
                        "startDate", startDate,
                        "endDate", endDate,
                        "orderBy", "1",
                        "cardNo", cardNo,
                        "memberStoreInfoType", "1",
                        "inquiryType", "0"));
        try {
            parameterMap.put("카드 비밀번호", EasyCodefUtil.encryptRSA(cardPwd, codef.getPublicKey()));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return parameterMap;
    }

    // 사용자 보유 카드 리스트를 가져오는 메서드
    @Override
    public List<Map<String, Object>> getUserCardList(String connectedId, String organization) {
        codef = new EasyCodef();
        codef.setClientInfoForDemo(clientId, clientSecret);
        codef.setPublicKey(publickey);

        HashMap<String, Object> parameterMap = new HashMap<>();
        parameterMap.put("connectedId", connectedId);
        parameterMap.put("organization", organization); // 기관 코드
        parameterMap.put("inquiryType", "0"); // 카드 이미지 포함 여부
        String productUrl = "/v1/kr/card/p/account/card-list";

        try {
            String jsonResult = codef.requestProduct(productUrl, EasyCodefServiceType.DEMO, parameterMap);
            System.out.println("jsonResult: " + jsonResult);
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode dataNode = objectMapper.readTree(jsonResult).get("data");
            System.out.println("dataNode: " + dataNode);
            // 반환값이 배열인지 객체인지 확인 - 카드가 하나 일 때는 배열로 반환되고 두개 이상일 때는 객체로 반환됨
            List<Map<String, Object>> result;

            if (dataNode.isArray()) {
                System.out.println("this is array: ");
                result = objectMapper.convertValue(dataNode, new TypeReference<List<Map<String, Object>>>() {
                });
                System.out.println("this is array2: " + result);
            } else {

                Map<String, Object> singleCard = objectMapper.convertValue(dataNode,
                        new TypeReference<Map<String, Object>>() {
                        });
                result = new ArrayList<>();
                result.add(singleCard);
            }

            if (result.isEmpty()) {
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
                filteredCard.put("organizationCode", parameterMap.get("organization"));
                filteredResult.add(filteredCard);
            });

            return filteredResult;

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("카드 리스트 정보 요청에 실패하였습니다.");
        }
    }

    // 카드 혜택 정보를 가져오는 메서드
    @Override
    public List<Map<String, Object>> getUserPerformance(String connectedId, String organization) {
        codef = new EasyCodef();
        codef.setClientInfoForDemo(clientId, clientSecret);
        codef.setPublicKey(publickey);

        HashMap<String, Object> parameterMap = new HashMap<>();
        parameterMap.put("connectedId", connectedId);
        parameterMap.put("organization", organization);
        String productUrl = "/v1/kr/card/p/account/result-check-list";

        try {
            String jsonResult = codef.requestProduct(productUrl, EasyCodefServiceType.DEMO, parameterMap);
            System.out.println("jsonResult: " + jsonResult);
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode dataNode = objectMapper.readTree(jsonResult).get("data");

            List<Map<String, Object>> result;

            System.out.println("result: " + dataNode);

            if (dataNode.isArray()) {
                result = objectMapper.convertValue(dataNode, new TypeReference<List<Map<String, Object>>>() {
                });
            } else if (dataNode.isObject()) {
                Map<String, Object> singleCard = objectMapper.convertValue(dataNode,
                        new TypeReference<Map<String, Object>>() {
                        });
                result = new ArrayList<>();
                result.add(singleCard);
            } else {
                throw new RuntimeException("존재 하지 않는 타입: ");
            }

            if (result.isEmpty()) {
                throw new RuntimeException("카드 정보가 존재하지 않습니다.");
            }

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

        } catch (

        Exception e) {
            e.printStackTrace();
            throw new RuntimeException("카드 혜택 정보 요청에 실패하였습니다.");
        }
    }

    /**
     * 카드 정보, 혜택 호출 결과 저장 - 이미 회사가 등록 되어 있어야 함
     * 현재 CODEF 조회 시 혜택이 제대로 불러 와지지 않아 문의를 넣은 상태
     * 현재는 보유 카드만 저장 가능
     */
    @Override
    public CardCompanyDTO saveCodefCard(CardCompanyDTO cardCompanyDTO) {

        int userNum = cardCompanyDTO.getUserNum();
        String organization = cardCompanyDTO.getOrganization();

        CardCompanyEntity cardCompanyEntity = cardCompanyDAO.findByUserNumAndOrganization(userNum, organization);

        if (cardCompanyEntity == null) {
            throw new RuntimeException("카드 회사 정보가 존재하지 않습니다.");
        } else {
            int companyNum = cardCompanyEntity.getCardCompanyNum();
            String companyId = cardCompanyEntity.getCompanyId();
            String companyPwd = cardCompanyEntity.getCompanyPwd();
            String connectedId = cardCompanyEntity.getConnedtedId();

            System.out.println(companyNum + " :companyNum");
            System.out.println(companyId + " :companyId");
            System.out.println(companyPwd + " :companyPwd");
            System.out.println(connectedId + " :connectedId");

            cardCompanyDTO.setCardCompanyNum(companyNum);
            cardCompanyDTO.setCompanyId(companyId);
            cardCompanyDTO.setCompanyPwd(companyPwd);
            cardCompanyDTO.setConnectedId(connectedId);
        }
        // Codef API로 카드 정보 요청
        List<Map<String, Object>> cardList = getUserCardList(cardCompanyDTO.getConnectedId(), organization);

        if (cardList.isEmpty()) {
            throw new RuntimeException("Codef API로부터 카드 정보를 가져오지 못했습니다.");
        }
        System.out.println("cardList: " + cardList);
        // 마스터 카드, 유저 카드 저장
        cardList.forEach(card -> {
            CardDTO cardDTO = new CardDTO();
            cardDTO.setCardTitle((String) card.get("cardName"));
            cardDTO.setCardProvider(getCardProvider(organization));
            cardDTO.setOrganizationCode((String) card.get("organizationCode"));
            cardDTO.setCardImgUrl((String) card.get("imageLink"));

            cardService.createCard(cardDTO);
        });

        // Codef API로 카드 혜택 요청
        List<Map<String, Object>> benefitList = getUserPerformance(cardCompanyDTO.getConnectedId(), organization);

        if (benefitList.isEmpty()) {
            throw new RuntimeException("Codef API로부터 카드 혜택 정보를 가져오지 못했습니다.");
        }
        System.out.println("cardList: " + cardList);
        // 마스터 카드, 유저 카드 저장
        cardList.forEach(card -> {
            CardDTO cardDTO = new CardDTO();
            cardDTO.setCardTitle((String) card.get("cardName"));
            cardDTO.setCardProvider(getCardProvider(organization));
            cardDTO.setOrganizationCode((String) card.get("organizationCode"));
            cardDTO.setCardImgUrl((String) card.get("imageLink"));

            cardService.createCard(cardDTO);
        });
        return cardCompanyDTO;
    }

    // 기관코드에 따른 CARD_PROVIDER 설정
    private String getCardProvider(String organization) {
        switch (organization) {
            case "0301":
                return "kb";
            case "0302":
                return "hyundai";
            case "0303":
                return "samsung";
            case "0304":
                return "nh";
            case "0306":
                return "shinhan";
            case "0313":
                return "hana";
            case "NH":
                return "NH농협카드";
            case "SS":
                return "삼성카드";
            case "HD":
                return "현대카드";
            case "WF":
                return "우리카드";
            case "CT":
                return "씨티카드";
            default:
                throw new IllegalArgumentException("유효하지 않은 기관코드: " + organization);
        }
    }
}
