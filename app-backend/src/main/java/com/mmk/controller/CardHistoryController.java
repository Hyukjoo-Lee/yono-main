package com.mmk.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mmk.common.ApiResponse;
import com.mmk.dto.CardHistoryDTO;
import com.mmk.dto.MonthlySummaryDTO;
import com.mmk.service.CardHistoryService;

@RestController
@RequestMapping("/cardHistory")
public class CardHistoryController {

    @Autowired
    CardHistoryService cardHistoryService;

    // 카드내역 DB에 갱신
    @GetMapping("/update")
    public ResponseEntity<ApiResponse<Boolean>> updateCardHistory(@RequestParam("userNum") int userNum) {
        try {
            cardHistoryService.updateCardHistory(userNum);
            return ResponseEntity.ok(new ApiResponse<>(200, "카드 내역 DB에 갱신 성공", true));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse<>(500, "카드 내역 DB에 갱신 실패", false));
        }
    }

    // 월별통계 - DB에 있는 최근 3개월 카드내역 불러오기
    @GetMapping("/monthlyUpload")
    public ResponseEntity<ApiResponse<List<MonthlySummaryDTO>>> uploadMonthlyHistory(
            @RequestParam("userNum") int userNum) {
        try {
            List<MonthlySummaryDTO> result = cardHistoryService.uploadMonthlyHistory(userNum);
            if (result.isEmpty()) {
                return ResponseEntity.noContent().build();
            } else {
                return ResponseEntity.ok(new ApiResponse<>(200, "최근 카드내역 조회 성공", result));
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse<>(500, "카드내역 불러오는 중 오류 발생", null));
        }
    }

    // 목차별통계 - DB에 있는 최근 1개월 카드내역 불러오기
    @GetMapping("/categoryUpload")
    public ResponseEntity<ApiResponse<List<MonthlySummaryDTO>>> uploadCategoryHistory(
            @RequestParam("userNum") int userNum) {
        try {
            List<MonthlySummaryDTO> result = cardHistoryService.uploadCategoryHistory(userNum);
            if (result.isEmpty()) {
                return ResponseEntity.noContent().build();
            } else {
                return ResponseEntity.ok(new ApiResponse<>(200, "최근 카드내역 조회 성공", result));
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse<>(500, "카드내역 불러오는 중 오류 발생", null));
        }
    }

    // 목차별통계 - 가공되지 않는 DB 의 최근 1개월 카드내역 불러오기
    @GetMapping("/monthData")
    public ResponseEntity<ApiResponse<List<CardHistoryDTO>>> monthData(@RequestParam("userNum") int userNum) {
        try {
            List<CardHistoryDTO> result = cardHistoryService.monthData(userNum);
            if (result.isEmpty()) {
                return ResponseEntity.noContent().build();
            } else {
                return ResponseEntity.ok(new ApiResponse<>(200, "최근 카드내역 조회 성공", result));
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse<>(500, "카드내역 불러오는 중 오류 발생", null));
        }
    }

}
