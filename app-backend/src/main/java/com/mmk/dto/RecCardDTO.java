package com.mmk.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

// 추천 카드(카드이름, 카드 이미지, 카드 혜택들)를 담는 DTO
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class RecCardDTO {
    private String cardTitle;
    private String cardImgUrl;
    private String cardApplyUrl;
    private List<CardBenefitDTO> benefits;
}