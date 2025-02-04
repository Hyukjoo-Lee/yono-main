package com.mmk.dao;

import com.mmk.entity.UserCardCompanyEntity;

public interface UserCardCompanyDAO {
    boolean existsCompany(int userNum, String organization);

    void save(UserCardCompanyEntity userCardCompanyEntity);

    UserCardCompanyEntity findByCardCompanyNum(int cardCompanyNum);

    UserCardCompanyEntity findByUserNumAndOrganizationCode(int userNum, String organization);
}
