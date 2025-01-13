package com.mmk.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.mmk.entity.UserEntity;

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
    public boolean existsByName(String name) {
        return userRepository.existsByName(name);
    }

    @Override
    public void createUser(UserEntity userEntity) {
        userRepository.save(userEntity);
    }

    @Override
    public UserEntity getUserById(int id) {
        UserEntity userInfoEntity = userRepository.getReferenceById(id);
        return userInfoEntity;
    }

    @Override
    public UserEntity getUserByUserId(String userId) {
        UserEntity userInfoEntity = userRepository.findByUserId(userId);
        return userInfoEntity;
    }

    @Override
    public UserEntity getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public List<UserEntity> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public void updateUser(UserEntity userEntity) {
        userRepository.save(userEntity);
    }

    @Override
    public void deleteUser(int id) {
        userRepository.deleteById(id);
    }

    @Override
    public UserEntity getFindId(String name, String email) {
        return userRepository.findByNameAndEmail(name, email);
    }

    @Override
    public UserEntity getFindPwd(String name, String email, String id) {
        return userRepository.findByNameAndEmailAndUserId(name, email, id);
    }
}