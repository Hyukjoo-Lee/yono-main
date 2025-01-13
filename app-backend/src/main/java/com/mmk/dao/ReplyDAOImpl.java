package com.mmk.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.mmk.entity.ReplyEntity;

@Repository
public class ReplyDAOImpl implements ReplyDAO {
    
    @Autowired
    private ReplyRepository ReplyRepo;

    @Override
    public void save(ReplyEntity comment) {
        this.ReplyRepo.save(comment);
    }

    @Override
    public List<ReplyEntity> findByPno(int pno) {
        return this.ReplyRepo.findByPno(pno);
    }


    
}
