package com.mmk.service;

import java.util.List;

import com.mmk.dto.UserDTO;

public interface UserService {
    UserDTO createUser(UserDTO userDTO);

    UserDTO getUserById(int id);

    UserDTO getUserByUserId(String userId);

    UserDTO getUserByEmail(String email);

    List<UserDTO> getAllUsers();

    UserDTO updateUser(int id, UserDTO userDTO);

    void deleteUser(int id);

    boolean existsByUserId(String userId);

    boolean existsByEmail(String email);

    boolean validateLogin(String userId, String password);
}