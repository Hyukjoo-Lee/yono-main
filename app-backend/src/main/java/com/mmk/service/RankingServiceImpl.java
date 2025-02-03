package com.mmk.service;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mmk.dao.RankingDAO;
import com.mmk.dto.RankingDTO;
import com.mmk.entity.BadgeEntity;

@Service
public class RankingServiceImpl implements RankingService {

    @Autowired
    private RankingDAO rankingDao;

    @Override
    public RankingDTO getUserRanking(int userNum) {
        // 현재 날짜 기준으로 이전 달 계산
        String previousMonth = getPreviousMonth();

        // BadgeDAO를 통해 이전 달 배지 데이터 조회
        BadgeEntity badgeEntity = rankingDao.getUserRanking(previousMonth, userNum);

        // BadgeEntity -> RankingDTO 변환
        return convertToDTO(badgeEntity);
    }

    @Override
    public List<RankingDTO> getBadgesForPreviousMonth() {
        // 현재 날짜 기준으로 이전 달 계산
        String previousMonth = getPreviousMonth();

        // BadgeDAO를 통해 이전 달 배지 데이터 조회
        List<BadgeEntity> badgeEntities = rankingDao.getBadgesForPreviousMonth(previousMonth);

        // BadgeEntity -> RankingDTO 변환 후 정렬 및 상위 100개 제한
        List<RankingDTO> list = badgeEntities.stream()
            .map(this::convertToDTO)
            .sorted((a, b) -> {
                int rankCompare = Integer.compare(a.getRanking(), b.getRanking());
                if (rankCompare == 0) {
                    return Double.compare(b.getCurrentMonthAmount(), a.getCurrentMonthAmount());
                }
                return rankCompare;
            })
            .limit(100)
            .collect(Collectors.toList());
        return list;
    }

    // 이전 달을 계산하는 메서드 (예: 2025년 1월 -> 2024년 12월)
    private String getPreviousMonth() {
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.MONTH, -1); // 한 달을 빼기
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMM");
        return sdf.format(calendar.getTime());
    }

    // Entity를 DTO로 변환하는 메서드
    private RankingDTO convertToDTO(BadgeEntity badgeEntity) {
        if (badgeEntity == null) return null; // null 체크 추가
        RankingDTO rankingDTO = new RankingDTO();
        rankingDTO.setBadgeNum(badgeEntity.getBadgeNum());
        rankingDTO.setBadgeDate(badgeEntity.getBadgeDate());
        rankingDTO.setBadge(badgeEntity.getBadge());
        rankingDTO.setUserNum(badgeEntity.getUserEntity().getUserNum());
        rankingDTO.setName(badgeEntity.getUserEntity().getName());
        rankingDTO.setUserId(badgeEntity.getUserEntity().getUserId());
        rankingDTO.setProfile(badgeEntity.getUserEntity().getProfile());
        rankingDTO.setRanking(badgeEntity.getRanking());
        rankingDTO.setCurrentMonthAmount(badgeEntity.getCurrentMonthAmount());
        rankingDTO.setPreviousMonthAmount(badgeEntity.getPreviousMonthAmount());
        return rankingDTO;
    }

}
