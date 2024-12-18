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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mmk.common.ApiResponse;
import com.mmk.dao.UserRepository;
import com.mmk.service.UserService;
// import com.mmk.service.UserService;
import com.mmk.vo.UserInfoVO;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    // GET API 시작
    // id 기반으로 유저 정보를 검색
    @GetMapping("/id/{id}") // user/id/{id}
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

    // email 을 기반으로 유저 정보를 검색
    @GetMapping("/email") // /user/username?username={}
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

    // POST API 시작
    @PostMapping("/signup")
    public ResponseEntity<ApiResponse<UserInfoVO>> createUser(@RequestBody UserInfoVO userVO) {
        UserInfoVO createdUser = userService.createUser(userVO);
        ApiResponse<UserInfoVO> response = new ApiResponse<>(201, "유저 생성 성공", createdUser);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/check-email-exists")
    public ResponseEntity<Map<String, Boolean>> checkEmailExists(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        System.out.println("email sent from react: " + email);
        boolean emailExists = userRepository.existsByEmail(email);

        Map<String, Boolean> response = new HashMap<>();
        response.put("emailAvailable", !emailExists);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/update")
    public void updateUser(@RequestBody UserInfoVO uv) {
        userRepository.save(uv);
    }

    // DELETE API 시작
    @DeleteMapping("/id")
    public void deleteUser(@RequestParam("id") int id) {

    }
};