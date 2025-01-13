package com.mmk.dto;

import java.sql.Timestamp;

import com.mmk.entity.CardEntity;
import com.mmk.entity.UserEntity;

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

    private int cardId;
    private int userNum;

    private Timestamp createdAt;
    private Timestamp updatedAt;

    private UserEntity userEntity;
    private CardEntity cardEntity;
}
