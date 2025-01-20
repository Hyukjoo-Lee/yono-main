package com.mmk.dto;

import java.sql.Timestamp;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class DailyStatisticsDTO {
    private int dailyId;

    private String userId;

    private String dailyDate;
    private int dailyTarget;

    private String cardImage;
    private String cardName;
    private String store;
    private String category;
    private int amount;

    private Timestamp createdAt;
}