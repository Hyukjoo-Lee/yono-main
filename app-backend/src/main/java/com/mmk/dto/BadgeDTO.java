package com.mmk.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class BadgeDTO {
  
  private int badgeNum;
  private String badgeDate;
  private int badge;
  
  private CardHistoryDTO cardHistory;

  private int userCardId; //카드아이디
}
