package com.mmk.dao;

import java.util.List;

import com.mmk.entity.UserEntity;

public interface UserDAO {

    void createUser(UserEntity uEntity);

    UserEntity getUserById(int id);

    UserEntity getUserByUserId(String userId);

    UserEntity getUserByEmail(String email);

    List<UserEntity> getAllUsers();

    boolean existsByUserId(String userId);

    boolean existsByEmail(String email);

    void updateUser(UserEntity uEntity);

    void deleteUser(int id);
}