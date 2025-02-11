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

    /**
     * 사용자 대표카드의 최근 3개월 카드 사용내역을 DB에 저장
     * DB에 3개월 이내의 카드 사용내역이 이미 있다면 최근 날짜부터 실행 시점의 날짜까지의 내역을 DB에 저장
     * 
     * @param userNum 사용자 고유 번호 (UserInfo 테이블의 PK)
     * @return ResponseEntity<ApiResponse<Boolean>>
     * DB에 갱신 성공 시 true, 실패 시 false
     */
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

    /**
     * 월별통계 - DB에 있는 최근 3개월 카드내역 불러오기
     * 
     * @param userNum 사용자 고유 번호 (UserInfo 테이블의 PK)
     * @return ResponseEntity<ApiResponse<List<MonthlySummaryDTO>>>
     * DB에서 가져온 데이터를 월, 카테고리 별로 그룹핑하여 합산금액과 함께 반환
     */
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

    /**
     * 목차별통계 - DB에 있는 최근 1개월 카드내역 불러오기
     * 
     * @param userNum 사용자 고유 번호 (UserInfo 테이블의 PK)
     * @return ResponseEntity<ApiResponse<List<MonthlySummaryDTO>>>
     * DB에서 가져온 데이터를 월, 카테고리 별로 그룹핑하여 합산금액과 함께 반환
     */
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

    /**
     * 목차별통계 - 가공되지 않는 DB 의 최근 1개월 카드내역 불러오기
     * 
     * @param userNum 사용자 고유 번호 (UserInfo 테이블의 PK)
     * @return ResponseEntity<ApiResponse<List<CardHistoryDTO>>> 카드 승인 내역 리스트
     */
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
