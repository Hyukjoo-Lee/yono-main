package com.mmk.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mmk.dao.UserCardCompanyDAO;
import com.mmk.dao.CardDAO;
import com.mmk.dto.CardBenefitDTO;
import com.mmk.dto.UserCardCompanyDTO;
import com.mmk.dto.CardDTO;
import com.mmk.entity.UserCardCompanyEntity;
import com.mmk.entity.CardEntity;

@Service
public class CardServiceImpl implements CardService {

    @Autowired
    private CardDAO cardDAO;

    @Autowired
    private UserCardCompanyDAO cardCompanyDAO;

    @Autowired
    private UserCardService userCardService;

    @Autowired
    private CodefService codefService;

    @Autowired
    private CardBenefitService cardBenefitService;

    @Autowired
    private CardHistoryService cardHistoryService;

    @Override
    public CardDTO createCard(CardDTO cardDTO) {
        if (cardDAO.existsByCardTitle(cardDTO.getCardTitle())) {
            throw new IllegalArgumentException("이미 존재하는 카드이름입니다.");
        }

        CardEntity cardEntity = toEntity(cardDTO);
        cardDAO.createCard(cardEntity);
        return toDTO(cardEntity);
    }

    @Override
    public List<CardDTO> getAllCards() {
        List<CardEntity> cardEntities = cardDAO.getAllCards();
        if (cardEntities.isEmpty()) {
            throw new NoSuchElementException("현재 등록된 카드가 없습니다.");
        }

        List<CardDTO> cardDTOs = new ArrayList<>();

        for (CardEntity cardEntity : cardEntities) {
            CardDTO cardDTO = toDTO(cardEntity);
            cardDTOs.add(cardDTO);
        }

        return cardDTOs;
    }

    @Override
    public CardEntity getByTitle(String title) {
        CardEntity cardEntity = cardDAO.findByCardTitle(title);

        if (cardEntity == null) {
            throw new IllegalArgumentException("존재 하지 않는 카드이름입니다.");
        }

        return cardEntity;
    }

    @Override
    public List<CardDTO> getAllCardsByOrganizationCode(String organizationCode) {

        List<CardEntity> cardEntities = cardDAO.getAllCardsByOrganizationCode(organizationCode);

        if (cardEntities.isEmpty()) {
            throw new NoSuchElementException("해당 기관에 해당하는 카드가 없습니다.");
        }

        List<CardDTO> cardDTOs = new ArrayList<>();

        for (CardEntity cardEntity : cardEntities) {
            CardDTO cardDTO = toDTO(cardEntity);
            cardDTOs.add(cardDTO);
        }

        return cardDTOs;
    }

    @Override
    public CardDTO findByUserNum(int userNum) {
        int cardId = userCardService.findPrimaryCardByUserNum(userNum).getCardId();
        return toDTO(cardDAO.findByCardId(cardId));
    }

    @Override
    public UserCardCompanyDTO saveCodefCard(UserCardCompanyDTO cardCompanyDTO) {

        int userNum = cardCompanyDTO.getUserNum();
        String organization = cardCompanyDTO.getOrganization();

        UserCardCompanyEntity cardCompanyEntity = cardCompanyDAO.findByUserNumAndOrganizationCode(userNum,
                organization);

        if (cardCompanyEntity == null) {
            throw new RuntimeException("카드 회사 정보가 존재하지 않습니다.");
        } else {
            int companyNum = cardCompanyEntity.getCardCompanyNum();
            String companyId = cardCompanyEntity.getCompanyId();
            String companyPwd = cardCompanyEntity.getCompanyPwd();
            String connectedId = cardCompanyEntity.getConnectedId();

            cardCompanyDTO.setCardCompanyNum(companyNum);
            cardCompanyDTO.setCompanyId(companyId);
            cardCompanyDTO.setCompanyPwd(companyPwd);
            cardCompanyDTO.setConnectedId(connectedId);
        }

        // Codef API로 보유카드 정보 요청
        List<Map<String, Object>> cardList = codefService.getUserCardList(cardCompanyDTO.getConnectedId(),
                organization);

        if (cardList.isEmpty()) {
            throw new RuntimeException("Codef API로부터 카드 정보를 가져오지 못했습니다.");
        }

        // 마스터 카드, 유저 카드 저장
        cardList.forEach(card -> {
            CardDTO cardDTO = new CardDTO();
            cardDTO.setCardTitle((String) card.get("cardName"));
            cardDTO.setCardProvider(getCardProvider(organization));
            cardDTO.setOrganizationCode((String) card.get("organizationCode"));
            cardDTO.setCardImgUrl((String) card.get("imageLink"));

            createCard(cardDTO);
        });

        // Codef API로 카드 혜택 요청
        List<Map<String, Object>> benefitList = codefService.getUserPerformance(cardCompanyDTO.getConnectedId(),
                organization);

        if (benefitList.isEmpty()) {
            throw new RuntimeException("Codef API로부터 카드 혜택 정보를 가져오지 못했습니다.");
        }

        benefitList.forEach(benefit -> {
            CardBenefitDTO cardBenefitDTO = new CardBenefitDTO();
            String cardTitle = (String) benefit.get("cardName");
            cardBenefitDTO.setCardTitle(cardTitle);
            @SuppressWarnings("unchecked")
            List<Map<String, Object>> benefits = (List<Map<String, Object>>) benefit.get("benefits");
            benefits.forEach(b -> {
                String benefitTitle = (String) b.get("benefitName");
                String businessType = (String) b.get("businessTypes");
                cardBenefitDTO.setBenefitTitle(benefitTitle);
                cardBenefitDTO.setBenefitType(businessType);
                cardBenefitService.saveCardBenefit(cardBenefitDTO);
            });
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
            default:
                throw new IllegalArgumentException("유효하지 않은 기관코드: " + organization);
        }
    }

    @Override
    public List<CardDTO> getRecommendedCards(int userNum) {
        // 1. 소비내역 타입-값 이 들어있는 Map 가져오기

        // 테스트 Map
        Map<String, Integer> spendingMap = new HashMap<>();
        spendingMap.put("쇼핑", 439500); // SHOPPING
        spendingMap.put("교통", 109100); // TRANS
        spendingMap.put("식당", 472200); // FOOD
        spendingMap.put("커피숍", 62800); // CAFE
        spendingMap.put("편의점", 82850); // CONVENIENCE

        return null;
    }

    private CardEntity toEntity(CardDTO dto) {
        CardEntity entity = new CardEntity();
        entity.setCardId(dto.getCardId());
        entity.setCardTitle(dto.getCardTitle());
        entity.setCardProvider(dto.getCardProvider());
        entity.setOrganizationCode(dto.getOrganizationCode());
        entity.setCardImgUrl(dto.getCardImgUrl());
        entity.setCreatedAt(dto.getCreatedAt());
        entity.setUpdatedAt(dto.getUpdatedAt());
        return entity;
    }

    private CardDTO toDTO(CardEntity entity) {
        CardDTO dto = new CardDTO();
        dto.setCardId(entity.getCardId());
        dto.setCardTitle(entity.getCardTitle());
        dto.setCardProvider(entity.getCardProvider());
        dto.setOrganizationCode(entity.getOrganizationCode());
        dto.setCardImgUrl(entity.getCardImgUrl());
        dto.setCreatedAt(entity.getCreatedAt());
        dto.setUpdatedAt(entity.getUpdatedAt());
        return dto;
    }
}