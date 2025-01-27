package com.mmk.service;

import java.util.List;
import java.util.Map;

import com.mmk.dto.CardCompanyDTO;
import com.mmk.entity.UserCardEntity;

public interface CodefService {
    String getConId(String organization, String companyId, String companyPwd);

    List<Map<String, Object>> getUserCardList(String connectedId, String organization);

    List<Map<String, Object>> getUserPerformance(String connectedId, String organization);

    // CardCompanyDTO saveCodefCard(CardCompanyDTO cardCompanyDTO);

    String getCardHistory(UserCardEntity userCardEntity, String startDate, String endDate);
}
