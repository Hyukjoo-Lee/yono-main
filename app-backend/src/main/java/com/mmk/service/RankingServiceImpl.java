package com.mmk.service;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mmk.dao.RankingDAO;
import com.mmk.dto.BadgeDTO;
import com.mmk.entity.BadgeEntity;

@Service
public class RankingServiceImpl implements RankingService {

    @Autowired
    private RankingDAO rankingDao; 

    @Override
    public List<BadgeDTO> getBadgesForPreviousMonth() {
        // 현재 날짜 기준으로 이전 달 계산
        String previousMonth = getPreviousMonth();

        // BadgeDAO를 통해 이전 달 배지 데이터 조회
        List<BadgeEntity> badgeEntities = rankingDao.getBadgesForPreviousMonth(previousMonth);

        // BadgeEntity -> BadgeDTO 변환
        return badgeEntities.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    // 이전 달을 계산하는 메서드 (예: 2025년 1월 -> 2024년 12월)
    private String getPreviousMonth() {
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.MONTH, -1); // 한 달을 빼기
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMM");
        return sdf.format(calendar.getTime());
    }

    // Entity를 DTO로 변환하는 메서드
    private BadgeDTO convertToDTO(BadgeEntity badgeEntity) {
        BadgeDTO badgeDTO = new BadgeDTO();
        badgeDTO.setBadgeNum(badgeEntity.getBadgeNum());
        badgeDTO.setBadgeDate(badgeEntity.getBadgeDate());
        badgeDTO.setBadge(badgeEntity.getBadge());
        badgeDTO.setUserNum(badgeEntity.getUserEntity().getUserNum());
        badgeDTO.setRanking(badgeEntity.getRanking());
        badgeDTO.setPreviousMonthAmount(badgeEntity.getPreviousMonthAmount());
        badgeDTO.setTwoMonthsAgoAmount(badgeEntity.getTwoMonthsAgoAmount());
        return badgeDTO;
    }

}
