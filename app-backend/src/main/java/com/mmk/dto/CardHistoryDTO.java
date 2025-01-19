package com.mmk.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class CardHistoryDTO {
    private String resApprovalNo; // 승인번호

    private String resUsedDate; // 사용 날짜
    private String resUsedTime; // 사용 일시
    private String resMemberStoreName; // 가맹점명
    private String resUsedAmount; // 이용금액
    private String resMemberStoreType; // 가맹점 업종

    private int userCardId;
}
