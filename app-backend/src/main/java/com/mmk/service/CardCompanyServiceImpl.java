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

    @Autowired
    private CodefService codefService;

    // 카드사 등록
    @Override
    public CardCompanyDTO registerCardCompany(CardCompanyDTO cardCompanyDTO) {
        int userNum = cardCompanyDTO.getUserNum();
        String organization = cardCompanyDTO.getOrganization();
        String companyId = cardCompanyDTO.getCompanyId();
        String companyPwd = cardCompanyDTO.getCompanyPwd();
        boolean exists = cardCompanyDAO.existsCompany(userNum, organization);
        
        if (exists) {
            return null;
        } else {
            String connectedId = codefService.getConId(organization, companyId, companyPwd);
            cardCompanyDTO.setConnectedId(connectedId);
            // usercardDAO.updateAllByUserNumAndOrganization(userNum, organization, companyId, companyPwd, connectedId);
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
        dto.setConnectedId(entity.getConnedtedId());
        return dto;
    }

    private CardCompanyEntity toEntity(CardCompanyDTO dto) {
        CardCompanyEntity entity = new CardCompanyEntity();
        entity.setCardCompanyNum(dto.getCardCompanyNum());
        entity.setCompanyId(dto.getCompanyId());
        entity.setCompanyPwd(dto.getCompanyPwd());
        entity.setOrganization(dto.getOrganization());
        entity.setUserNum(dto.getUserNum());
        entity.setConnedtedId(dto.getConnectedId());
        return entity;
    }
}
