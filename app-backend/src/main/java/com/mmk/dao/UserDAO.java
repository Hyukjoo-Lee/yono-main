package com.mmk.dao;

import com.mmk.vo.UserInfoVO;

public interface UserDAO {

    /**
     * 유저 정보 삽입
     * 
     * @param uv 저장할 유저 객체
     */
    void createUser(UserInfoVO uv);

    /**
     * 아이디 정보 중복 확인
     * 
     * @param userId
     * @return 중복 여부 (true, false)
     */
    boolean existsByUserId(String userId);

    /**
     * 이메일 정보 중복 확인
     * 
     * @param email
     * @return 중복 여부 (true, false)
     */
    boolean existsByEmail(String email);

    /**
     * 유저 정보 수정
     * 
     * @param uv 수정할 유저 객체
     */
    void updateUser(UserInfoVO uv);

    /**
     * 특정 유저 삭제
     * 
     * @param userId 삭제할 유저의 ID
     */
    void deleteUser(int id);
}