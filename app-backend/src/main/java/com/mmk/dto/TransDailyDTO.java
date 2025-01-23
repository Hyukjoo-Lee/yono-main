package com.mmk.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class TransDailyDTO {
    private int cardNum;

    private int userNum;

    @JsonProperty("resUsedDate")
    private String usedDate;

    @JsonProperty("resMemberStoreName")
    private String storeName;

    @JsonProperty("resUsedAmount")
    private String usedAmount;

    @JsonProperty("resMemberStoreType")
    private String storeType; // 가맹점 업종

}
