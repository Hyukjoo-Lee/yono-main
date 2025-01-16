package com.mmk.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mmk.dao.CardCompanyDAO;
import com.mmk.dto.CardCompanyDTO;
import com.mmk.entity.CardCompanyEntity;

@Service
public class CardCompanyServiceImpl implements CardCompanyService {
    
    @Autowired
    private CardCompanyDAO cardCompanyDAO;

    // 카드사 등록
    @Override
    public CardCompanyDTO registerCardCompany(CardCompanyDTO cardCompanyDTO) {
        int userNum = cardCompanyDTO.getUserNum();
        String organization = cardCompanyDTO.getOrganization();
        boolean exists = cardCompanyDAO.existsCompany(userNum, organization);
        
        if (exists) {
            return null;
        } else {
            cardCompanyDAO.save(toEntity(cardCompanyDTO));
            return cardCompanyDTO;
        }
    }

    private CardCompanyDTO toDTO(CardCompanyEntity entity) {
        CardCompanyDTO dto = new CardCompanyDTO();
        dto.setCardCompanyNum(entity.getCardCompanyNum());
        dto.setCompanyId(entity.getCompanyId());
        dto.setCompanyPwd(entity.getCompanyPwd());
        dto.setOrganization(entity.getOrganization());
        dto.setUserNum(entity.getUserNum());
        return dto;
    }

    private CardCompanyEntity toEntity(CardCompanyDTO dto) {
        CardCompanyEntity entity = new CardCompanyEntity();
        entity.setCardCompanyNum(dto.getCardCompanyNum());
        entity.setCompanyId(dto.getCompanyId());
        entity.setCompanyPwd(dto.getCompanyPwd());
        entity.setOrganization(dto.getOrganization());
        entity.setUserNum(dto.getUserNum());
        return entity;
    }
}
