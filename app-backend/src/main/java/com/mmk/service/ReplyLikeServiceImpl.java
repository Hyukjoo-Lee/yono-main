package com.mmk.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.mmk.dao.ReplyDAO;
import com.mmk.dao.ReplyLikeDAO;
import com.mmk.entity.ReplyEntity;

import jakarta.transaction.Transactional;

@Service
public class ReplyLikeServiceImpl implements ReplyLikeService {

    @Autowired
    private ReplyLikeDAO replyLikeDao;
    @Autowired
    private ReplyDAO replyDao;

    @Override
    @Transactional
    public boolean toggleLike(int rno, String userId) {
        // 1. 사용자와 해당 댓글에 대한 좋아요가 이미 존재하는지 확인
        boolean isLiked = replyLikeDao.existsByRnoAndUserId(rno, userId);

        if (isLiked) {
            // 2. 이미 좋아요가 존재하면, 좋아요를 취소(삭제)
            replyLikeDao.deleteByRnoAndUserId(rno, userId);
            // 댓글의 like_count 감소
            ReplyEntity reply = replyDao.findByRno(rno);
            if (reply.getLike_count() > 0) {
                reply.setLike_count(reply.getLike_count() - 1);
                replyDao.updateReply(reply);  // 업데이트된 값 저장
            }
            return false; // 좋아요가 취소되었음을 나타냄
        } else {
            // 3. 좋아요가 존재하지 않으면, 새로 좋아요 추가
            replyLikeDao.save(rno, userId);
            // 댓글의 like_count 증가
            ReplyEntity reply = replyDao.findByRno(rno);
            reply.setLike_count(reply.getLike_count() + 1);
            replyDao.updateReply(reply);  // 업데이트된 값 저장
            return true; // 좋아요가 추가되었음을 나타냄
        }
    }
}
