package com.mmk.service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mmk.dao.CardDAO;
import com.mmk.dao.UserCardDAO;
import com.mmk.dao.UserDAO;
import com.mmk.dto.UserCardDTO;
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
    private CodefService codefService;

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

    // 대표 카드 등록
    @Override
    public UserCardDTO setPrimaryCard(UserCardDTO uc) {
        userCardDAO.removePrimaryCardAll(uc.getUserNum());
        
        String companyId = uc.getCompanyId();
        String companyPwd = uc.getCompanyPwd();
        int cardId = uc.getCardId();
        String organization = cardDAO.findByCardId(cardId).getOrganizationCode();

        String connectedId = codefService.getConId(organization, companyId, companyPwd);
        System.out.println("ConnectedId :" + connectedId);

        uc.setConnectedId(connectedId);
        uc.setPrimaryCard(1);
        userCardDAO.registerCard(toEntity(uc));
        return uc;
    }

    private UserCardEntity toEntity(UserCardDTO dto) {
        UserCardEntity entity = new UserCardEntity();
        entity.setUserCardId(dto.getUserCardId());
        entity.setUserCardNum(dto.getUserCardNum());
        entity.setExpiryDate(dto.getExpiryDate());
        entity.setUserName(dto.getUserName());

        entity.setCompanyId(dto.getCompanyId());
        entity.setCompanyPwd(dto.getCompanyPwd());
        entity.setConnectedId(dto.getConnectedId());
        entity.setPrimaryCard(dto.getPrimaryCard());

        entity.setCreatedAt(dto.getCreatedAt());
        entity.setUpdatedAt(dto.getUpdatedAt());

        CardEntity cardEntity = cardDAO.findByCardId(dto.getCardId());
        UserEntity userEntity = userDAO.getUserById(dto.getUserNum());

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

        dto.setCompanyId(entity.getCompanyId());
        dto.setCompanyPwd(entity.getCompanyPwd());
        dto.setConnectedId(entity.getConnectedId());
        dto.setPrimaryCard(entity.getPrimaryCard());

        dto.setCreatedAt(entity.getCreatedAt());
        dto.setUpdatedAt(entity.getUpdatedAt());

        dto.setCardId(entity.getCardEntity().getCardId());
        dto.setUserNum(entity.getUserEntity().getUserNum());
        return dto;
    }
}
