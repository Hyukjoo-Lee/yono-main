package com.mmk.service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mmk.dao.UserCardDAO;
import com.mmk.dto.UserCardDTO;
import com.mmk.entity.UserCardEntity;

@Service
public class UserCardServiceImpl implements UserCardService {

    @Autowired
    private UserCardDAO userCardDAO;

    // 사용자 카드 등록
    @Override
    public UserCardDTO registerCard(UserCardDTO userCardDTO) {
        if (userCardDAO.existsByUserCardNum(userCardDTO.getUserCardNum())) {
            throw new IllegalArgumentException("이미 등록된 카드번호입니다.");
        }

        UserCardEntity userCardEntity = toEntity(userCardDTO);
        userCardDAO.registerCard(userCardEntity);
        return toDTO(userCardEntity);
    }

    // 사용자 보유 카드 조회
    @Override
    public List<UserCardDTO> getUserCardsByUserId(int userId) {
        List<UserCardEntity> userCardEntities = userCardDAO.findUserCardEntityByUserId(userId);
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

    private UserCardEntity toEntity(UserCardDTO dto) {
        UserCardEntity entity = new UserCardEntity();
        entity.setUserCardId(dto.getUserCardId());
        entity.setUserCardNum(dto.getUserCardNum());
        entity.setExpiryDate(dto.getExpiryDate());
        entity.setUserName(dto.getUserName());
        entity.setCreatedAt(dto.getCreatedAt());
        entity.setUpdatedAt(dto.getUpdatedAt());

        entity.setCardEntity(dto.getCardEntity());
        entity.setUserEntity(dto.getUserEntity());
        return entity;
    }

    private UserCardDTO toDTO(UserCardEntity entity) {
        UserCardDTO dto = new UserCardDTO();
        dto.setUserCardId(entity.getUserCardId());
        dto.setUserCardNum(entity.getUserCardNum());
        dto.setExpiryDate(entity.getExpiryDate());
        dto.setUserName(entity.getUserName());
        dto.setCreatedAt(entity.getCreatedAt());
        dto.setUpdatedAt(entity.getUpdatedAt());

        dto.setCardEntity(entity.getCardEntity());
        dto.setUserEntity(entity.getUserEntity());
        return dto;
    }
}
