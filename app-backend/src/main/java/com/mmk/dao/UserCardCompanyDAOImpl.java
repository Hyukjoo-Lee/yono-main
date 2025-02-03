package com.mmk.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.mmk.entity.UserCardCompanyEntity;

@Repository
public class UserCardCompanyDAOImpl implements UserCardCompanyDAO {

    @Autowired
    private UserCardCompanyRepository cardCompanyRepository;

    @Override
    public boolean existsCompany(int userNum, String organization) {
        return cardCompanyRepository.existsByUserNumAndOrganizationCode(userNum, organization);
    }

    @Override
    public void save(UserCardCompanyEntity cardCompanyEntity) {
        cardCompanyRepository.save(cardCompanyEntity);
    }

    @Override
    public UserCardCompanyEntity findByCardCompanyNum(int cardCompanyNum) {
        return cardCompanyRepository.findByCardCompanyNum(cardCompanyNum);
    }

    @Override
    public UserCardCompanyEntity findByUserNumAndOrganizationCode(int userNum, String organization) {
        return cardCompanyRepository.findByUserNumAndOrganizationCode(userNum, organization);
    }
}
