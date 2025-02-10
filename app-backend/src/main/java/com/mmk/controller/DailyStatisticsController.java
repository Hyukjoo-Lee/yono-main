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
import com.mmk.dto.DailyStatisticsDTO;
import com.mmk.service.CardHistoryService;

/**
 * 사용자의 일별 카드 거래를 조회하는 컨트롤러입니다.
 */
@RestController
@RequestMapping("/user")
public class DailyStatisticsController {

    @Autowired
    private CardHistoryService cardHistoryService;

    /**
     * 특정 사용자의 일별 카드 거래 내역을 조회합니다.
     *
     * @param userNum 거래 내역을 조회할 사용자 번호
     * @return DailyStatisticsDTO 리스트를 포함하는 ApiResponse를 반환합니다.
     */
    @GetMapping("/daily-statistics")
    public ResponseEntity<ApiResponse<List<DailyStatisticsDTO>>> getCardHistoryByUserAndPrimaryCard(@RequestParam("userNum") int userNum) {
        try {
            List<DailyStatisticsDTO> result = cardHistoryService.getCardHistoryByUserAndPrimaryCard(userNum);
            if (result.isEmpty()) {
                return ResponseEntity.noContent().build();
            } else {
                return ResponseEntity.ok(new ApiResponse<>(200, "카드내역 조회 성공", result));
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse<>(500, "카드내역 불러오는 중 오류 발생", null));
        }
    }
    
}
