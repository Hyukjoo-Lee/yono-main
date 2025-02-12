package com.mmk.service;

import java.io.File;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Random;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.mmk.controller.CardController;
import com.mmk.dao.UserDAO;
import com.mmk.dto.UserDTO;
import com.mmk.entity.UserEntity;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    private static final Logger logger = LoggerFactory.getLogger(CardController.class);

    @Autowired
    private UserDAO userDAO;

    @Value("${IMAGE_PATH}")
    private String uploadDir;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Override
    public UserDTO createUser(UserDTO userDTO) {

        // 아이디 중복 체크
        if (userDAO.existsByUserId(userDTO.getUserId())) {
            throw new IllegalArgumentException("이미 존재하는 아이디입니다.");
        }

        // 이메일 중복 체크
        if (userDAO.existsByEmail(userDTO.getEmail())) {
            throw new IllegalArgumentException("이미 존재하는 이메일입니다.");
        }
        // 비밀번호 암호화
        String encodedPassword = passwordEncoder.encode(userDTO.getPassword());
        userDTO.setPassword((encodedPassword));

        UserEntity userEntity = toEntity(userDTO);
        userDAO.createUser(userEntity);
        return toDTO(userEntity);
    }

    @Override
    public UserDTO findByUserNum(int userNum) {
        UserEntity userEntity = userDAO.findByUserNum(userNum);
        return toDTO(userEntity);
    }

    @Override
    public UserEntity findEntityByUserNum(int userNum) {
        UserEntity userEntity = userDAO.findByUserNum(userNum);
        return userEntity;
    }

    @Override
    public UserDTO getUserByUserId(String userId) {
        UserEntity userEntity = userDAO.getUserByUserId(userId);
        return toDTO(userEntity);
    }

    @Override
    public UserEntity findByUserId(String userId) {
        UserEntity userEntity = userDAO.getUserByUserId(userId);
        if (userEntity == null) {
            throw new NoSuchElementException("아이디 " + userId + "에 해당하는 사용자가 없습니다.");
        }
        return userEntity;
    }

    @Override
    public UserDTO getUserByEmail(String email) {
        UserEntity userEntity = userDAO.getUserByEmail(email);
        return toDTO(userEntity);
    }

    @Override
    public List<UserDTO> getAllUsers() {
        List<UserEntity> userEntities = userDAO.getAllUsers();
        if (userEntities.isEmpty()) {
            throw new NoSuchElementException("현재 등록된 유저가 없습니다.");
        }
        return userEntities.stream().map(this::toDTO).collect(Collectors.toList());
    }

    @Override
    public void deleteUser(int userNum) {
        UserDTO userDTO = toDTO(userDAO.findByUserNum(userNum));
        userDTO.setState("INACTIVE");
        userDAO.updateUser(toEntity(userDTO));
    }

    @Override
    public boolean existsByUserId(String userId) {
        return userDAO.existsByUserId(userId);
    }

    @Override
    public boolean existsByEmail(String email) {
        return userDAO.existsByEmail(email);
    }

    @Override
    public boolean existByName(String name) {
        return userDAO.existsByName(name);
    }

    @Override
    public boolean checkUserState(String userId) {
        UserEntity userEntity = userDAO.getUserByUserId(userId);

        if (userEntity == null) {
            return false;
        }

        return "ACTIVE".equals(userEntity.getState());
    }

    public boolean validateLogin(String userId, String password, boolean isSocialLogin) {
        UserEntity userEntity = userDAO.getUserByUserId(userId);
        logger.debug("userEntity: {}", userEntity);
        // 소셜 로그인 시 비밀번호 확인 없이 바로 로그인 처리
        if (isSocialLogin) {
            return true;
        }
        if (userEntity != null) {
            return passwordEncoder.matches(password, userEntity.getPassword());
        }

        return false;
    }

    @Override
    public void updateUser(UserDTO userDTO) {
        UserEntity ue = toEntity(userDTO);

        // 비밀번호 암호화하여 저장
        logger.debug(userDTO.getPassword());
        if (userDTO.getPassword() != null && !userDTO.getPassword().isEmpty()) {
            ue.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        }

        userDAO.updateUser(ue);
    }

    @Override
    public UserDTO getFindId(String name, String email) {
        UserEntity ue = userDAO.getFindId(name, email);
        UserDTO result = toDTO(ue);
        return result;
    }

    @Override
    public UserDTO getFindPwd(String name, String email, String id) {
        UserEntity ue = userDAO.getFindPwd(name, email, id);
        UserDTO result = toDTO(ue);
        return result;
    }

    @Override
    public UserDTO update(String userInfoJson, MultipartFile profileImage, String profileText) {
        try {
            UserDTO uv = new ObjectMapper().readValue(userInfoJson, UserDTO.class);
            String uploadFolder = uploadDir + "/uploads/images";

            if (profileImage != null && !profileImage.isEmpty()) {
                if (uv.getProfile() != null && !uv.getProfile().isEmpty()) {
                    File existingFile = new File(uploadDir + uv.getProfile());

                    if (existingFile.exists()) {
                        existingFile.delete();
                    }
                }
            }

            if (profileImage != null && !profileImage.isEmpty()) {
                String fileName = profileImage.getOriginalFilename();

                if (fileName == null || fileName.isEmpty()) {
                    fileName = "default_filename.jpg";
                }

                Calendar cal = Calendar.getInstance();
                int year = cal.get(Calendar.YEAR);
                int month = cal.get(Calendar.MONTH) + 1;
                int date = cal.get(Calendar.DATE);

                String homedir = uploadFolder + "/" + year + "-" + month + "-" + date;

                File path = new File(homedir);
                if (!path.exists()) {
                    path.mkdirs();
                }
                Random r = new Random();
                int random = r.nextInt(100000000);
                int index = fileName.lastIndexOf(".");
                String fileExtension = fileName.substring(index + 1);
                String newFileName = "profile_" + year + month + date + random + "." + fileExtension;
                String fileDBName = "/uploads/images/" + year + "-" + month + "-" + date + "/" + newFileName;

                File saveFile = new File(homedir + "/" + newFileName);

                try {
                    profileImage.transferTo(saveFile);
                } catch (Exception e) {
                    throw e;
                }

                uv.setProfile(fileDBName);

            }

            if (profileText != null) {
                if (uv.getProfile() != null && !uv.getProfile().isEmpty()) {
                    File existingFile = new File(uploadDir + uv.getProfile());

                    if (existingFile.exists()) {
                        existingFile.delete();
                    }
                }
                uv.setProfile(profileText);
            }

            return uv;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public boolean validatePwd(String userId, String password) {
        UserEntity userEntity = userDAO.getUserByUserId(userId);

        if (userEntity != null) {
            return passwordEncoder.matches(password, userEntity.getPassword());
        }

        return false;
    }

    // DTO → Entity 변환
    private UserEntity toEntity(UserDTO dto) {
        UserEntity entity = new UserEntity();
        entity.setUserNum(dto.getUserNum());
        entity.setUserId(dto.getUserId());
        entity.setPassword(dto.getPassword());
        entity.setEmail(dto.getEmail());
        entity.setName(dto.getName());
        entity.setSpendingTarget(dto.getSpendingTarget());
        entity.setProfile(dto.getProfile());
        entity.setCreatedAt(dto.getCreatedAt());
        entity.setUpdatedAt(dto.getUpdatedAt());
        entity.setState(dto.getState());
        entity.setUserRole(dto.getUserRole());
        return entity;
    }

    // Entity → DTO 변환
    private UserDTO toDTO(UserEntity entity) {
        if (entity != null) {
            UserDTO dto = new UserDTO();
            dto.setUserNum(entity.getUserNum());
            dto.setUserId(entity.getUserId());
            dto.setPassword(entity.getPassword());
            dto.setEmail(entity.getEmail());
            dto.setName(entity.getName());
            dto.setSpendingTarget(entity.getSpendingTarget());
            dto.setProfile(entity.getProfile());
            dto.setCreatedAt(entity.getCreatedAt());
            dto.setUpdatedAt(entity.getUpdatedAt());
            dto.setState(entity.getState());
            dto.setUserRole(entity.getUserRole());
            return dto;
        } else {
            return null;
        }
    }

    @Override
    public ArrayList<Integer> findAllUserNum() {
        List<UserEntity> users = userDAO.findAll();
        return users.stream()
                .map(UserEntity::getUserNum)
                .collect(Collectors.toCollection(ArrayList::new));
    }

}
