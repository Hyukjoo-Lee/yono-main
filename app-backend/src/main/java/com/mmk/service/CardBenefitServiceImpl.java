package com.mmk.service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mmk.dao.CardBenefitDAO;
import com.mmk.dao.CardDAO;
import com.mmk.dao.CardRepository;
import com.mmk.dto.CardBenefitDTO;
import com.mmk.entity.CardBenefitEntity;
import com.mmk.entity.CardEntity;

@Transactional
@Service
public class CardBenefitServiceImpl implements CardBenefitService {

    @Autowired
    private CardBenefitDAO cardBenefitDAO;

    @Autowired
    private CardRepository cardRepository;

    @Autowired
    private CardDAO cardDAO;

    // 카드 제목으로 혜택 조회
    @Override
    public List<CardBenefitDTO> getAllCardBenefitsByCardTitle(String cardTitle) {
        List<CardBenefitEntity> cardBenefitEntities = cardBenefitDAO.getAllCardBenefitsByCardTitle(cardTitle);

        if (cardBenefitEntities.isEmpty()) {
            throw new NoSuchElementException("해당 카드가 가지고 있는 혜택이 없습니다.");
        }

        List<CardBenefitDTO> cardBenefitDTOs = new ArrayList<>();

        for (CardBenefitEntity entity : cardBenefitEntities) {
            CardBenefitDTO dto = toDTO(entity);
            cardBenefitDTOs.add(dto);
        }

        return cardBenefitDTOs;
    }

    @Override
    public List<CardBenefitDTO> registerCardBenefits(List<CardBenefitDTO> cardBenefitDTOs) {
        List<CardBenefitDTO> savedBenefits = new ArrayList<>();

        for (CardBenefitDTO dto : cardBenefitDTOs) {
            CardEntity cardEntity = cardRepository.findByCardTitle(dto.getCardTitle());

            boolean exists = cardBenefitDAO.existsByBenefitTitleAndCard(dto.getBenefitTitle(), cardEntity);

            if (!exists) {
                CardBenefitEntity entity = toEntity(dto, cardEntity);

                CardBenefitEntity savedEntity = cardBenefitDAO.registerCardBenefit(entity);

                savedBenefits.add(toDTO(savedEntity));
            }
        }

        return savedBenefits;
    }

    @Override
    public CardBenefitDTO createCardBenefit(CardBenefitDTO cardBenefitDTO) {
        CardEntity cardEntity = cardDAO.findByCardTitle(cardBenefitDTO.getCardTitle());

        if (cardEntity == null) {
            throw new RuntimeException("카드 정보를 찾을 수 없습니다: " + cardBenefitDTO.getCardTitle());
        }

        CardBenefitEntity cardBenefitEntity = toEntity(cardBenefitDTO, cardEntity);

        cardBenefitDAO.registerCardBenefit(cardBenefitEntity);

        return toDTO(cardBenefitEntity);
    }

    private CardBenefitEntity toEntity(CardBenefitDTO dto, CardEntity cardEntity) {
        CardBenefitEntity entity = new CardBenefitEntity();
        entity.setBenefitId(dto.getBenefitId());
        entity.setBenefitTitle(dto.getBenefitTitle());
        entity.setBenefitValue(dto.getBenefitValue());
        entity.setBenefitType(dto.getBenefitType());
        entity.setCreatedAt(dto.getCreatedAt());
        entity.setUpdatedAt(dto.getUpdatedAt());

        entity.setCardEntity(cardEntity);
        return entity;
    }

    private CardBenefitDTO toDTO(CardBenefitEntity entity) {
        CardBenefitDTO dto = new CardBenefitDTO();
        dto.setBenefitId(entity.getBenefitId());
        dto.setBenefitTitle(entity.getBenefitTitle());
        dto.setBenefitValue(entity.getBenefitValue());
        dto.setBenefitType(entity.getBenefitType());
        dto.setCreatedAt(entity.getCreatedAt());
        dto.setUpdatedAt(entity.getUpdatedAt());
        dto.setCardTitle(entity.getCardEntity().getCardTitle());
        return dto;
    }
}
