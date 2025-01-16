package com.mmk.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class CardCompanyDTO {
    private int cardCompanyNum;
    
    private int userNum;

    private String organization;

    private String companyId;

    private String companyPwd;
}
