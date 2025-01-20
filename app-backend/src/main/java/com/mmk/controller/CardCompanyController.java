package com.mmk.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mmk.common.ApiResponse;
import com.mmk.dto.CardCompanyDTO;
import com.mmk.service.CardCompanyService;

@RestController
@RequestMapping("/cardCompany")
public class CardCompanyController {
    
    @Autowired
    private CardCompanyService cardCompanyService;

    // 카드사 등록
    @PostMapping("/register")
    public ResponseEntity<ApiResponse<CardCompanyDTO>> registerCardCompany (
        @RequestBody CardCompanyDTO cardCompanyDTO) {
            CardCompanyDTO ccd = cardCompanyService.registerCardCompany(cardCompanyDTO);
            if (ccd == null) {
                ApiResponse<CardCompanyDTO> response = new ApiResponse<>(401, "이미 등록한 카드사입니다", null);
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
            } else {
                ApiResponse<CardCompanyDTO> response = new ApiResponse<>(200, "카드사 등록 성공", ccd);
                return ResponseEntity.ok(response);
            }
        }

}
