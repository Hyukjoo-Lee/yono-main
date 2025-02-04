package com.mmk.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class DailyStatisticsDTO {
    private String resApprovalNo; // 승인번호

    private String resUsedDate; // 사용 날짜
    private String resMemberStoreName; // 가맹점명
    private String resUsedAmount; // 이용금액
    private String resMemberStoreType; // 가맹점 업종

    private int spendingTarget; // 일일 목표금액(UserEntity)
    private int userCardId;
    private String cardTitle; // 카드 이름 (CardEntity)
    private String cardImg; // 카드 이미지 (UserCardEntity)
    private int userNum; // 유저 넘버버 (UserEntity)
}