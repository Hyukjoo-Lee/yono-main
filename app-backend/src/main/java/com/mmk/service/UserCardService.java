package com.mmk.service;

import java.util.List;

import com.mmk.dto.UserCardDTO;

public interface UserCardService {
    UserCardDTO registerCard(UserCardDTO userCardDTO);

    List<UserCardDTO> getUserCardsByUserId(int userId);

}
