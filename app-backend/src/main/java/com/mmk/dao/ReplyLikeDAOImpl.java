package com.mmk.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.mmk.entity.ReplyLikeEntity;
import com.mmk.entity.UserEntity;

@Repository
public class ReplyLikeDAOImpl implements ReplyLikeDAO {

    @Autowired
    private ReplyLikeRepository replyLikeRepo;

    @Autowired
    private UserDAO userDao;

    @Override
    public void save(int rno, String userId) {
        // ReplyLikeEntity 객체 생성 및 데이터 설정
        ReplyLikeEntity replyLike = new ReplyLikeEntity();
        UserEntity userEntity = userDao.getUserByUserId(userId);

        replyLike.setUserEntity(userEntity);
        replyLike.setRno(rno); // 댓글 번호
        replyLikeRepo.save(replyLike); // JPA 리포지토리를 통해 저장
    }

    @Override
    public void deleteByRnoAndUserId(int rno, String userId) {
        // 댓글 번호와 사용자 ID로 해당 좋아요 삭제
        replyLikeRepo.deleteByRnoAndUserEntity_UserId(rno, userId);
    }

    @Override
    public boolean existsByRnoAndUserId(int rno, String userId) {
        // 댓글 번호와 사용자 ID로 좋아요 존재 여부 확인
        return replyLikeRepo.existsByRnoAndUserEntity_UserId(rno, userId);
    }
}
