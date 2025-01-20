package com.mmk.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mmk.dao.CardBenefitDAO;
import com.mmk.dao.CardDAO;
import com.mmk.dto.CardBenefitDTO;
import com.mmk.entity.CardBenefitEntity;
import com.mmk.entity.CardEntity;

@Service
public class CardBenefitServiceImpl implements CardBenefitService {

    @Autowired
    private CardBenefitDAO cardBenefitDAO;

    @Autowired
    private CardDAO cardDAO;

    @Override
    public CardBenefitDTO createCardBenefit(CardBenefitDTO cardBenefitDTO) {
        CardEntity cardEntity = cardDAO.findByCardTitle(cardBenefitDTO.getCardTitle());

        if (cardEntity == null) {
            throw new RuntimeException("카드 정보를 찾을 수 없습니다: " + cardBenefitDTO.getCardTitle());
        }

        CardBenefitEntity cardBenefitEntity = toEntity(cardBenefitDTO, cardEntity);
        System.out.println("cardBenefitEntity: " + cardBenefitEntity);
        cardBenefitDAO.createCardBenefit(cardBenefitEntity);

        return toDTO(cardBenefitEntity);
    }

    private CardBenefitEntity toEntity(CardBenefitDTO dto, CardEntity cardEntity) {
        CardBenefitEntity entity = new CardBenefitEntity();
        entity.setBenefitId(dto.getBenefitId());
        entity.setBenefitTitle(dto.getBenefitTitle());
        entity.setBusinessTypes(dto.getBusinessTypes());
        entity.setCreatedAt(dto.getCreatedAt());
        entity.setUpdatedAt(dto.getUpdatedAt());
        entity.setCardEntity(cardEntity);
        return entity;
    }

    private CardBenefitDTO toDTO(CardBenefitEntity entity) {
        CardBenefitDTO dto = new CardBenefitDTO();
        dto.setBenefitId(entity.getBenefitId());
        dto.setBenefitTitle(entity.getBenefitTitle());
        dto.setBusinessTypes(entity.getBusinessTypes());
        dto.setCreatedAt(entity.getCreatedAt());
        dto.setUpdatedAt(entity.getUpdatedAt());
        dto.setCardTitle(entity.getCardEntity().getCardTitle());
        return dto;
    }
}
