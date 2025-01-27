package com.mmk.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mmk.dto.DailyStatisticsDTO;
import com.mmk.service.CardHistoryService;

@RestController
@RequestMapping("/user")
public class DailyStatisticsController {

    @Autowired
    private CardHistoryService cardHistoryService;

    @GetMapping("/daily-statistics")
    public List<DailyStatisticsDTO> getDailyStatistics(@RequestParam("userNum") int userNum) {
        return cardHistoryService.getDailyStatistics(userNum);
    }

    
}
