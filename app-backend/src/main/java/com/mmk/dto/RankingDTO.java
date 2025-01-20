package com.mmk.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.sql.Timestamp;

@Getter
@Setter
@ToString
public class RankingDTO {

    private int rankingId;
    private int rankingPosition;

    private String userName;
    private String userId;
    private int totalBadges;

    private String rankingMonth;
    private String rankingImgUrl;

    private Timestamp createdAt;
    private Timestamp updatedAt;
}
