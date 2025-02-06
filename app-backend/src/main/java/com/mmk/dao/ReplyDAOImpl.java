package com.mmk.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.mmk.entity.ReplyEntity;

@Repository
public class ReplyDAOImpl implements ReplyDAO {
    
    @Autowired
    private ReplyRepository replyRepo;

    @Override
    public void save(ReplyEntity comment) {
        this.replyRepo.save(comment);
    }

    @Override
    public List<ReplyEntity> findByPno(int pno) {
        return this.replyRepo.findByPno(pno);
    }

    @Override
    public void deleteById(int rno) {
        // 댓글 삭제: 댓글이 존재하면 삭제, 존재하지 않으면 예외 발생
        ReplyEntity comment = this.replyRepo.findById(rno).orElseThrow(() -> 
            new IllegalArgumentException("아이디를 찾을 수 없습니다" + rno));
        
        this.replyRepo.delete(comment);  // 댓글 삭제
    }

    @Override
    public Optional<ReplyEntity> findById(int rno) {
        return this.replyRepo.findById(rno);
    }

    @Override
    public void updateReply(ReplyEntity existingComment) {
        this.replyRepo.save(existingComment);
    }

    @Override
    public ReplyEntity findByRno(int rno) {
        // 댓글의 rno로 조회하여 반환
        return this.replyRepo.findByRno(rno).orElseThrow(() -> 
        new IllegalArgumentException("댓글을 찾을 수 없습니다: " + rno));
    }

    @Override
    public void deleteByPno(int pno) {
        this.replyRepo.deleteByPno(pno);  // 댓글 삭제
    }
}
