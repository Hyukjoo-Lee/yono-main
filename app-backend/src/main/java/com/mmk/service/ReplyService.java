package com.mmk.service;

import java.util.List;

import com.mmk.dto.ReplyDTO;
import com.mmk.entity.ReplyEntity;

public interface ReplyService {

    boolean validate(ReplyDTO comment); 

    void add(ReplyDTO comment);

    List<ReplyDTO> findByPno(int pno);

    void delete(int rno, String loggedInUserId);

    boolean edit(int rno, ReplyDTO updatedComment);

    ReplyEntity findByRno(int rno);




    
} 