package com.mmk.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class CardDTO {
    private int cardNum;

    private int userNum;

    @JsonProperty("resUsedDate")
    private String usedDate;

    @JsonProperty("resUsedTime")
    private String usedTime;

    @JsonProperty("resCardName")
    private String cardName;

    @JsonProperty("resMemberStoreName")
    private String storeName;

    @JsonProperty("resUsedAmount")
    private String usedAmount;

    @JsonProperty("resPaymentType")
    private String paymentType; // 결제 방법 1: 일시불, 2: 할부, 3: 그 외

    @JsonProperty("resMemberStoreType")
    private String storeType; // 가맹점 업종

}
