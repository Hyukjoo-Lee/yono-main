package com.mmk.service;

import java.util.List;

import com.mmk.dto.RankingDTO;

public interface RankingService {
    List<RankingDTO> getBadgesForPreviousMonth();
}