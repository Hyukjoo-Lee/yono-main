package com.mmk.service;

import java.util.List;

import com.mmk.dto.UserCardDTO;

public interface UserCardService {
    UserCardDTO registerCard(UserCardDTO userCardDTO, String organization, String cardTitle);

    // userNum 로 모든 카드 조회
    List<UserCardDTO> getAllCardsByUserNum(int userNum);

    UserCardDTO setPrimaryCard(int userCardId, int userNum);
}
