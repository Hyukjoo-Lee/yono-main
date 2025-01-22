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
                    dto.setRankingNum(entity.getRankingNum());
                    dto.setBadgeNum(entity.getBadgeEntity().getBadgeNum());
                    dto.setBadgeDate(entity.getBadgeEntity().getBadgeDate());
                    dto.setBadge(entity.getBadgeEntity().getBadge());
                    dto.setUserNum(entity.getBadgeEntity().getUserEntity().getUserNum());
                    dto.setName(entity.getBadgeEntity().getUserEntity().getName());
                    dto.setUserId(entity.getBadgeEntity().getUserEntity().getUserId());
                    dto.setProfile(entity.getBadgeEntity().getUserEntity().getProfile());
                    dto.setRankingPosition(entity.getRankingPosition());
                    return dto;
                })
                .collect(Collectors.toList());
    }
}
