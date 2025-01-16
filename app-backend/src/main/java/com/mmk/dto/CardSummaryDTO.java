package com.mmk.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CardSummaryDTO {
    private final String month;
    private final String storeType;
    private final int usedAmount;
}
