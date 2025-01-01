package com.mmk.service;

import java.util.List;

import com.mmk.dto.DailyStatisticsDTO;

public interface DailyStatisticsService {

    List<DailyStatisticsDTO> getDailyStatistics();
}
