package com.mmk.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.mmk.common.ApiResponse;
import com.mmk.dto.UserCardDTO;
import com.mmk.service.UserCardService;

@RestController
@RequestMapping("/card")
public class UserCardController {

    @Autowired
    private UserCardService userCardService;

    // 특정 사용자의 보유 카드 조회
    @GetMapping("/user/{userNum}")
    public ResponseEntity<ApiResponse<List<UserCardDTO>>> getUserCards(@PathVariable int userNum) {
        List<UserCardDTO> userCards = userCardService.getUserCardsByUserId(userNum);
        if (userCards.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse<>(404, "해당 사용자가 보유한 카드가 없습니다.", null));
        }
        return ResponseEntity.ok(new ApiResponse<>(200, "사용자 보유 카드조회 성공", userCards));
    }

    // 사용자 카드 등록
    @PostMapping("/register")
    public ResponseEntity<ApiResponse<UserCardDTO>> registerUserCard(@RequestBody UserCardDTO userCardDTO) {
        UserCardDTO savedCard = userCardService.registerCard(userCardDTO);
        ApiResponse<UserCardDTO> response = new ApiResponse<>(201, "카드등록 성공", savedCard);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

}
