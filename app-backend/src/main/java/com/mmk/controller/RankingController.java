package com.mmk.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mmk.dto.RankingDTO;
import com.mmk.service.RankingService;

import java.util.List;

@RestController
@RequestMapping("/user")
public class RankingController {

    @Autowired
    private RankingService rankingService;

    @GetMapping("/ranking")
    public List<RankingDTO> getRanking() {
        return rankingService.getAllRankings();
    }
}