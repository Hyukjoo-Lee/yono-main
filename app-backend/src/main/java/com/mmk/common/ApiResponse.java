package com.mmk.common;

import lombok.Getter;
import lombok.Setter;

/**
 * 클라이언트 API 요청시 성공, 에러 메세지를 담아 반환하는 객체
 */
@Getter
@Setter
public class ApiResponse<T> {

    private int status;
    private String message;
    private T data;

    public ApiResponse(int status, String message, T data) {
        this.status = status;
        this.message = message;
        this.data = data;
    }
}