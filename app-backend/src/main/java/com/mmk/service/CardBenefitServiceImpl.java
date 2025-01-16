package com.mmk.service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mmk.dao.CardBenefitDAO;
import com.mmk.dto.CardBenefitDTO;
import com.mmk.entity.CardBenefitEntity;

@Service
public class CardBenefitServiceImpl implements CardBenefitService {

    @Autowired
    private CardBenefitDAO cardBenefitDAO;

    @Override
    public CardBenefitDTO createCardBenefit(CardBenefitDTO cardBenefitDTO) {
        CardBenefitEntity cardBenefitEntity = toEntity(cardBenefitDTO);
        cardBenefitDAO.createCardBenefit(cardBenefitEntity);
        return toDTO(cardBenefitEntity);
    }

    // @Override
    // public List<CardBenefitDTO> getCardBenefitsByCardId(int cardId) {
    // List<CardBenefitEntity> benefitEntities =
    // cardBenefitDAO.getCardBenefitByCardId(cardId);
    // if (benefitEntities.isEmpty()) {
    // throw new NoSuchElementException("해당 카드 ID에 대한 혜택이 존재하지 않습니다.");
    // }
    // return
    // benefitEntities.stream().map(this::toDTO).collect(Collectors.toList());
    // }

    // @Override
    // public List<CardBenefitDTO> getCardBenefitsByCardTitle(String cardTitle) {
    // List<CardBenefitEntity> benefitEntities =
    // cardBenefitDAO.getCardBenefitByCardTitle(cardTitle);
    // if (benefitEntities.isEmpty()) {
    // throw new NoSuchElementException("해당 카드 이름에 대한 혜택이 존재하지 않습니다.");
    // }
    // return
    // benefitEntities.stream().map(this::toDTO).collect(Collectors.toList());
    // }

    @Override
    public CardBenefitDTO getCardBenefitByBenefitId(int benefitId) {
        CardBenefitEntity benefitEntity = cardBenefitDAO.getCardBenefitByBenefitId(benefitId);
        if (benefitEntity == null) {
            throw new NoSuchElementException("해당 혜택 ID에 대한 혜택이 존재하지 않습니다.");
        }
        return toDTO(benefitEntity);
    }

    private CardBenefitEntity toEntity(CardBenefitDTO dto) {
        CardBenefitEntity entity = new CardBenefitEntity();
        entity.setBenefitId(dto.getBenefitId());
        entity.setBenefitTitle(dto.getBenefitTitle());
        entity.setBusinessTypes(dto.getBusinessTypes());
        return entity;
    }

    private CardBenefitDTO toDTO(CardBenefitEntity entity) {
        CardBenefitDTO dto = new CardBenefitDTO();
        dto.setBenefitId(entity.getBenefitId());
        dto.setBenefitTitle(entity.getBenefitTitle());
        dto.setBusinessTypes(entity.getBusinessTypes());
        return dto;
    }

    @Override
    public List<CardBenefitDTO> getCardBenefitByCardId(int cardId) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getCardBenefitByCardId'");
    }

    @Override
    public List<CardBenefitDTO> getCardBenefitByCardTitle(String cardTitle) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getCardBenefitByCardTitle'");
    }

}
