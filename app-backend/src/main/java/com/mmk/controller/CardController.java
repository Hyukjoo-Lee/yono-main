package com.mmk.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mmk.common.ApiResponse;
import com.mmk.dto.UserCardCompanyDTO;
import com.mmk.dto.CardDTO;
import com.mmk.dto.RecCardDTO;
import com.mmk.service.CardService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/card")
public class CardController {

    private static final Logger logger = LoggerFactory.getLogger(CardController.class);

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

    // 기관 코드로 카드 조회
    @GetMapping("/{organization}")
    public ResponseEntity<ApiResponse<List<CardDTO>>> getCardsByOrganization(
            @PathVariable String organization) {

        List<CardDTO> cardDTOs = cardService.getAllCardsByOrganizationCode(organization);

        if (cardDTOs.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse<>(404, "해당 기관 코드에 등록된 카드가 없습니다.", null));
        }
        return ResponseEntity.ok(new ApiResponse<>(200, "기관 코드별 카드 검색 성공", cardDTOs));
    }

    // 마스터 카드 생성
    @PostMapping("/create")
    public ResponseEntity<ApiResponse<CardDTO>> createCard(@RequestBody CardDTO cardDTO) {
        CardDTO createCard = cardService.createCard(cardDTO);
        ApiResponse<CardDTO> response = new ApiResponse<CardDTO>(201, "마스터 카드 생성 성공", createCard);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // Codef 카드, 혜택 저장
    @PostMapping("/saveCodefCard")
    public ResponseEntity<ApiResponse<UserCardCompanyDTO>> saveCodefCard(
            @RequestBody UserCardCompanyDTO userCardCompanyDTO) {
        UserCardCompanyDTO savedCard = cardService.saveCodefCard(userCardCompanyDTO);
        ApiResponse<UserCardCompanyDTO> response = new ApiResponse<>(201, "마스터 카드, 혜택 생성 성공", savedCard);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    /**
     * 사용자의 최근 3개월 카드 사용 내역을 분석해서 해당 사용자에게 적합한 카드 5개를 반환
     * 
     * @param userNum 사용자 고유 번호 (UserInfo 테이블의 PK)
     * @return ResponseEntity<ApiResponse<List<CardDTO>>> 추천 카드 리스트
     */
    @GetMapping("/{userNum}/recommendations")
    public ResponseEntity<ApiResponse<List<RecCardDTO>>> getRecommendedCards(@PathVariable int userNum) {
        try {
            List<CardDTO> cardDTOs = cardService.getAllCards();

            if (cardDTOs.isEmpty()) {
                logger.warn("등록된 마스터 카드가 없음");
                return ResponseEntity.status(HttpStatus.NO_CONTENT)
                        .body(new ApiResponse<>(204, "등록된 마스터 카드가 없습니다.", null));
            }

            List<RecCardDTO> recommendedCards = cardService.getRecommendedCards(userNum);

            if (recommendedCards.isEmpty()) {
                logger.warn("사용자 넘버 {} 에 대한 추천 카드 없음", userNum);
                return ResponseEntity.status(HttpStatus.NO_CONTENT)
                        .body(new ApiResponse<>(204, "추천할 카드가 없습니다. 사용 내역이 부족하거나 해당 카드가 없습니다.", null));
            }

            // 응답 데이터 로깅용
            logger.info("추천된 카드 목록 (카드 이름): {}", recommendedCards.stream().map(RecCardDTO::getCardTitle).toList());

            return ResponseEntity.ok(new ApiResponse<>(200, "추천 카드 검색 성공", recommendedCards));
        } catch (Exception e) {
            logger.error("추천 카드 처리 중 오류 발생", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse<>(500, "서버 내부 오류가 발생했습니다.", null));
        }

    }

}
