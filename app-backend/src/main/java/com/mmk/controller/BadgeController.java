package com.mmk.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mmk.dto.CardHistoryDTO;
import com.mmk.service.BadgeService;

@RestController
@RequestMapping("/badge")
public class BadgeController {
  
  @Autowired
  BadgeService badgeService;

  @GetMapping("comparison")
  public ResponseEntity<List<CardHistoryDTO>> uploadOneMonthCardHistory(@RequestParam("userNum") int userNum) {
    List<CardHistoryDTO> result = badgeService.uploadOneMonthCardHistory(userNum);
    return ResponseEntity.ok(result);
  }
}
