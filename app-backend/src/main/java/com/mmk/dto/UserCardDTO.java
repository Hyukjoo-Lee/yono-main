package com.mmk.dto;

import java.sql.Timestamp;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

// 유저 등록한 카드
@Getter
@Setter
@ToString
public class UserCardDTO {
    private int userCardId;
    private String userCardNum;
    private String expiryDate;
    private String userName;

    private String companyId;
    private String companyPwd;
    private String connectedId;
    private int primaryCard;

    private int cardId;
    private int userNum;

    private Timestamp createdAt;
    private Timestamp updatedAt;
}
