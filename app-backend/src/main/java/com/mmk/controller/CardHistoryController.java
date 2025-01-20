package com.mmk.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mmk.service.CardHistoryService;

@RestController
@RequestMapping("/cardHistory")
public class CardHistoryController {

    @Autowired
    CardHistoryService cardHistoryService;
    
    // 카드내역 DB에 갱신
    @GetMapping("/update")
    public void updateCardHistory(@RequestParam("userNum") int userNum) {
        cardHistoryService.updateCardHistory(userNum);
    }
}
