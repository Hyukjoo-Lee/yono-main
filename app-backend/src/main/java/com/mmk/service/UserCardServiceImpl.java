package com.mmk.service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mmk.dao.CardDAO;
import com.mmk.dao.UserCardCompanyDAO;
import com.mmk.dao.UserCardDAO;
import com.mmk.dao.UserDAO;
import com.mmk.dto.CardBenefitDTO;
import com.mmk.dto.UserCardDTO;
import com.mmk.entity.CardEntity;
import com.mmk.entity.UserCardCompanyEntity;
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
    private UserCardCompanyDAO cardCompanyDAO;

    @Autowired
    private CodefService codefService;

    // 사용자 카드 등록
    @Override
    public UserCardDTO registerCard(UserCardDTO userCardDTO, String organization, String cardTitle) {
        String userCardNum = userCardDTO.getUserCardNum();
        int userNum = userCardDTO.getUserNum();

        if (cardCompanyDAO.existsCompany(userNum, organization)) {
            if (userCardDAO.existsByUserCardNum(userCardNum)) {
                throw new IllegalArgumentException("이미 등록된 카드입니다.");
            } else {
                int cardCompanyNum = cardCompanyDAO.findByUserNumAndOrganizationCode(userNum, organization)
                        .getCardCompanyNum();
                int cardId = cardDAO.findByCardTitle(cardTitle).getCardId();
                userCardDTO.setCardCompanyNum(cardCompanyNum);
                userCardDTO.setCardId(cardId);

                UserCardEntity userCardEntity = toEntity(userCardDTO);

                LocalDate today = LocalDate.now();
                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
                String endDate = today.format(formatter);

                String result = codefService.getCardHistory(userCardEntity, endDate, endDate);
                ObjectMapper objectMapper = new ObjectMapper();
                try {
                    JsonNode jsonNode = objectMapper.readTree(result);
                    String code = jsonNode.path("result").path("code").asText();
                    System.out.println("code: " + code);
                    if (code.equals("CF-00000")) {
                        userCardDAO.registerCard(userCardEntity);
                        return toDTO(userCardEntity);
                    } else {
                        throw new IllegalArgumentException("잘못된 카드 정보입니다.");
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                    throw new IllegalArgumentException(e.getMessage());
                }
            }
        } else {
            return null;
        }
    }

    // 사용자 보유 카드 조회
    @Override
    public List<UserCardDTO> getAllCardsByUserNum(int userNum) {
        List<UserCardEntity> userCardEntities = userCardDAO.getAllCardsByUserNum(userNum);
        List<UserCardDTO> userCardDTOs = new ArrayList<>();
        for (UserCardEntity entity : userCardEntities) {
            UserCardDTO dto = toDTO(entity);
            userCardDTOs.add(dto);
        }

        return userCardDTOs;
    }

    // 사용자 보유 카드 조회 (카드정보, 혜택 포함)
    @Override
    public List<UserCardDTO> getAllCardsInfoByUserNum(int userNum) {
        List<UserCardEntity> userCardEntities = userCardDAO.getAllCardsInfoByUserNum(userNum);

        // 사용자 카드 리스트 필요한 데이터만 가공, 현재는 나머지 null, 0 으로 처리됨
        return userCardEntities.stream().map(entity -> {
            UserCardDTO dto = new UserCardDTO();
            dto.setUserCardId(entity.getUserCardId());
            dto.setUserCardNum(maskCardNumber(entity.getUserCardNum()));
            dto.setPrimaryCard(entity.getPrimaryCard());
            dto.setCardImg(entity.getCardImgUrl());

            dto.setCardTitle(entity.getCardEntity().getCardTitle());

            dto.setCardBenefits(
                    entity.getCardEntity().getCardBenefits() == null ? Collections.emptyList()
                            : entity.getCardEntity().getCardBenefits().stream()
                                    .map(b -> new CardBenefitDTO(
                                            b.getBenefitTitle(),
                                            b.getBenefitValue(),
                                            b.getBenefitType()))
                                    .collect(Collectors.toList()));

            return dto;
        }).collect(Collectors.toList());
    }

    // 대표 카드 등록
    @Override
    public UserCardDTO setPrimaryCard(int userCardId, int userNum) {
        userCardDAO.removePrimaryCardAll(userNum);
        userCardDAO.setPrimaryCard(userCardId);

        return toDTO(userCardDAO.findByUserCardId(userCardId));
    }

    // 유저 정보로 대표 카드 조회
    @Override
    public UserCardDTO findPrimaryCardByUserNum(int userNum) {
        return toDTO(userCardDAO.findByUserNumAndPrimaryCard(userDAO.findByUserNum(userNum), 1));
    }

    // 카드 번호 마스킹 처리 (앞 4자리만)
    private String maskCardNumber(String cardNumber) {
        if (cardNumber == null || cardNumber.length() < 16) {
            return "****-****-****-****";
        }
        return cardNumber.substring(0, 4) + "-****-****-****";
    }

    private UserCardEntity toEntity(UserCardDTO dto) {
        UserCardEntity entity = new UserCardEntity();
        entity.setUserCardId(dto.getUserCardId());
        entity.setUserCardNum(dto.getUserCardNum());
        entity.setExpiryDate(dto.getExpiryDate());
        entity.setCardPwd(dto.getCardPwd());
        entity.setCardImgUrl(dto.getCardImg());
        entity.setPrimaryCard(dto.getPrimaryCard());
        entity.setCreatedAt(dto.getCreatedAt());
        entity.setUpdatedAt(dto.getUpdatedAt());

        UserCardCompanyEntity cardCompanyEntity = cardCompanyDAO.findByCardCompanyNum(dto.getCardCompanyNum());
        CardEntity cardEntity = cardDAO.findByCardId(dto.getCardId());
        UserEntity userEntity = userDAO.findByUserNum(dto.getUserNum());

        entity.setUserCardCompanyEntity(cardCompanyEntity);
        entity.setCardEntity(cardEntity);
        entity.setUserEntity(userEntity);
        return entity;
    }

    private UserCardDTO toDTO(UserCardEntity entity) {
        if (entity != null) {
            UserCardDTO dto = new UserCardDTO();
            dto.setUserCardId(entity.getUserCardId());
            dto.setUserCardNum(entity.getUserCardNum());
            dto.setExpiryDate(entity.getExpiryDate());
            dto.setCardPwd(entity.getCardPwd());
            dto.setCardImg(entity.getCardImgUrl());
            dto.setPrimaryCard(entity.getPrimaryCard());
            dto.setCreatedAt(entity.getCreatedAt());
            dto.setUpdatedAt(entity.getUpdatedAt());

            dto.setCardCompanyNum(entity.getUserCardCompanyEntity().getCardCompanyNum());
            dto.setCardId(entity.getCardEntity().getCardId());
            dto.setUserNum(entity.getUserEntity().getUserNum());
            dto.setCardBenefits(
                    entity.getCardEntity().getCardBenefits() == null ? Collections.emptyList()
                            : entity.getCardEntity().getCardBenefits().stream()
                                    .map(b -> new CardBenefitDTO(b.getBenefitTitle(), b.getBenefitValue(),
                                            b.getBenefitType()))
                                    .collect(Collectors.toList()));
            dto.setCardTitle(entity.getCardEntity().getCardTitle());
            return dto;
        } else {
            return null;
        }
    }
}
