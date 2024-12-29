package com.mmk.dao;

import java.util.List;

import com.mmk.entity.UserInfoEntity;

public interface UserDAO {

    void createUser(UserInfoEntity uEntity);

    UserInfoEntity getUserById(int id);

    UserInfoEntity getUserByUserId(String userId);

    UserInfoEntity getUserByEmail(String email);

    List<UserInfoEntity> getAllUsers();

    boolean existsByUserId(String userId);

    boolean existsByEmail(String email);

    void updateUser(UserInfoEntity uEntity);

    void deleteUser(int id);
}