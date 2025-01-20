package com.mmk.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mmk.dao.RankingDAO;
import com.mmk.dto.RankingDTO;

@Service
public class RankingServiceImpl implements RankingService {

    @Autowired
    private RankingDAO rankingDao;

    @Override
    public List<RankingDTO> getAllRankings() {
        return rankingDao.getAllRankings().stream()
                .map(entity -> {
                    RankingDTO dto = new RankingDTO();
                    dto.setRankingId(entity.getRankingId());
                    dto.setRankingPosition(entity.getRankingPosition());
                    dto.setUserName(entity.getUserName());
                    dto.setUserId(entity.getUserId());
                    dto.setTotalBadges(entity.getTotalBadges());
                    dto.setRankingMonth(entity.getRankingMonth());
                    dto.setRankingImgUrl(entity.getRankingImgUrl());
                    dto.setCreatedAt(entity.getCreatedAt());
                    dto.setUpdatedAt(entity.getUpdatedAt());
                    return dto;
                })
                .collect(Collectors.toList());
    }
}
