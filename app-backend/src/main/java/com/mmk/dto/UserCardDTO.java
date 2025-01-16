package com.mmk.dto;

import java.sql.Timestamp;

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
    private String userName;

    private String companyId;
    private String companyPwd;
    private String connectedId;
    private int primaryCard;

    // connectedId, 카드 아이디, 비밀번호 (api 호출을 위한 필드)
    private int cardId;
    private int userNum;

    private Timestamp createdAt;
    private Timestamp updatedAt;
}
