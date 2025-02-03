package com.mmk.service;

import java.util.List;

import com.mmk.dto.RankingDTO;

public interface RankingService {
    RankingDTO getUserRanking(int userNum);
    List<RankingDTO> getBadgesForPreviousMonth();
}