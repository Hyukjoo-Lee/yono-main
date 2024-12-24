package com.mmk.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mmk.vo.UserInfoVO;

public interface UserRepository extends JpaRepository<UserInfoVO, Integer> {
    UserInfoVO findUserVOByUserId(String userId);

    UserInfoVO findUserVOByEmail(String email);

    boolean existsByUserId(String userId);

    boolean existsByEmail(String username);
}
