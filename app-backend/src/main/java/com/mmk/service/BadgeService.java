package com.mmk.service;

import java.util.List;

import com.mmk.dto.CardHistoryDTO;

public interface BadgeService {

  List<CardHistoryDTO> uploadOneMonthCardHistory(int userNum);
  
}
