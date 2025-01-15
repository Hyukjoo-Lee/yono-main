package com.mmk.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mmk.common.ApiResponse;
import com.mmk.dto.CardDTO;
import com.mmk.service.CardService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/card")
public class CardController {
    @Autowired
    private CardService cardService;

    // 마스터 카드 전체 조회
    @GetMapping("/all")
    public ResponseEntity<ApiResponse<List<CardDTO>>> getAllCards() {
        List<CardDTO> cardDTOs = cardService.getAllCards();
        if (cardDTOs.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse<>(404, "등록된 마스터 카드가 없습니다.", null));
        }
        return ResponseEntity.ok(new ApiResponse<>(200, "전체 마스터 카드 검색 성공", cardDTOs));
    }

    // 마스터 카드 생성
    @PostMapping("/create")
    public ResponseEntity<ApiResponse<CardDTO>> createCard(@RequestBody CardDTO cardDTO) {
        CardDTO createCard = cardService.createCard(cardDTO);
        ApiResponse<CardDTO> response = new ApiResponse<CardDTO>(201, "마스터 카드 생성 성공", createCard);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // 사용자 카드 및 혜택 정보 저장 (CODEF API 저장 처리)
    @PostMapping("/saveUserCardData")
    public ResponseEntity<ApiResponse<String>> saveUserCardData(
            @RequestBody Map<String, List<Map<String, Object>>> requestBody) {
        List<Map<String, Object>> cardList = requestBody.get("cardList");
        List<Map<String, Object>> performanceList = requestBody.get("performanceList");
        // System.out.println("cardList: " + cardList);
        // System.out.println("performanceList: " + performanceList);
        cardService.saveCardAndBenefitData(cardList, performanceList);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ApiResponse<>(201, "사용자 카드 및 혜택 정보 저장 성공!", "데이터가 성공적으로 저장되었습니다."));
    }

}
