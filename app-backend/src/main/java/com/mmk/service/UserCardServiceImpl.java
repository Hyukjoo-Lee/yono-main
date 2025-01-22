package com.mmk.service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mmk.dao.CardCompanyDAO;
import com.mmk.dao.CardDAO;
import com.mmk.dao.UserCardDAO;
import com.mmk.dao.UserDAO;
import com.mmk.dto.UserCardDTO;
import com.mmk.entity.CardCompanyEntity;
import com.mmk.entity.CardEntity;
import com.mmk.entity.UserCardEntity;
import com.mmk.entity.UserEntity;

@Transactional
@Service
public class UserCardServiceImpl implements UserCardService {

    @Autowired
    private UserCardDAO userCardDAO;

    @Autowired
    private CardDAO cardDAO;

    @Autowired
    private UserDAO userDAO;

    @Autowired
    private CardCompanyDAO cardCompanyDAO;

    // 사용자 카드 등록
    @Override
    public UserCardDTO registerCard(UserCardDTO userCardDTO, String organization, String cardTitle) {
        String userCardNum = userCardDTO.getUserCardNum();
        int userNum = userCardDTO.getUserNum();

        if (cardCompanyDAO.existsCompany(userNum, organization)) {
            if (userCardDAO.existsByUserCardNum(userCardNum)) {
                throw new IllegalArgumentException("이미 등록된 카드입니다.");
            } else {
                int cardCompanyNum = cardCompanyDAO.findByUserNumAndOrganization(userNum, organization)
                        .getCardCompanyNum();
                int cardId = cardDAO.findByCardTitle(cardTitle).getCardId();
                userCardDTO.setCardCompanyNum(cardCompanyNum);
                userCardDTO.setCardId(cardId);

                UserCardEntity userCardEntity = toEntity(userCardDTO);
                userCardDAO.registerCard(userCardEntity);
                return toDTO(userCardEntity);
            }
        } else {
            return null;
        }
    }

    @Override
    public List<UserCardDTO> getAllCardsByUserNum(int userNum) {
        List<UserCardEntity> userCardEntities = userCardDAO.getAllCardsByUserNum(userNum);
        if (userCardEntities.isEmpty()) {
            throw new NoSuchElementException("해당 사용자가 소유한 카드가 없습니다.");
        }

        List<UserCardDTO> userCardDTOs = new ArrayList<>();
        for (UserCardEntity entity : userCardEntities) {
            UserCardDTO dto = toDTO(entity);
            userCardDTOs.add(dto);
        }

        return userCardDTOs;
    }

    // 대표 카드 등록
    @Override
    public UserCardDTO setPrimaryCard(int userCardId, int userNum) {
        userCardDAO.removePrimaryCardAll(userNum);
        userCardDAO.setPrimaryCard(userCardId);

        return toDTO(userCardDAO.findByUserCardId(userCardId));
    }

    private UserCardEntity toEntity(UserCardDTO dto) {
        UserCardEntity entity = new UserCardEntity();
        entity.setUserCardId(dto.getUserCardId());
        entity.setUserCardNum(dto.getUserCardNum());
        entity.setExpiryDate(dto.getExpiryDate());
        entity.setUserName(dto.getUserName());
        entity.setCardPwd(dto.getCardPwd());
        entity.setPrimaryCard(dto.getPrimaryCard());
        entity.setCreatedAt(dto.getCreatedAt());
        entity.setUpdatedAt(dto.getUpdatedAt());

        CardCompanyEntity cardCompanyEntity = cardCompanyDAO.findByCardCompanyNum(dto.getCardCompanyNum());
        CardEntity cardEntity = cardDAO.findByCardId(dto.getCardId());
        UserEntity userEntity = userDAO.findByUserNum(dto.getUserNum());

        entity.setCardCompanyEntity(cardCompanyEntity);
        entity.setCardEntity(cardEntity);
        entity.setUserEntity(userEntity);
        return entity;
    }

    private UserCardDTO toDTO(UserCardEntity entity) {
        UserCardDTO dto = new UserCardDTO();
        dto.setUserCardId(entity.getUserCardId());
        dto.setUserCardNum(entity.getUserCardNum());
        dto.setExpiryDate(entity.getExpiryDate());
        dto.setUserName(entity.getUserName());
        dto.setCardPwd(entity.getCardPwd());
        dto.setPrimaryCard(entity.getPrimaryCard());
        dto.setCreatedAt(entity.getCreatedAt());
        dto.setUpdatedAt(entity.getUpdatedAt());

        dto.setCardCompanyNum(entity.getCardCompanyEntity().getCardCompanyNum());
        dto.setCardId(entity.getCardEntity().getCardId());
        dto.setUserNum(entity.getUserEntity().getUserNum());
        return dto;
    }
}
