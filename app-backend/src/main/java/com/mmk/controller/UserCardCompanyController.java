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

    // 카드사 등록
    @PostMapping("/register")
    public ResponseEntity<ApiResponse<UserCardCompanyDTO>> registerCardCompany(
            @RequestBody UserCardCompanyDTO userCardCompanyDTO) {
        UserCardCompanyDTO ccd = userCardCompanyService.registerCardCompany(userCardCompanyDTO);
        if (ccd == null) {
            ApiResponse<UserCardCompanyDTO> response = new ApiResponse<>(401, "이미 등록한 카드사입니다", null);
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
