package com.mmk.controller;

import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mmk.common.ApiResponse;
import com.mmk.dto.MonthlySummary;
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
    public ResponseEntity<ApiResponse<UserCardDTO>> registerUserCard(@RequestBody UserCardDTO userCardDTO, @RequestParam String organization, @RequestParam String cardTitle) {
        UserCardDTO savedCard = userCardService.registerCard(userCardDTO, organization, cardTitle);
        if (savedCard == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse<>(404, "등록되어 있지 않은 카드사입니다.", null));
        } else {
            ApiResponse<UserCardDTO> response = new ApiResponse<>(201, "카드등록 성공", savedCard);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        }
    }

    // 대표카드 설정
    @GetMapping("/setPrimaryCard")
    public ResponseEntity<ApiResponse<UserCardDTO>> setPrimaryCard(
            @RequestBody Map<String, Object> cardInfo) {

        try {
            UserCardDTO uc = new ObjectMapper().convertValue(cardInfo.get("cardInfo"), UserCardDTO.class);
            UserCardDTO userCardDTO = userCardService.setPrimaryCard(uc);
            ApiResponse<UserCardDTO> response = new ApiResponse<>(201, "대표 카드 설정 성공", userCardDTO);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();
            ApiResponse<UserCardDTO> response = new ApiResponse<>(400, "대표 카드 등록 오류", null);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    // 카드내역 조회
    @GetMapping("/getCardHistory")
    public CompletableFuture<List<MonthlySummary>> getCardHistory(@RequestParam("userNum") int userNum) {
        return userCardService.getCardHistory(userNum);
    }

}
