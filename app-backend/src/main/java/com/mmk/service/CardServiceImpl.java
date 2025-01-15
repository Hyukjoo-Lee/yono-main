package com.mmk.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mmk.dao.CardBenefitDAO;
import com.mmk.dao.CardDAO;
import com.mmk.dao.UserCardDAO;
import com.mmk.dto.CardDTO;
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

            System.out.println("cardTitle: " + cardTitle);
            System.out.println("cardNumber: " + cardNumber);
            System.out.println("userName: " + userName);
            System.out.println("validPeriod: " + validPeriod);
            System.out.println("imageLink: " + imageLink);
        });

        performanceList.forEach(benefit -> {
            System.out.println(benefit);
        });
        // cardList.forEach(cardData -> {
        // String cardName = (String) cardData.get("cardName");
        // String cardNo = (String) cardData.get("cardNo");
        // String userName = (String) cardData.get("userName");
        // String validPeriod = (String) cardData.get("validPeriod");
        // String imageLink = (String) cardData.get("imageLink");

        // CardEntity cardEntity = cardDAO.findByCardTitle(cardName);

        // if (cardEntity == null) {
        // cardEntity = new CardEntity();
        // cardEntity.setCardTitle(cardName);
        // cardEntity.setCardProvider("농협"); // 발급사 설정
        // cardEntity.setOrganizationCode("0304");
        // cardEntity.setCardImgUrl(imageLink);
        // cardDAO.createCard(cardEntity);
        // }

        // performanceList.forEach(benefit -> {
        // System.out.println(benefit);
        // //
        // });

        // UserCardEntity userCardEntity = new UserCardEntity();
        // userCardEntity.setCardEntity(cardEntity);
        // userCardEntity.setUserCardNum(cardNo);
        // userCardEntity.setExpiryDate(validPeriod);
        // userCardEntity.setUserName(userName);
        // userCardDAO.registerCard(userCardEntity);

        // });
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
