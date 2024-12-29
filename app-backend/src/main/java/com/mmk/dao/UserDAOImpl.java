package com.mmk.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.mmk.entity.UserInfoEntity;

/**
 * DAO (Data Access Object): 데이터 베이스에 CRUD 작업을 하는 객체이다.
 */
@Repository
public class UserDAOImpl implements UserDAO {

    @Autowired
    private UserRepository userRepository;

    @Override
    public boolean existsByUserId(String userId) {
        return userRepository.existsByUserId(userId);
    }

    @Override
    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    @Override
    public void createUser(UserInfoEntity userEntity) {
        userRepository.save(userEntity);
    }

    @Override
    public UserInfoEntity getUserById(int id) {
        UserInfoEntity userInfoEntity = userRepository.getReferenceById(id);
        return userInfoEntity;
    }

    @Override
    public UserInfoEntity getUserByUserId(String userId) {
        UserInfoEntity userInfoEntity = userRepository.findByUserId(userId);
        return userInfoEntity;
    }

    @Override
    public UserInfoEntity getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public List<UserInfoEntity> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public void updateUser(UserInfoEntity userEntity) {
        userRepository.save(userEntity);
    }

    @Override
    public void deleteUser(int id) {
        userRepository.deleteById(id);
    }
}