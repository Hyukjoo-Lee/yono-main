package com.mmk.service;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mmk.dao.BadgeDAO;
import com.mmk.dto.BadgeDTO;
import com.mmk.dto.CardHistoryDTO;
import com.mmk.dto.RankingDTO;
import com.mmk.entity.BadgeEntity;

@Service
public class BageServiceImpl implements BadgeService {

    @Autowired
    private BadgeDAO badgeDAO;

    @Autowired
    private CardHistoryService cardHistoryService;

    @Autowired
    private UserService userService;

    @Override
    public void save(BadgeEntity badgeEntity) {
        badgeDAO.save(badgeEntity);
    }

    // 로그인한 유저 랭킹 정보
    @Override
    public RankingDTO getUserRanking(int userNum) {
        // 현재 날짜 기준으로 이전 달 계산
        String previousMonth = getPreviousMonth();

        // BadgeDAO를 통해 이전 달 배지 데이터 조회
        BadgeEntity badgeEntity = badgeDAO.getUserRanking(previousMonth, userNum);
        // 로그인한 유저 랭킹 순위
        int rank = badgeDAO.getRankingByUserNum(userNum);
        RankingDTO rankingDto = convertToDTO(badgeEntity);
        
        rankingDto.setRanking(rank);
         
        return rankingDto;
    }

