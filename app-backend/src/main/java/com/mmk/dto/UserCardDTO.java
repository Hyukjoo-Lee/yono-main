package com.mmk.dto;

import java.sql.Timestamp;
import java.util.List;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

// 유저가 보유한 카드
@Getter
@Setter
@ToString
public class UserCardDTO {
    private int userCardId;
    private String userCardNum;
    private String expiryDate;
    private String cardPwd;
    private String cardImg;

    private String primaryCard = "일반카드";

    private int cardCompanyNum;
    private int cardId;
    private int userNum;

    private String cardTitle; // from 카드 테이블
    private List<CardBenefitDTO> cardBenefits; // from 카드 혜택 테이블

    private Timestamp createdAt;
    private Timestamp updatedAt;
}
