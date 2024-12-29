package com.mmk.service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mmk.dao.UserDAO;
import com.mmk.dto.UserDTO;
import com.mmk.entity.UserInfoEntity;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    @Autowired
    private UserDAO userDAO;

    @Override
    public UserDTO createUser(UserDTO userDTO) {
        if (userDAO.existsByUserId(userDTO.getUserId())) {
            throw new IllegalArgumentException("이미 존재하는 아이디입니다.");
        }

        UserInfoEntity userEntity = toEntity(userDTO);
        userDAO.createUser(userEntity);
        return toDTO(userEntity);
    }

    @Override
    public UserDTO getUserById(int id) {
        UserInfoEntity userEntity = userDAO.getUserById(id);
        if (userEntity == null) {
            throw new NoSuchElementException("ID " + id + "에 해당하는 사용자가 없습니다.");
        }
        return toDTO(userEntity);
    }

    @Override
    public UserDTO getUserByUserId(String userId) {
        UserInfoEntity userEntity = userDAO.getUserByUserId(userId);
        if (userEntity == null) {
            throw new NoSuchElementException("아이디 " + userId + "에 해당하는 사용자가 없습니다.");
        }
        return toDTO(userEntity);
    }

    @Override
    public UserDTO getUserByEmail(String email) {
        UserInfoEntity userEntity = userDAO.getUserByEmail(email);
        if (userEntity == null) {
            throw new NoSuchElementException("이메일 " + email + "에 해당하는 사용자가 없습니다.");
        }
        return toDTO(userEntity);
    }

    @Override
    public List<UserDTO> getAllUsers() {
        List<UserInfoEntity> userEntities = userDAO.getAllUsers();
        if (userEntities.isEmpty()) {
            throw new NoSuchElementException("현재 등록된 유저가 없습니다.");
        }
        return userEntities.stream().map(this::toDTO).collect(Collectors.toList());
    }

    @Override
    public UserDTO updateUser(int id, UserDTO userDTO) {
        UserInfoEntity userEntity = userDAO.getUserById(id);
        if (userEntity == null) {
            throw new NoSuchElementException("ID " + id + "에 해당하는 사용자가 없습니다.");
        }

        userEntity.setName(userDTO.getName());
        userEntity.setEmail(userDTO.getEmail());
        userEntity.setAddress(userDTO.getAddress());
        userEntity.setDetailAddress(userDTO.getDetailAddress());
        userEntity.setPostcode(userDTO.getPostcode());
        userEntity.setSpendingTarget(userDTO.getSpendingTarget());
        userEntity.setProfile(userDTO.getProfile());

        userDAO.updateUser(userEntity);

        return toDTO(userEntity);
    }

    @Override
    public void deleteUser(int id) {
        UserInfoEntity userEntity = userDAO.getUserById(id);
        if (userEntity == null) {
            throw new NoSuchElementException("ID " + id + "에 해당하는 사용자가 없습니다.");
        }
        userDAO.deleteUser(id);
    }

    @Override
    public boolean existsByUserId(String userId) {
        return userDAO.existsByUserId(userId);
    }

    @Override
    public boolean existsByEmail(String email) {
        return userDAO.existsByEmail(email);
    }

    // DTO → Entity 변환
    private UserInfoEntity toEntity(UserDTO dto) {
        UserInfoEntity entity = new UserInfoEntity();
        entity.setUserId(dto.getUserId());
        entity.setPassword(dto.getPassword());
        entity.setEmail(dto.getEmail());
        entity.setName(dto.getName());
        entity.setAddress(dto.getAddress());
        entity.setDetailAddress(dto.getDetailAddress());
        entity.setPostcode(dto.getPostcode());
        entity.setSpendingTarget(dto.getSpendingTarget());
        entity.setProfile(dto.getProfile());
        return entity;
    }

    // Entity → DTO 변환
    private UserDTO toDTO(UserInfoEntity entity) {
        UserDTO dto = new UserDTO();
        dto.setUserNum(entity.getUserNum());
        dto.setUserId(entity.getUserId());
        dto.setPassword(entity.getPassword());
        dto.setEmail(entity.getEmail());
        dto.setName(entity.getName());
        dto.setAddress(entity.getAddress());
        dto.setDetailAddress(entity.getDetailAddress());
        dto.setPostcode(entity.getPostcode());
        dto.setSpendingTarget(entity.getSpendingTarget());
        dto.setProfile(entity.getProfile());
        return dto;
    }
}