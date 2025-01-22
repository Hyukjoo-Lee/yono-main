package com.mmk.dto;

import java.sql.Timestamp;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class CardBenefitDTO {
    private int benefitId;

    private String benefitTitle;
    private String benefitValue;
    private String benefitType;

    private Timestamp createdAt;
    private Timestamp updatedAt;

    private String cardTitle;
}
