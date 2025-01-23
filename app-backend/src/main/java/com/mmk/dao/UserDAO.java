package com.mmk.dao;

import java.util.List;

import com.mmk.entity.UserEntity;

public interface UserDAO {

    void createUser(UserEntity uEntity);

    UserEntity findByUserNum(int userNum);

    UserEntity getUserByUserId(String userId);

    UserEntity getUserByEmail(String email);

    List<UserEntity> getAllUsers();

    boolean existsByUserId(String userId);

    boolean existsByEmail(String email);

    boolean existsByName(String name);

    void updateUser(UserEntity uEntity);

    void deleteUser(int userNum);

    UserEntity getFindId(String name, String email);

    UserEntity getFindPwd(String name, String email, String id);
}