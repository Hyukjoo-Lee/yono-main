package com.mmk.service;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.mmk.dao.PostsDAO;
import com.mmk.dto.PostsDTO;
import com.mmk.entity.PostsEntity;

import jakarta.transaction.Transactional;

@Service
public class PostsServiceImpl implements PostsService {

    @Autowired
    private PostsDAO postsDao;

    @Override
    public void save(PostsDTO postsData) {
        PostsEntity postsEntity = new PostsEntity();
        postsEntity.setTitle(postsData.getTitle());
        postsEntity.setCategory(postsData.getCategory());
        postsEntity.setUserId(postsData.getUserId());
        postsEntity.setContent(postsData.getContent());
        postsEntity.setImgurl(postsData.getImgurl()); // imgurl 추가
    
        // DAO에 저장
        postsDao.save(postsEntity);
    }

    @Override
    public List<PostsDTO> getAllPosts() {
        // DAO에서 모든 게시글을 가져옴
        List<PostsEntity> postsEntityList = postsDao.getAllPosts();

        // Entity → DTO로 변환하여 반환
        return postsEntityList.stream()
                .map(postsEntity -> {
                    PostsDTO dto = new PostsDTO();
                    dto.setNo(postsEntity.getNo());
                    dto.setTitle(postsEntity.getTitle());
                    dto.setCategory(postsEntity.getCategory());
                    dto.setUserId(postsEntity.getUserId());
                    dto.setContent(postsEntity.getContent());
                    dto.setRegdate(postsEntity.getRegdate());
                    dto.setViewcnt(postsEntity.getViewcnt());
                    dto.setImgurl(postsEntity.getImgurl());
                    dto.setCreatedAt(postsEntity.getCreatedAt());
                    dto.setUpdatedAt(postsEntity.getUpdatedAt());
                    return dto;
                })
                .collect(Collectors.toList());
    }

@Override
public PostsDTO findByIdAndViewCnt(int id) {
    // id를 Integer로 변환하여 DB에서 조회

    
    // Optional을 사용하지 않고, 직접 null 체크
    PostsEntity postEntity = postsDao.findById(id);

    // 값이 존재하지 않으면 예외 처리
    if (postEntity == null) {
        throw new RuntimeException("게시글을 찾을 수 없습니다.");
    }
    postEntity.setViewcnt(postEntity.getViewcnt() + 1); // 조회수 1 증가

    postsDao.updateCnt(postEntity);

    // Entity → DTO 변환
    PostsDTO postsDTO = new PostsDTO();
    postsDTO.setNo(postEntity.getNo());
    postsDTO.setTitle(postEntity.getTitle());
    postsDTO.setCategory(postEntity.getCategory());
    postsDTO.setUserId(postEntity.getUserId());
    postsDTO.setContent(postEntity.getContent());
    postsDTO.setRegdate(postEntity.getRegdate());
    postsDTO.setViewcnt(postEntity.getViewcnt());
    postsDTO.setCreatedAt(postEntity.getCreatedAt());
    postsDTO.setUpdatedAt(postEntity.getUpdatedAt());
    postsDTO.setImgurl(postEntity.getImgurl());

    return postsDTO;
}

@Override
public void updatePost(PostsDTO postsDTO) {
    PostsEntity pe =new PostsEntity();
    pe.setNo(postsDTO.getNo());
    pe.setTitle(postsDTO.getTitle());
    pe.setCategory(postsDTO.getCategory());
    pe.setUserId(postsDTO.getUserId());
    pe.setContent(postsDTO.getContent());
    pe.setRegdate(postsDTO.getRegdate());
    pe.setViewcnt(postsDTO.getViewcnt());
    pe.setCreatedAt(postsDTO.getCreatedAt());
    pe.setUpdatedAt(postsDTO.getUpdatedAt());
    pe.setImgurl(postsDTO.getImgurl());

    postsDao.updatePost(pe);
    }


@Transactional
@Override
public void deletePostById(String postId) {
    try {
    postsDao.deleteById(postId);
} catch (Exception e) {
    throw new RuntimeException("게시글 삭제 중 오류 발생: " + e.getMessage());
}
}



}
