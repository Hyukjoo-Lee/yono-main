package com.mmk.dao;

public interface ReplyLikeDAO {

    void save(int rno, String userId);

    void deleteByRnoAndUserId(int rno, String userId);

    boolean existsByRnoAndUserId(int rno, String userId);


    
}
