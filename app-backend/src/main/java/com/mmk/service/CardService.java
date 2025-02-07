package com.mmk.service;

import java.util.List;

import com.mmk.dto.UserCardCompanyDTO;
import com.mmk.dto.CardDTO;
import com.mmk.dto.RecCardDTO;
import com.mmk.entity.CardEntity;

public interface CardService {
    CardDTO createCard(CardDTO cardDTO);

    List<CardDTO> getAllCards();

    CardEntity getByTitle(String string);

    List<CardDTO> getAllCardsByOrganizationCode(String organizationCode);

    CardDTO findByUserNum(int userNum);

    UserCardCompanyDTO saveCodefCard(UserCardCompanyDTO usrCardCompanyDTO);

    /**
     * 사용자의 최근 카드 사용 내역을 분석하여,해당 사용자에게 적합한 카드 5개를 추천
     *
     * @param userNum 사용자 고유 번호 (UserInfo 테이블의 PK)
     * @return List<CardDTO> 추천된 카드 리스트 정보
     */
    List<RecCardDTO> getRecommendedCards(int userNum);
}