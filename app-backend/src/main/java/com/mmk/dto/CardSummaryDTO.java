package com.mmk.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

// 카드 소비 업종명 요약 정보 (업종유형, 업종 총 소비금액) 를 담는 DTO
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CardSummaryDTO {
    private String storeType;
    private int usedAmount;
}
