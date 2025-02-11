package com.mmk.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mmk.controller.CardController;
import com.mmk.dao.UserCardCompanyDAO;
import com.mmk.dto.UserCardCompanyDTO;
import com.mmk.entity.UserCardCompanyEntity;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class UserCardCompanyServiceImpl implements UserCardCompanyService {

    private static final Logger logger = LoggerFactory.getLogger(CardController.class);

    @Autowired
    private UserCardCompanyDAO cardCompanyDAO;

    @Autowired
    private CodefService codefService;

    // 카드사 등록
    @Override
    public UserCardCompanyDTO registerCardCompany(UserCardCompanyDTO cardCompanyDTO) {
        int userNum = cardCompanyDTO.getUserNum();
        String organization = cardCompanyDTO.getOrganization();
        String companyId = cardCompanyDTO.getCompanyId();
        String companyPwd = cardCompanyDTO.getCompanyPwd();
        boolean exists = cardCompanyDAO.existsCompany(userNum, organization);
        if (exists) {
            return null;
        } else {
            String connectedId = codefService.getConId(organization, companyId, companyPwd);
            logger.info("connectedId: {}", connectedId);
            cardCompanyDTO.setConnectedId(connectedId);
            if (connectedId.isEmpty()) {
                return cardCompanyDTO;
            } else if (connectedId.startsWith("error")) {
                return cardCompanyDTO;
            } else {
                cardCompanyDAO.save(toEntity(cardCompanyDTO));
                return cardCompanyDTO;
            }
        }
    }

    private UserCardCompanyEntity toEntity(UserCardCompanyDTO dto) {
        UserCardCompanyEntity entity = new UserCardCompanyEntity();
        entity.setCardCompanyNum(dto.getCardCompanyNum());
        entity.setCompanyId(dto.getCompanyId());
        entity.setCompanyPwd(dto.getCompanyPwd());
        entity.setOrganizationCode(dto.getOrganization());
        entity.setUserNum(dto.getUserNum());
        entity.setConnectedId(dto.getConnectedId());
        return entity;
    }
}
