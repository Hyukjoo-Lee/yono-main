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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mmk.common.ApiResponse;
import com.mmk.dto.UserCardDTO;
import com.mmk.service.UserCardService;

@RestController
@RequestMapping("/card")
public class UserCardController {

    @Autowired
    private UserCardService userCardService;

    // 특정 사용자의 보유 카드 조회
    @GetMapping("/user/{userNum}")
    public ResponseEntity<ApiResponse<List<UserCardDTO>>> getAllCardsByUserNum(@PathVariable int userNum) {
        List<UserCardDTO> userCards = userCardService.getAllCardsByUserNum(userNum);
        if (userCards.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse<>(404, "해당 사용자가 보유한 카드가 없습니다.", null));
        }
        return ResponseEntity.ok(new ApiResponse<>(200, "사용자 보유 카드조회 성공", userCards));
    }

    // 특정 사용자의 보유 카드 조회 (마스터 카드 정보, 혜택 포함)
    @GetMapping("/user/{userNum}/details")
    public ResponseEntity<ApiResponse<List<UserCardDTO>>> getAllCardsInfoByUserNum(@PathVariable int userNum) {
        List<UserCardDTO> userCards = userCardService.getAllCardsInfoByUserNum(userNum);
        if (userCards.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT)
                    .body(new ApiResponse<>(204, "해당 사용자가 보유한 카드가 없습니다.", null));
        }
        return ResponseEntity.ok(new ApiResponse<>(200, "사용자 보유 카드조회 성공", userCards));
    }

    /**
     * 사용자 카드 등록
     * 등록된 카드사에 한하여 카드 등록, 실제 카드가 아닐 시엔 카드 등록 불가
     * 
     * @param userCardDTO 사용자의 카드 등록 폼
     * @param organization 기관 코드
     * @param cardTitle 카드 이름
     * @return ResponseEntity<ApiResponse<UserCardDTO>>
     * UserCardDTO 가 null 일 때 -> 등록되어 있지 않은 카드사 (status: 404)
     * 이 외의 값일 때 저장하는 DTO 를 반환 (status: 200)
     */
    @PostMapping("/register")
    public ResponseEntity<ApiResponse<UserCardDTO>> registerUserCard(@RequestBody UserCardDTO userCardDTO,
            @RequestParam String organization, @RequestParam String cardTitle) {
        try {
            UserCardDTO savedCard = userCardService.registerCard(userCardDTO, organization, cardTitle);
            if (savedCard == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new ApiResponse<>(404, "등록되어 있지 않은 카드사입니다.", null));
            } else {
                ApiResponse<UserCardDTO> response = new ApiResponse<>(200, "카드등록 성공", savedCard);
                return ResponseEntity.status(HttpStatus.CREATED).body(response);
            }
        } catch (Exception e) {
            ApiResponse<UserCardDTO> response = new ApiResponse<>(201, e.getMessage(), null);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        }
    }

    /**
     * 대표카드 설정
     * 사용자가 등록한 카드 중 대표카드를 지정
     * 
     * @param userCardId 사용자가 선택한 카드의 userCardId (UserCard 테이블의 PK)
     * @param userNum 사용자 고유 번호 (UserInfo 테이블의 PK)
     * @return ResponseEntity<ApiResponse<UserCardDTO>>
     * 대표카드로 등록한 카드의 정보를 담은 DTO 반환
     */
    @GetMapping("/setPrimaryCard")
    public ResponseEntity<ApiResponse<UserCardDTO>> setPrimaryCard(@RequestParam("userCardId") int userCardId,
            @RequestParam("userNum") int userNum) {

        try {
            UserCardDTO userCardDTO = userCardService.setPrimaryCard(userCardId, userNum);
            ApiResponse<UserCardDTO> response = new ApiResponse<>(200, "대표카드 등록성공", userCardDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse<>(404, "대표카드 등록실패.", null));
        }
    }

    /**
     * 로그인 유저의 대표카드의 카드 조회
     * 
     * @param userNum 사용자 고유 번호 (UserInfo 테이블의 PK)
     * @return ResponseEntity<ApiResponse<UserCardDTO>>
     * 대표카드의 정보를 담은 DTO 반환
     * 지정된 대표카드가 없을 시 noContent 반환 (status:204, data: null)
     */
    @GetMapping("/primaryCard")
    public ResponseEntity<ApiResponse<UserCardDTO>> getPrimaryCard(@RequestParam("userNum") int userNum) {
        try {
            UserCardDTO userCardDTO = userCardService.findPrimaryCardByUserNum(userNum);
            if (userCardDTO != null) {
                return ResponseEntity.ok(new ApiResponse<>(200, "대표카드의 카드 정보 조회 성공", userCardDTO));
            } else {
                return ResponseEntity.noContent().build();
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse<>(500, "대표카드 조회 중 오류 발생", null));
        }
    }

}
