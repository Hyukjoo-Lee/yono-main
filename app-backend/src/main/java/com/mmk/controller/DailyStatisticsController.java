package com.mmk.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mmk.dto.DailyStatisticsDTO;
import com.mmk.service.DailyStatisticsService;

@RestController
@RequestMapping("/user")
public class DailyStatisticsController {

    @Autowired
    private DailyStatisticsService dailyStatisticsService;

    @GetMapping("/daily-statistics")
    public List<DailyStatisticsDTO> getDailyStatistics() {
        return dailyStatisticsService.getDailyStatistics();
    }

    
}
