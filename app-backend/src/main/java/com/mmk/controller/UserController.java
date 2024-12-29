package com.mmk.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    // id(기본키) 기반으로 유저 정보를 검색
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<UserDTO>> getUserDetails(@PathVariable("id") int id) {
        UserDTO userDTO = userService.getUserById(id);
        if (userDTO != null) {
            ApiResponse<UserDTO> response = new ApiResponse<>(200, "유저 검색 성공", userDTO);
            return ResponseEntity.ok(response);
        } else {
            ApiResponse<UserDTO> response = new ApiResponse<>(404, "유저 정보 찾을 수 없음", null);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }

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

    // POST API
    // 회원가입
    @PostMapping("/signup")
    public ResponseEntity<ApiResponse<UserDTO>> createUser(@RequestBody UserDTO userDTO) {
        UserDTO createdUser = userService.createUser(userDTO);
        ApiResponse<UserDTO> response = new ApiResponse<>(201, "유저 생성 성공", createdUser);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
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

    // 유저 정보 업데이트
    @PostMapping("/{id}")
    public ResponseEntity<ApiResponse<UserDTO>> updateUser(
            @PathVariable("id") int id,
            @RequestBody UserDTO userDTO) {
        UserDTO updatedUser = userService.updateUser(id, userDTO);
        ApiResponse<UserDTO> response = new ApiResponse<>(200, "유저 업데이트 성공", updatedUser);
        return ResponseEntity.ok(response);
    }

    // DELETE API
    // 유저 정보 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Object>> deleteUser(@PathVariable("id") int id) {
        userService.deleteUser(id);
        ApiResponse<Object> response = new ApiResponse<>(200, "유저 삭제 성공", null);
        return ResponseEntity.ok(response);
    }
}
