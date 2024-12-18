package com.mmk.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.mmk.vo.UserInfoVO;

@Repository
public class UserDAOImpl implements UserDAO {

    @Autowired
    UserRepository userRepository;

    @Override
    public boolean existsByEmail(String email) {
        return this.userRepository.existsByEmail(email);
    }

    @Override
    public void createUser(UserInfoVO uv) {
        this.userRepository.save(uv);
    }

    @Override
    public void deleteUser(int id) {
    }

    @Override
    public void updateUser(UserInfoVO uv) {
    }

}
