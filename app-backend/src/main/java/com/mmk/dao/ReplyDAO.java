package com.mmk.dao;

import java.util.List;
import java.util.Optional;

import com.mmk.entity.ReplyEntity;

public interface ReplyDAO {

    void save(ReplyEntity comment);

    List<ReplyEntity> findByPno(int pno);

    void deleteById(int rno);

    Optional<ReplyEntity> findById(int rno);

    void updateReply(ReplyEntity existingComment);

    ReplyEntity findByRno(int rno);

    void deleteByPno(int pno);

}
