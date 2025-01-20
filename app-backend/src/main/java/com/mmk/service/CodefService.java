package com.mmk.service;

import com.mmk.entity.UserCardEntity;

public interface CodefService {
    String getConId(String organization, String companyId, String companyPwd);
    
    String getCardHistory(UserCardEntity userCardEntity, String startDate, String endDate);
}
