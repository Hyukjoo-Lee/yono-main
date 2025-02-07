package com.mmk.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.mmk.config.AESUtil;

@Service
public class EncryptionService {

    @Value("${AES.SECRET-KEY}")
    private String secretKey;

    // 키 생성
    public void generateKey() {
        try {
            AESUtil.generateKey();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // 암호화
    public String encryptPassword(String password) throws Exception {
        return AESUtil.encrypt(password, secretKey);
    }

    // 복호화
    public String decryptPassword(String encryptedPassword) throws Exception {
        return AESUtil.decrypt(encryptedPassword, secretKey);
    }
}