package com.mmk.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;


import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mmk.dto.RankingDTO;
import com.mmk.service.RankingService;

import java.util.List;

@RestController
@RequestMapping("/user/ranking")
public class RankingController {

    @Autowired
    private RankingService rankingService;

    // 오늘 날짜에 해당하는 배지 데이터 가져오기
    @GetMapping("/list")
    public List<RankingDTO> getBadges() {
        return rankingService.getBadgesForPreviousMonth();
    }
}
