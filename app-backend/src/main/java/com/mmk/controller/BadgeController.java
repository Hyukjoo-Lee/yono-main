package com.mmk.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/badge")
public class BadgeController {
  
  // @Autowired
  // BadgeService badgeService;

  // @GetMapping("comparison")
  // public ResponseEntity<List<CardHistoryDTO>> uploadOneMonthCardHistory(@RequestParam("userNum") int userNum) {
  //   List<CardHistoryDTO> result = badgeService.uploadOneMonthCardHistory(userNum);
  //   return ResponseEntity.ok(result);
  // }
}
