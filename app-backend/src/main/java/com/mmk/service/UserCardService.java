package com.mmk.service;

import java.util.List;
import java.util.concurrent.CompletableFuture;

import com.mmk.dto.MonthlySummary;
import com.mmk.dto.UserCardDTO;

public interface UserCardService {
    UserCardDTO registerCard(UserCardDTO userCardDTO);

    List<UserCardDTO> getUserCardsByUserId(int userId);

    UserCardDTO setPrimaryCard(UserCardDTO uc);

    CompletableFuture<List<MonthlySummary>> getCardHistory(int userNum);
}
