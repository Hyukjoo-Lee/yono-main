package com.mmk.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.codef.api.EasyCodef;
import io.codef.api.EasyCodefServiceType;

@RestController
@RequestMapping("/codef")
public class CodefController {
    // codef 회원가입후 DEMO 버전 신청
    // 마이페이지 - 키 관리에서 clindeId, clientSecret 확인
    @Value("${CODEF_CLIENT_ID}")
    private String clientId;

    @Value("${CODEF_SECRET}")
    private String clientSecret;

    private EasyCodef codef;
    
    @GetMapping("/getToken")
    public void getToken() {
        // CODEF 라이브러리에서 제공하는 EasyCodef 객체 생성
        codef = new EasyCodef();

        // 생성한 객체에 setClientInfoForDemo() 메서드로 clientId, clientSecret 입력
        codef.setClientInfoForDemo(clientId, clientSecret);

        // requestToken() 메서드로 Access Token 발급
        // requestToken() 의 파라미터는 사용하고 있는 버전 (샌드박스, 데모, 정식)
        // EasyCodefServiceType 은 각 버전 정보를 담고 있음
        try {
            String access_token = codef.requestToken(EasyCodefServiceType.DEMO);
            System.out.println("Access Token: " + access_token);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }



}
