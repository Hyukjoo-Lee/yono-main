package com.mmk.dto;


import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class BadgeDTO {
    
    private int badgeNum; // 뱃지 번호
    private String badgeDate; // 뱃지 발급 날짜 (예: "202501")
    private int badge; // 뱃지 개수
    private int userNum; // 사용자 번호
    private int ranking; // 순위
    private double  savingRate; //절약률률
    private int currentMonthAmount; //지난 달
    private int previousMonthAmount; //저저번  달
}