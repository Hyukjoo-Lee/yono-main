package com.mmk.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
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

    @PostMapping("/ranking/update")
    public ResponseEntity<String> updateRankings() {
        rankingService.updateRankings();
        return new ResponseEntity<>("Rankings updated successfully.", HttpStatus.OK);
    }
}
