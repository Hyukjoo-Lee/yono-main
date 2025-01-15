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
    private String businessTypes;

    private Timestamp createdAt;
    private Timestamp updatedAt;

    private int cardId;
}
