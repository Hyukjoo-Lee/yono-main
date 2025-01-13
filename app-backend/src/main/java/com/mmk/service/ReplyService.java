package com.mmk.service;

import java.util.List;

import com.mmk.dto.ReplyDTO;

public interface ReplyService {

    boolean validate(ReplyDTO comment); 

    void add(ReplyDTO comment);

    List<ReplyDTO> findByPno(int pno);

    
} 