    // 전달 랭킹 정보
    @Override
    public List<RankingDTO> getBadgesForPreviousMonth() {
        // 현재 날짜 기준으로 이전 달 계산
        String previousMonth = getPreviousMonth();

        // BadgeDAO를 통해 이전 달 배지 데이터 조회
        List<BadgeEntity> badgeEntities = badgeDAO.getBadgesForPreviousMonth(previousMonth);

        // BadgeEntity -> RankingDTO 변환 후 정렬 및 상위 100개 제한
        List<RankingDTO> list = badgeEntities.stream()
                .map(this::convertToDTO)
                .sorted((a, b) -> {
                    int rankCompare = Integer.compare(a.getBadge(), b.getBadge());
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
        if (badgeEntity == null) {
            return null; // null 체크 추가

                }RankingDTO rankingDTO = new RankingDTO();
        rankingDTO.setBadgeNum(badgeEntity.getBadgeNum());
        rankingDTO.setBadgeDate(badgeEntity.getBadgeDate());
        rankingDTO.setBadge(badgeEntity.getBadge());
        rankingDTO.setUserNum(badgeEntity.getUserEntity().getUserNum());
        rankingDTO.setName(badgeEntity.getUserEntity().getName());
        rankingDTO.setUserId(badgeEntity.getUserEntity().getUserId());
        rankingDTO.setProfile(badgeEntity.getUserEntity().getProfile());
        rankingDTO.setCurrentMonthAmount(badgeEntity.getCurrentMonthAmount());
        rankingDTO.setPreviousMonthAmount(badgeEntity.getPreviousMonthAmount());
        rankingDTO.setRanking(badgeEntity.getRanking());
        
        return rankingDTO;
    }

    @Override
    public int calculateUserRank(int userNum) {
        String previousMonth = getPreviousMonth();
        List<BadgeEntity> badgeEntities = badgeDAO.getBadgesForPreviousMonth(previousMonth);

        badgeEntities.sort((a, b) -> Integer.compare(b.getBadge(), a.getBadge()));

        for (int i = 0; i < badgeEntities.size(); i++) {
            if (badgeEntities.get(i).getUserEntity().getUserNum() == userNum) {
                return i + 1;
            }
        }

        return 0; // 유저가 목록에 없으면 0등
    }

    @Override
    public boolean existsBadgeForUser(int userNum) {
        return badgeDAO.existsByUserNum(userNum);
    }

    private int getTotalAmount(List<CardHistoryDTO> historyList) {
        int totalAmount = historyList.stream()
                .mapToInt(history -> Integer.parseInt(history.getResUsedAmount()))
                .sum();
        return totalAmount;
    }

    @Override
    public BadgeDTO updateBadgeByUserNum(int userNum, String yearMonth) {
        try {
            List<CardHistoryDTO> currentMonthList = cardHistoryService.getMonthlyList(userNum, yearMonth);
            int currentMonthTotalAmount = getTotalAmount(currentMonthList);

            LocalDate currentMonthStart = LocalDate.parse(yearMonth + "01", DateTimeFormatter.ofPattern("yyyyMMdd"));
            LocalDate previousMonthStart = currentMonthStart.minusMonths(1);
            String previousMonth = previousMonthStart.format(DateTimeFormatter.ofPattern("yyyyMM"));
            System.out.println("previousMonth: " + previousMonth);

            List<CardHistoryDTO> previousMonthList = cardHistoryService.getMonthlyList(userNum, previousMonth);
            int previousMonthTotalAmount = getTotalAmount(previousMonthList);

            double savingsRate = (previousMonthTotalAmount != 0)
                    ? ((double) (previousMonthTotalAmount - currentMonthTotalAmount) / previousMonthTotalAmount) * 100
                    : 0;

            int badgeCount = (int) (savingsRate * 100); // 절약률 * 100을 뱃지 개수로 설정
            // int ranking = calculateUserRank(userNum); // 랭킹 계산

            String badgeDate = yearMonth;

            //         if (!existsBadgeForUserAndDate(userNum, badgeDate)) {
            //     // 데이터가 없으면 새로 저장
            //     save(userNum, badgeCount, badgeDate, currentMonthAmount, previousMonthAmount, ranking);
            // } else {
            //     // 데이터가 있으면 등수 업데이트
            //     BadgeEntity existingBadge = badgeDAO.getUserRanking(badgeDate, userNum);
            //     if (existingBadge != null) {
            //         existingBadge.setRanking(ranking);
            //         existingBadge.setBadge(badgeCount); // 절약률이 바뀔 수도 있으니 뱃지도 업데이트
            //         existingBadge.setCurrentMonthAmount(currentMonthAmount);
            //         existingBadge.setPreviousMonthAmount(previousMonthAmount);
            //         badgeDAO.save(existingBadge);
            //     }
            // }
            BadgeEntity badgeEntity = new BadgeEntity();
            badgeEntity.setBadge(badgeCount);
            badgeEntity.setBadgeDate(badgeDate);
            badgeEntity.setCurrentMonthAmount(currentMonthTotalAmount);
            badgeEntity.setPreviousMonthAmount(previousMonthTotalAmount);
            badgeEntity.setUserEntity(userService.findEntityByUserNum(userNum));
            badgeEntity.setRanking(0);

            if (existsBadgeForUser(userNum)) {
                int badgeNum = findByUserNum(userNum).getBadgeNum();
                badgeEntity.setBadgeNum(badgeNum);
            }

            save(badgeEntity);
            // // 배지 존재 여부 확인
            // BadgeEntity badgeEntity = badgeDAO.getUserRanking(badgeDate, userNum);

            // // 데이터가 없으면 새로 저장하고, 있으면 업데이트
            // if (badgeEntity == null) {
            //     // 배지 데이터를 새로 저장
            //     save(userNum, badgeCount, badgeDate, currentMonthAmount, previousMonthAmount, ranking);
            // } else {
            //     // 기존 배지 데이터를 업데이트
            //     badgeEntity.setRanking(ranking);
            //     badgeEntity.setBadge(badgeCount);
            //     badgeEntity.setCurrentMonthAmount(currentMonthAmount);
            //     badgeEntity.setPreviousMonthAmount(previousMonthAmount);
            //     badgeDAO.save(badgeEntity);
            // }
            //     // DTO 생성
            //     BadgeDTO dto = new BadgeDTO();
            //     dto.setSavingRate(savingsRate);
            //     dto.setBadge(badgeCount);
            //     dto.setCurrentMonthAmount(currentMonthAmount);
            //     dto.setPreviousMonthAmount(previousMonthAmount);
            //     dto.setRanking(ranking);
            return null;
        } catch (Exception e) {
            throw new RuntimeException("월별 금액 조회 실패: " + e.getMessage());
        }
    }

    @Override
    public BadgeDTO findByUserNum(int userNum) {
        BadgeEntity badgeEntity = badgeDAO.findByUserNum(userNum);
        int rank = badgeDAO.getRankingByUserNum(userNum);
        BadgeDTO badgeDTO = toDTO(badgeEntity);
        badgeDTO.setRanking(rank);

        return badgeDTO;
    }

    @Override
    public void updateBadge(String yearMonth) {
        ArrayList<Integer> userNumList = userService.findAllUserNum();

        for (int userNum : userNumList) {
            updateBadgeByUserNum(userNum, yearMonth);
        }
    }

    private BadgeDTO toDTO(BadgeEntity entity) {
        BadgeDTO dto = new BadgeDTO();
        dto.setBadge(entity.getBadge());
        dto.setBadgeDate(entity.getBadgeDate());
        dto.setBadgeNum(entity.getBadgeNum());
        dto.setCurrentMonthAmount(entity.getCurrentMonthAmount());
        dto.setPreviousMonthAmount(entity.getPreviousMonthAmount());
        dto.setRanking(entity.getRanking());
        dto.setUserNum(entity.getUserEntity().getUserNum());

        return dto;
    }
}
