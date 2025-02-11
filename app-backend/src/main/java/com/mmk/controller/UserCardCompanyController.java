package com.mmk.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mmk.common.ApiResponse;
import com.mmk.dto.UserCardCompanyDTO;
import com.mmk.service.UserCardCompanyService;

@RestController
@RequestMapping("/cardCompany")
public class UserCardCompanyController {
    @Autowired
    private UserCardCompanyService userCardCompanyService;

    /**
     * 카드사 등록
     * 사용자의 카드사 등록 폼의 데이터를 기반으로 Codef 로 connectedId 를 발급받음
     * 사용자의 카드사 등록 폼의 데이터와 connectedId 를 함께 DB 에 저장함
     * 
     * @param userCardCompanyDTO 사용자의 카드사 등록 폼 (connectedId 는 초기값 "")
     * @return ResponseEntity<ApiResponse<UserCardCompanyDTO>>
     *         userCardCompanyDTO 가 null 일 때 -> 이미 등록된 카드사 (status: 401)
     *         userCardCompanyDTO 의 connectedId 가 "error" 로 시작할 때 -> error 메시지 반환
     *         (status: 401)
     *         이 외의 값일 때 저장하는 DTO 를 반환 (status: 200)
     */
    @PostMapping("/register")
    public ResponseEntity<ApiResponse<UserCardCompanyDTO>> registerCardCompany(
            @RequestBody UserCardCompanyDTO userCardCompanyDTO) {

        UserCardCompanyDTO ccd = userCardCompanyService.registerCardCompany(userCardCompanyDTO);

        if (ccd == null) {
            ApiResponse<UserCardCompanyDTO> response = new ApiResponse<>(409, "이미 등록한 카드사입니다", null);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        } else if (ccd.getConnectedId().startsWith("error")) {
            ApiResponse<UserCardCompanyDTO> response = new ApiResponse<>(401, ccd.getConnectedId().replace("error", ""),
                    null);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        } else {
            ApiResponse<UserCardCompanyDTO> response = new ApiResponse<>(200, "카드사 등록 성공", ccd);
            return ResponseEntity.ok(response);
        }
    }

}
