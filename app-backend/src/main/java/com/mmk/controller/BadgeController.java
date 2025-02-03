package com.mmk.controller;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mmk.common.ApiResponse;
import com.mmk.dto.BadgeDTO;
import com.mmk.dto.RankingDTO;
import com.mmk.service.BadgeService;
import com.mmk.service.CardHistoryService;

@RestController
@RequestMapping("/badge")
public class BadgeController {

    @Autowired
    private CardHistoryService cardHistoryService;

    @Autowired
    private BadgeService badgeService;

    @GetMapping("/Comparison")
    public ResponseEntity<ApiResponse<BadgeDTO>> getMonthlyComparison(
        @RequestParam("userNum") int userNum,
        @RequestParam("yearMonth") String yearMonth) {

        try {
            // 현재 월의 총 사용 금액을 조회
            int currentMonthAmount = cardHistoryService.getMonthlyTotalAmount(userNum, yearMonth);

            LocalDate currentMonthStart = LocalDate.parse(yearMonth + "01", DateTimeFormatter.ofPattern("yyyyMMdd"));
    
            LocalDate previousMonthStart = currentMonthStart.minusMonths(1);
            String previousMonth = previousMonthStart.format(DateTimeFormatter.ofPattern("yyyyMM"));

        
            // LocalDate twoMonthsAgoStart = previousMonthStart.minusMonths(1);
            // String twoMonthsAgo = twoMonthsAgoStart.format(DateTimeFormatter.ofPattern("yyyyMM"));

            int previousMonthAmount = cardHistoryService.getMonthlyTotalAmount(userNum, previousMonth);
            // int twoMonthsAgoAmount = cardHistoryService.getMonthlyTotalAmount(userNum, twoMonthsAgo);

            System.out.println("저번 달: " + currentMonthAmount);
            System.out.println("저저번 달: " + previousMonthAmount);
            // System.out.println("저저번 달: " + twoMonthsAgoAmount);

            // 절약률 계산
            double savingsRate = 0;
            if (previousMonthAmount != 0) { 
        savingsRate = ((double)(previousMonthAmount - currentMonthAmount) / previousMonthAmount) * 100;
        } else {
        savingsRate = 0; // 이전 달 사용 금액이 0이면 절약률을 0으로 설정
        }

            System.out.println("절약률 : " + savingsRate);

            // 뱃지 지급 정책
            int badgeCount = (int) (savingsRate * 10); // 절약률 * 10을 뱃지 개수로 설정
            System.out.println("뱃지 개수: " + badgeCount);

            // 뱃지 지급
            String badgeDate = yearMonth;  // "202501" 형식
            badgeService.save(userNum, badgeCount, badgeDate,currentMonthAmount,previousMonthAmount );

            // DTO에 설정
            BadgeDTO dto = new BadgeDTO();
            dto.setSavingRate(savingsRate); // 절약률 추가
            dto.setBadge(badgeCount); // 뱃지 개수 추가
            dto.setCurrentMonthAmount(currentMonthAmount);
            dto.setPreviousMonthAmount(previousMonthAmount);


            return ResponseEntity.ok(new ApiResponse<>(200, "월별 금액 조회 성공", dto));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse<>(500, "월별 금액 조회 실패: " + e.getMessage(), null));
        }
    }

    // 유저의 랭킹 데이터 가져오기
    @GetMapping("/userList")
    public ResponseEntity<ApiResponse<RankingDTO>> getUserRanking(@RequestParam("userNum") int userNum) {
        try {
            RankingDTO result = badgeService.getUserRanking(userNum);
            if (result == null) {
                return ResponseEntity.noContent().build();
            } else {
                return ResponseEntity.ok(new ApiResponse<>(200, "로그인한 유저 조회 성공", result));
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse<>(500, "랭킹정보 불러오는 중 오류 발생", null));
        }
    }

    // 오늘 날짜에 해당하는 배지 데이터 가져오기
    @GetMapping("/list")
    public ResponseEntity<ApiResponse<List<RankingDTO>>> getBadges() {
        try {
            List<RankingDTO> result = badgeService.getBadgesForPreviousMonth();
            if (result.isEmpty()) {
                return ResponseEntity.noContent().build();
            } else {
                return ResponseEntity.ok(new ApiResponse<>(200, "랭킹정보 조회 성공", result));
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse<>(500, "랭킹정보 불러오는 중 오류 발생", null));
        }
    }
}
