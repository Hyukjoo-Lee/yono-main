package com.mmk.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
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

import com.mmk.common.ApiResponse;
import com.mmk.dao.UserRepository;
import com.mmk.service.UserService;
import com.mmk.vo.UserInfoVO;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    // GET API
    // id(기본키) 기반으로 유저 정보를 검색
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<UserInfoVO>> getUserDetails(@PathVariable("id") int id) {
        Optional<UserInfoVO> user = userRepository.findById(id);

        if (user.isPresent()) {
            ApiResponse<UserInfoVO> response = new ApiResponse<>(200, "유저 검색 성공", user.get());
            return ResponseEntity.ok(response);
        } else {
            ApiResponse<UserInfoVO> response = new ApiResponse<>(404, "유저 정보 찾을 수 없음", null);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }

    // 유저 아이디 기반으로 유저 정보를 검색
    @GetMapping("/by-user-id")
    public ResponseEntity<ApiResponse<UserInfoVO>> getUserByUserId(@RequestParam("userId") String userId) {
        UserInfoVO user = userRepository.findUserVOByUserId(userId);

        if (user == null) {
            ApiResponse<UserInfoVO> response = new ApiResponse<>(404, "유저 정보 찾을 수 없음", null);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }

        ApiResponse<UserInfoVO> response = new ApiResponse<>(200, "유저 검색 성공", user);
        return ResponseEntity.ok(response);
    }

    // 이메일 기반으로 유저 정보를 검색
    @GetMapping("/by-email")
    public ResponseEntity<ApiResponse<UserInfoVO>> getUserByEmail(@RequestParam("email") String email) {
        UserInfoVO user = userRepository.findUserVOByEmail(email);

        if (user == null) {
            ApiResponse<UserInfoVO> response = new ApiResponse<>(404, "유저 정보 찾을 수 없음", null);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }

        ApiResponse<UserInfoVO> response = new ApiResponse<>(200, "유저 검색 성공", user);
        return ResponseEntity.ok(response);
    }

    // 모든 유저 검색
    @GetMapping("/all")
    public ResponseEntity<ApiResponse<List<UserInfoVO>>> getAllUsers() {
        List<UserInfoVO> uList = userRepository.findAll();

        if (uList.isEmpty()) {
            throw new NoSuchElementException("현재 등록된 유저정보가 없습니다.");
        }

        return ResponseEntity.ok(new ApiResponse<>(200, "전체 유저 검색 성공", uList));
    }

    // POST API
    // 회원가입
    @PostMapping("/signup")
    public ResponseEntity<ApiResponse<UserInfoVO>> createUser(@RequestBody UserInfoVO userVO) {
        UserInfoVO createdUser = userService.createUser(userVO);
        ApiResponse<UserInfoVO> response = new ApiResponse<>(201, "유저 생성 성공", createdUser);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // 중복 체크 (필드, 값 조합)
    @PostMapping("/check-exists")
    public ResponseEntity<Map<String, Boolean>> checkFieldExists(@RequestBody Map<String, String> request) {
        String field = request.get("field");
        String value = request.get("value");
        boolean exists;
        System.out.println("field: " + field + "value: " + value);
        switch (field) {
            case "userId":
                exists = userRepository.existsByUserId(value);
                break;
            case "email":
                exists = userRepository.existsByEmail(value);
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
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Object>> deleteUser(@RequestParam("id") int id) {
        Optional<UserInfoVO> user = userRepository.findById(id);

        if (user.isEmpty()) {
            throw new NoSuchElementException("유저를 찾을 수 없습니다. ID: " + id);
        }

        userRepository.deleteById(id);
        ApiResponse<Object> response = new ApiResponse<>(200, "유저 삭제 성공", null);
        return ResponseEntity.ok(response);
    }

    // PUT API
    // 유저 정보 업데이트
    @PutMapping("/{userNum}")
    public ResponseEntity<ApiResponse<UserInfoVO>> updateUser(@RequestBody UserInfoVO uv) {
        userRepository.save(uv);
        ApiResponse<UserInfoVO> response = new ApiResponse<>(201, "회원 정보 수정 성공", uv);
        return ResponseEntity.ok(response);
    }

};