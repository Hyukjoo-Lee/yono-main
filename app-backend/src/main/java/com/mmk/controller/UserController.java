package com.mmk.controller;

import java.io.File;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Random;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mmk.common.ApiResponse;
import com.mmk.dto.UserDTO;
import com.mmk.service.UserService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Controller: 사용자 요청의 값을 DTO 에 담아 Service 계층으로 전달함.
 */
@RestController
@RequestMapping("/user")
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(CardController.class);

    @Value("${IMAGE_PATH}")
    private String uploadDir;

    @Autowired
    private UserService userService;

    // GET API
    // 유저 아이디 기반으로 유저 정보를 검색
    @GetMapping("/by-user-id")
    public ResponseEntity<ApiResponse<UserDTO>> getUserByUserId(@RequestParam("userId") String userId) {
        UserDTO userDTO = userService.getUserByUserId(userId);
        if (userDTO == null) {
            ApiResponse<UserDTO> response = new ApiResponse<>(404, "유저 정보 찾을 수 없음", null);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }

        ApiResponse<UserDTO> response = new ApiResponse<>(200, "유저 검색 성공", userDTO);
        return ResponseEntity.ok(response);
    }

    // 이메일 기반으로 유저 정보를 검색
    @GetMapping("/by-email")
    public ResponseEntity<ApiResponse<UserDTO>> getUserByEmail(@RequestParam("email") String email) {
        UserDTO userDTO = userService.getUserByEmail(email);
        if (userDTO == null) {
            ApiResponse<UserDTO> response = new ApiResponse<>(404, "유저 정보 찾을 수 없음", null);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }

        ApiResponse<UserDTO> response = new ApiResponse<>(200, "유저 검색 성공", userDTO);
        return ResponseEntity.ok(response);
    }

    // 모든 유저 검색
    @GetMapping("/all")
    public ResponseEntity<ApiResponse<List<UserDTO>>> getAllUsers() {
        List<UserDTO> userDTOs = userService.getAllUsers();
        if (userDTOs.isEmpty()) {
            throw new NoSuchElementException("현재 등록된 유저정보가 없습니다.");
        }

        return ResponseEntity.ok(new ApiResponse<>(200, "전체 유저 검색 성공", userDTOs));
    }

    // 이름, 이메일로 유저 검색
    @GetMapping("/findId")
    public ResponseEntity<ApiResponse<UserDTO>> getFindId(@RequestParam("email") String email,
            @RequestParam("name") String name) {
        boolean existsEmail = userService.existsByEmail(email);
        boolean existsName = userService.existByName(name);

        if (existsEmail && existsName) {
            UserDTO userDTO;
            try {
                userDTO = userService.getFindId(name, email);
            } catch (Exception e) {
                e.printStackTrace();
                return ResponseEntity.noContent().build();
            }
            ApiResponse<UserDTO> response = new ApiResponse<>(200, "유저 검색 성공", userDTO);
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.noContent().build();
        }
    }

    // 이름, 메일, 아이디로 유저 검색
    @GetMapping("/findPwd")
    public ResponseEntity<ApiResponse<UserDTO>> getFindPwd(@RequestParam("name") String name,
            @RequestParam("email") String email, @RequestParam("id") String id) {
        boolean existsName = userService.existByName(name);
        boolean existsEmail = userService.existsByEmail(email);
        boolean existsId = userService.existsByUserId(id);

        if (existsName && existsEmail && existsId) {
            UserDTO userDTO = userService.getFindPwd(name, email, id);

            ApiResponse<UserDTO> response = new ApiResponse<>(200, "유저 검색 성공", userDTO);
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.noContent().build();
        }
    }

    // id(기본키) 기반으로 유저 정보를 검색
    @GetMapping("/{userNum}")
    public ResponseEntity<ApiResponse<UserDTO>> getUserDetails(@PathVariable("userNum") int userNum) {
        try {
            UserDTO userDTO = userService.findByUserNum(userNum);
            if (userDTO != null) {
                return ResponseEntity.ok(new ApiResponse<>(200, "유저 정보 조회 성공", userDTO));
            } else {
                return ResponseEntity.noContent().build();
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse<>(500, "유저정보 조회 중 오류 발생", null));
        }
    }

    // POST API
    // 회원가입
    @PostMapping("/signup")
    public ResponseEntity<ApiResponse<UserDTO>> createUser(@RequestBody UserDTO userDTO) {
        logger.debug("userDTO: {}", userDTO);
        try {
            UserDTO createdUser = userService.createUser(userDTO);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new ApiResponse<>(201, "회원가입 성공", createdUser));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(new ApiResponse<>(409, e.getMessage(), null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse<>(400, "잘못된 요청", null));
        }
    }

    // 로그인
    @PostMapping("/login")
    public ResponseEntity<ApiResponse<UserDTO>> login(@RequestBody UserDTO userDTO) {

        logger.debug("userDTO: {}", userDTO);
        String userId = userDTO.getUserId();
        String password = userDTO.getPassword();
        boolean isSocialLogin = userDTO.getIsSocialLogin();
        boolean isLoginSuccessful = userService.validateLogin(userId, password, isSocialLogin);

        if (isLoginSuccessful) {
            UserDTO userInfo = userService.getUserByUserId(userId);
            ApiResponse<UserDTO> response = new ApiResponse<>(200, "로그인 성공", userInfo);
            return ResponseEntity.ok(response);
        } else {
            ApiResponse<UserDTO> response = new ApiResponse<>(401, "아이디 또는 비밀번호가 올바르지 않습니다. 다시 확인해주세요.", null);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }

    // 중복 체크 (필드, 값 조합)
    @PostMapping("/check-exists")
    public ResponseEntity<Map<String, Boolean>> checkFieldExists(@RequestBody Map<String, String> request) {
        String field = request.get("field");
        String value = request.get("value");
        boolean exists;

        switch (field) {
            case "userId":
                exists = userService.existsByUserId(value);
                break;
            case "email":
                exists = userService.existsByEmail(value);
                break;
            default:
                throw new IllegalArgumentException("Invalid field: " + field);
        }

        Map<String, Boolean> response = new HashMap<>();
        response.put(field + "Available", !exists);
        return ResponseEntity.ok(response);
    }

    // DELETE API
    // 유저 정보 삭제
    @DeleteMapping("/deleteUser")
    public ResponseEntity<ApiResponse<Object>> deleteUser(@RequestParam("userNum") int userNum) {
        userService.deleteUser(userNum);
        return null;
    }

    // PUT API
    // 임시비밀번호 발급 및 변경
    @PutMapping("/updateTempPwd")
    public String getUpdateTempPwd(@RequestParam("email") String email) {
        String tempPwd = UUID.randomUUID().toString().replace("-", "");
        tempPwd = tempPwd.substring(0, 10);

        UserDTO userDTO = userService.getUserByEmail(email);
        userDTO.setPassword(tempPwd);
        userService.updateUser(userDTO);

        return tempPwd;
    }

    // 비밀번호 변경
    @PutMapping("/updatePwd")
    public ResponseEntity<ApiResponse<Object>> updatePwd(@RequestParam("password") String password,
            @RequestParam("userId") String userId) {
        try {
            UserDTO userDTO = userService.getUserByUserId(userId);
            userDTO.setPassword(password);
            userService.updateUser(userDTO);

            ApiResponse<Object> response = new ApiResponse<>(200, "비밀번호 변경 성공", null);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();
            ApiResponse<Object> response = new ApiResponse<>(400, "비밀번호 변경 오류", null);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    };

    // 유저 정보 업데이트
    @PutMapping("/{userNum}")
    public ResponseEntity<ApiResponse<UserDTO>> updateUser(
            @RequestParam("userInfo") String userInfoJson,
            @RequestParam(value = "profileImage", required = false) MultipartFile profileImage,
            @RequestParam(value = "profileText", required = false) String profileText) {
        System.out.println("profileImage: " + profileImage);
        try {
            UserDTO uv = new ObjectMapper().readValue(userInfoJson, UserDTO.class);
            String uploadFolder = uploadDir + "/uploads/images";

            if (profileImage != null && !profileImage.isEmpty()) {
                if (uv.getProfile() != null && !uv.getProfile().isEmpty()) {
                    File existingFile = new File(uploadDir + uv.getProfile());

                    System.out.println("existingFile: " + existingFile);
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
                // String fileDBName = "/images/" + year + "-" + month + "-" + date + "/" +
                // newFileName;
                String fileDBName = "/uploads/images/" + year + "-" + month + "-" + date + "/" + newFileName;

                File saveFile = new File(homedir + "/" + newFileName);

                try {
                    profileImage.transferTo(saveFile);
                } catch (Exception e) {
                    e.printStackTrace();
                }

                uv.setProfile(fileDBName);

            }

            if (profileText != null) {
                uv.setProfile(profileText);
            }

            userService.updateUser(uv);

            ApiResponse<UserDTO> response = new ApiResponse<>(201, "회원 정보 수정 성공", uv);
            return ResponseEntity.ok(response);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            ApiResponse<UserDTO> response = new ApiResponse<>(400, "회원 정보 수정 오류", null);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }
};
