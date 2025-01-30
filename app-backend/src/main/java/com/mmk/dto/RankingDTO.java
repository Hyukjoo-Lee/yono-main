package com.mmk.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class RankingDTO {
    private int badgeNum; // 뱃지 넘버
    private String badgeDate; // 날짜
    private int badge; // 뱃지 갯수
    private int ranking; // 순위
    private int previousMonthAmount; //지난 달
    private int twoMonthsAgoAmount; //저저번  달

    private int userNum; // 유저넘버
    private String name; // 유저이름
    private String userId; // 유저아이디
    private String profile; // 프로필사진
    
}
