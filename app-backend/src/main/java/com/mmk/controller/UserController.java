package com.mmk.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.mmk.common.ApiResponse;
import com.mmk.dto.UserDTO;
import com.mmk.service.UserService;

/**
 * Controller: 사용자 요청의 값을 DTO 에 담아 Service 계층으로 전달함.
 */
@RestController
@RequestMapping("/user")
public class UserController {

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
        String userId = userDTO.getUserId();
        String password = userDTO.getPassword();
        boolean isLoginSuccessful = userService.validateLogin(userId, password);

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

    // PUT API
    /**
     * 유저 탈퇴
     * User 테이블의 state 값을 INACTIVE 로 변경
     * 
     * @param userNum 사용자 고유 번호 (UserInfo 테이블의 PK)
     * @return void
     */
    @PutMapping("/deleteUser")
    public void deleteUser(@RequestParam("userNum") int userNum) {
        userService.deleteUser(userNum);
    }

    /**
     * 임시비밀번호 발급 및 변경
     * 임의의 임시비밀번호 10자리로 사용자의 비밀번호를 변경
     * 
     * @param email 사용자를 조회할 수단으로 email 을 받음
     * @return String
     * 변경한 임시비밀번호를 반환
     */
    @PutMapping("/updateTempPwd")
    public String getUpdateTempPwd(@RequestParam("email") String email) {
        String tempPwd = UUID.randomUUID().toString().replace("-", "");
        tempPwd = tempPwd.substring(0, 10);

        UserDTO userDTO = userService.getUserByEmail(email);
        userDTO.setPassword(tempPwd);
        userService.updateUser(userDTO);

        return tempPwd;
    }

    /**
     * 비밀번호 변경
     * 
     * @param password 변경할 비밀번호
     * @param userId
     * @return ResponseEntity<ApiResponse<Object>>
     */
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

    /**
     * 유저 정보 업데이트
     * 프로필 사진 변경 시 기존 사진은 삭제하고 새로운 사진 저장
     * 
     * @param userInfoJson 사용자 정보 폼
     * @param profileImage 프로필 사진 등록 시 MultipartFile 형태로 받음 (등록 안 할 시 없음)
     * @param profileText 프로필 사진 미등록 시 사용자의 프로필사진 경로 (등록할 시 없음)
     * 프로필 사진을 등록하냐 아니냐에 따라 사진파일 경로(String), 파일(MultipartFile)
     * 두 가지의 타입이 필요하기 때문에 두 가지 타입으로 Param 을 받음
     * @return ResponseEntity<ApiResponse<UserDTO>>
     * UserCardDTO 가 null 일 때 -> 회원 정보 수정 오류 (status: 400)
     * UserCardDTO 가 null 이 아닐 때 -> 회원 정보 수정 성공, 저장한 정보를 담은 DTO 반환 (status: 200)
     */
    @PutMapping("/{userNum}")
    public ResponseEntity<ApiResponse<UserDTO>> updateUser(
            @RequestParam("userInfo") String userInfoJson,
            @RequestParam(value = "profileImage", required = false) MultipartFile profileImage,
            @RequestParam(value = "profileText", required = false) String profileText) {
            
        UserDTO userDTO = userService.update(userInfoJson, profileImage, profileText);
        
        if (userDTO != null) {
            userService.updateUser(userDTO);

            ApiResponse<UserDTO> response = new ApiResponse<>(200, "회원 정보 수정 성공", userDTO);
            return ResponseEntity.ok(response);
        } else {
            ApiResponse<UserDTO> response = new ApiResponse<>(400, "회원 정보 수정 오류", null);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }
};
