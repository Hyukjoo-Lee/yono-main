package com.mmk.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mmk.dao.BadgeDAO;
import com.mmk.dao.UserDAO;
import com.mmk.entity.BadgeEntity;
import com.mmk.entity.UserEntity;

@Service
public class BageServiceImpl implements BadgeService {
    
    @Autowired
    private BadgeDAO badgeDAO;

    @Autowired
    private UserDAO userDAO;

    @Override
    public void save(int userNum, int badgeCount, String badgeDate, int previousMonthAmount, int twoMonthsAgoAmount) {
        // 사용자 정보 조회
        UserEntity userEntity = userDAO.getUserByUserNum(userNum);
        // 뱃지 정보 저장을 위한 엔티티 생성
        BadgeEntity badgeEntity = new BadgeEntity();
        badgeEntity.setBadge(badgeCount);      // 뱃지 개수
        badgeEntity.setBadgeDate(badgeDate);   // 뱃지 발급 날짜 설정
        badgeEntity.setUserEntity(userEntity); // 사용자 설정
        badgeEntity.setPreviousMonthAmount(previousMonthAmount); // 저번 달
        badgeEntity.setTwoMonthsAgoAmount(twoMonthsAgoAmount); // 저저번달

        // 뱃지 정보를 데이터베이스에 저장
        badgeDAO.save(badgeEntity); // BadgeDAO를 통해 저장
    }
}
