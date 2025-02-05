package com.mmk.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mmk.common.ApiResponse;
import com.mmk.dto.BadgeDTO;
import com.mmk.dto.RankingDTO;
import com.mmk.service.BadgeService;

@RestController
@RequestMapping("/badge")
public class BadgeController {

    @Autowired
    private BadgeService badgeService;

    @GetMapping("/Comparison")
    public ResponseEntity<ApiResponse<BadgeDTO>> getMonthlyComparison(
            @RequestParam("userNum") int userNum,
            @RequestParam("yearMonth") String yearMonth) {
        // try {
        //     BadgeDTO result = badgeService.updateBadgeByUserNum(userNum, yearMonth);
        //     return ResponseEntity.ok(new ApiResponse<>(200, "월별 금액 조회 성공", result));
        // } catch (Exception e) {
        //     return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
        //             .body(new ApiResponse<>(500, "월별 금액 조회 실패: " + e.getMessage(), null));
        // }

        // 저장한 DB 에서 유저넘버에 맞는 값만 가져오기

        return null;
    }

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

    @PutMapping("/updateDB")
    public ResponseEntity<ApiResponse<Boolean>> updateDB(@RequestParam("yearMonth") String yearMonth) {
        try {
            badgeService.updateBadge(yearMonth);
            return ResponseEntity.ok(new ApiResponse<>(200, "랭킹정보 업데이트 성공", true));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse<>(500, "랭킹정보 업데이트 중 오류 발생", false));
        }
    }
}
