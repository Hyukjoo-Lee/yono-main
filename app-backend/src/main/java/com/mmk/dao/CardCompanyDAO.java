package com.mmk.dao;

import com.mmk.entity.CardCompanyEntity;

public interface CardCompanyDAO {
    boolean existsCompany(int userNum, String organization);
    
    void save(CardCompanyEntity cardCompanyEntity);

    CardCompanyEntity findByCardCompanyNum(int cardCompanyNum);

    CardCompanyEntity findByUserNumAndOrganization(int userNum, String organization);
}
