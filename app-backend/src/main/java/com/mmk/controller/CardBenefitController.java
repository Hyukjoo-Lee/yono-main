package com.mmk.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mmk.common.ApiResponse;
import com.mmk.dto.CardBenefitDTO;
import com.mmk.service.CardBenefitService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/benefit")
public class CardBenefitController {

    @Autowired
    private CardBenefitService cardBenefitService;

    // 특정 카드의 혜택 조회
    @GetMapping("/{cardTitle}")
    public ResponseEntity<ApiResponse<List<CardBenefitDTO>>> getAllCardBenefitsByCardTitle(
            @PathVariable String cardTitle) {
        List<CardBenefitDTO> benefits = cardBenefitService.getAllCardBenefitsByCardTitle(cardTitle);

        if (benefits.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse<>(404, "해당 카드에 대한 혜택이 없습니다.", null));
        }

        return ResponseEntity.ok(new ApiResponse<>(200, "카드 혜택 조회 성공", benefits));
    }

    // 카드 혜택 추가 (한개 또는 다수 등록 가능)
    @PostMapping("/register")
    public ResponseEntity<ApiResponse<List<CardBenefitDTO>>> registerCardBenefits(
            @RequestBody List<CardBenefitDTO> cardBenefitDTOs) {
        List<CardBenefitDTO> savedBenefits = cardBenefitService.registerCardBenefits(cardBenefitDTOs);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ApiResponse<>(201, "카드 혜택 저장 성공", savedBenefits));
    }

}
