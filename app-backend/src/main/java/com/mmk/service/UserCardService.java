package com.mmk.service;

import java.util.List;

import com.mmk.dto.UserCardDTO;

public interface UserCardService {
    UserCardDTO registerCard(UserCardDTO userCardDTO, String organization, String cardTitle);

    List<UserCardDTO> getUserCardsByUserId(int userId);

    UserCardDTO setPrimaryCard(int userCardId, int userNum);
}
