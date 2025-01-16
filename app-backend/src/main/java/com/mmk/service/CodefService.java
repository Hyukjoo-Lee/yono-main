package com.mmk.service;

import java.util.List;
import java.util.concurrent.CompletableFuture;

import com.mmk.dto.MonthlySummary;
import com.mmk.entity.UserCardEntity;

public interface CodefService {
    String getConId(String organization, String companyId, String companyPwd);
    CompletableFuture<List<MonthlySummary>> getCardHistory(UserCardEntity userCardEntity);
}
