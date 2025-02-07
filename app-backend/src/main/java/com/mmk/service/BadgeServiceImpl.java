package com.mmk.service;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mmk.dao.BadgeDAO;
import com.mmk.dto.BadgeDTO;
import com.mmk.dto.CardHistoryDTO;
import com.mmk.dto.RankingDTO;
import com.mmk.entity.BadgeEntity;

@Service
public class BadgeServiceImpl implements BadgeService {

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

        if (badgeEntity == null) {
            return null; // null 반환하여 컨트롤러에서 204 응답 처리
        }

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

        if (badgeEntities.isEmpty()) {
            return Collections.emptyList(); // 빈 리스트 반환
        }

        return badgeEntities.stream()
                .map(this::convertToDTO)
                .sorted((a, b) -> {
                    int rankCompare = Integer.compare(b.getBadge(), a.getBadge());
                    if (rankCompare == 0) {
                        return Double.compare(b.getCurrentMonthAmount(), a.getCurrentMonthAmount());
                    }
                    return rankCompare;
                })
                .limit(100)
                .collect(Collectors.toList());
    }

    private String getPreviousMonth() {
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.MONTH, -1); // 한 달을 빼기
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMM");
        return sdf.format(calendar.getTime());
    }

    // Entity를 DTO로 변환하는 메서드
    private RankingDTO convertToDTO(BadgeEntity badgeEntity) {
        if (badgeEntity == null) {
            return new RankingDTO(); // null 체크 추가
        }

        RankingDTO rankingDTO = new RankingDTO();
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

    @Transactional
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
            System.out.println("금액: " + previousMonthTotalAmount);

            double savingsRate = (previousMonthTotalAmount != 0)
                    ? ((double) (previousMonthTotalAmount - currentMonthTotalAmount) / previousMonthTotalAmount) * 100
                    : 0;

            int badgeCount = (int) (savingsRate * 100); // 절약률 * 100을 뱃지 개수로 설정
            // int ranking = calculateUserRank(userNum); // 랭킹 계산

            String badgeDate = yearMonth;

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

            return null;
        } catch (Exception e) {
            throw new RuntimeException("월별 금액 조회 실패: " + e.getMessage());
        }
    }

    @Override
    public BadgeDTO findByUserNum(int userNum) {
        BadgeEntity badgeEntity = badgeDAO.findByUserNum(userNum);

        if (badgeEntity == null) {
            return null;
        }
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
        if (entity == null) {
            return new BadgeDTO();
        }

        BadgeDTO dto = new BadgeDTO();
        dto.setBadge(entity.getBadge());
        dto.setBadgeDate(entity.getBadgeDate());
        dto.setBadgeNum(entity.getBadgeNum());
        dto.setCurrentMonthAmount(entity.getCurrentMonthAmount());
        dto.setPreviousMonthAmount(entity.getPreviousMonthAmount());
        dto.setRanking(entity.getRanking());
        dto.setUserNum(entity.getUserEntity().getUserNum());

        if (entity.getUserEntity() != null) {
            dto.setUserNum((entity.getUserEntity().getUserNum()));
        } else {
            dto.setUserNum(0);
        }

        return dto;
    }

    @Scheduled(cron = "0 01 00 01 * ?") // 초 분 시간 일 월 요일 => 00 01 00 01 *
    public void scheduledUpdateBadges() {
        String previousYearMonth = YearMonth.now().minusMonths(1).format((DateTimeFormatter.ofPattern("yyyyMM")));
        System.out.println("배지 자동 정산 시작 :" + previousYearMonth);
        try {
            updateBadge(previousYearMonth);
            System.out.println("배지 자동 정산 완료 : " + previousYearMonth);
        } catch (Exception e) {
            System.out.println("배지 자동 정산 중 오류 : "
                    + previousYearMonth);
            e.printStackTrace();
        }
    }
}
