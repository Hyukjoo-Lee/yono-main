package com.mmk.dao;

import java.util.List;

import com.mmk.entity.ReplyEntity;

public interface ReplyDAO {

    void save(ReplyEntity comment);

    List<ReplyEntity> findByPno(int pno);
    
}
