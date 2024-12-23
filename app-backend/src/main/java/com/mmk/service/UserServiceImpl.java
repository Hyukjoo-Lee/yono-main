package com.mmk.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mmk.dao.UserDAO;
import com.mmk.dao.UserRepository;
import com.mmk.vo.UserInfoVO;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    public UserDAO userDAO;

    public UserInfoVO createUser(UserInfoVO userVO) {
        if (userVO.getUserId() == null || userVO.getPassword() == null) {
            throw new IllegalArgumentException("입력값이 유효하지 않습니다.");
        }
        if (userRepository.existsByUserId(userVO.getUserId())) {
            throw new IllegalArgumentException("이미 존재하는 아이디입니다.");
        }
        return userRepository.save(userVO);
    }

}
