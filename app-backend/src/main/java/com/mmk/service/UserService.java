package com.mmk.service;

import com.mmk.vo.UserInfoVO;

public interface UserService {
    /**
     * 유저 생성
     * 
     * @param uv 저장할 유저 객체
     * @return
     */
    UserInfoVO createUser(UserInfoVO uv);

}