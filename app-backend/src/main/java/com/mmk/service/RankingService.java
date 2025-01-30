package com.mmk.service;

import java.util.List;

import com.mmk.dto.BadgeDTO;

public interface RankingService {
    List<BadgeDTO> getBadgesForPreviousMonth();
}