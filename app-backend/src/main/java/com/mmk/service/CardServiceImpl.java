package com.mmk.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mmk.dao.CardBenefitDAO;
import com.mmk.dao.CardDAO;
import com.mmk.dao.UserCardDAO;
import com.mmk.dto.CardBenefitDTO;
import com.mmk.dto.CardDTO;
import com.mmk.dto.UserCardDTO;
import com.mmk.entity.CardBenefitEntity;
import com.mmk.entity.CardEntity;
import com.mmk.entity.UserCardEntity;

import jakarta.transaction.Transactional;

@Service
public class CardServiceImpl implements CardService {

    @Autowired
    private CardDAO cardDAO;

    @Autowired
    private UserCardDAO userCardDAO;

    @Autowired
    private CardBenefitDAO benefitDAO;

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
    @Transactional
    public void saveCardAndBenefitData(List<Map<String, Object>> cardList, List<Map<String, Object>> performanceList) {

        System.out.println("cardList: " + cardList);
        System.out.println("performanceList: " + performanceList);

        cardList.forEach(cardData -> {
            String cardTitle = (String) cardData.get("cardName");
            String cardNumber = (String) cardData.get("cardNo");
            String userName = (String) cardData.get("userName");
            String validPeriod = (String) cardData.get("validPeriod");
            String imageLink = (String) cardData.get("imageLink");

        });

        performanceList.forEach(benefitData -> {

            @SuppressWarnings("unchecked")
            List<Map<String, String>> benefits = (List<Map<String, String>>) benefitData.get("benefits");

            for (Map<String, String> benefit : benefits) {
                String benefitName = benefit.get("benefitName");
                String businessType = benefit.get("businessTypes");

            }

            String cardName = (String) benefitData.get("cardName");
            String cardNo = (String) benefitData.get("cardNo");
            String cardCompany = (String) benefitData.get("cardCompany");

            System.out.println("cardName: " + cardName);
            System.out.println("cardNo: " + cardNo);
            System.out.println("cardCompany: " + cardCompany);
        });
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

        List<UserCardDTO> userCardDTOs = entity.getUserCards().stream()
                .map(this::toUserCardDTO)
                .collect(Collectors.toList());
        dto.setUserCards(userCardDTOs);

        List<CardBenefitDTO> benefitDTOs = entity.getCardBenefits().stream()
                .map(this::toCardBenefitDTO)
                .collect(Collectors.toList());
        dto.setCardBenefits(benefitDTOs);

        return dto;
    }

    private UserCardDTO toUserCardDTO(UserCardEntity entity) {
        UserCardDTO dto = new UserCardDTO();
        dto.setUserCardId(entity.getUserCardId());
        dto.setUserCardNum(entity.getUserCardNum());
        dto.setExpiryDate(entity.getExpiryDate());
        dto.setUserName(entity.getUserName());
        dto.setCardId(entity.getCardEntity().getCardId());
        dto.setUserNum(entity.getUserEntity().getUserNum());
        return dto;
    }

    private CardBenefitDTO toCardBenefitDTO(CardBenefitEntity entity) {
        CardBenefitDTO dto = new CardBenefitDTO();
        dto.setBenefitId(entity.getBenefitId());
        dto.setBenefitTitle(entity.getBenefitTitle());
        dto.setBusinessTypes(entity.getBusinessTypes());
        // dto.setCardId(entity.getCardEntity().getCardId());
        dto.setCardId(entity.getCardEntity().getCardId());
        return dto;
    }
}
