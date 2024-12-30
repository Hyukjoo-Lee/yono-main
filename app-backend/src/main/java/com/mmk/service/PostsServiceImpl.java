package com.mmk.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mmk.dao.PostsDAO;
import com.mmk.dto.PostsDTO;
import com.mmk.entity.PostsEntity;

@Service
public class PostsServiceImpl implements PostsService {

    @Autowired
    private PostsDAO postsDao;

    @Override
    public void save(PostsDTO postsData) {
    
    PostsEntity postsEntity = new PostsEntity();
    postsEntity.setTitle(postsData.getTitle());
    postsEntity.setCategory(postsData.getCategory());
    postsEntity.setUserid(postsData.getUserid());
    postsEntity.setContent(postsData.getContent());
    
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
                    dto.setUserid(postsEntity.getUserid());
                    dto.setContent(postsEntity.getContent());
                    dto.setRegdate(postsEntity.getRegdate());
                    dto.setViewcnt(postsEntity.getViewcnt());
                    dto.setCreatedAt(postsEntity.getCreatedAt());
                    dto.setUpdatedAt(postsEntity.getUpdatedAt());
                    return dto;
                })
                .collect(Collectors.toList());
    }

    @Override
    public PostsDTO findById(String id) {
         // id를 Integer로 변환하여 DB에서 조회
    int UserId = Integer.parseInt(id);  // id가 String이라면 Integer로 변환
    PostsEntity postEntity = (PostsEntity) postsDao.findById(UserId);
    // Entity -> DTO 변환
    PostsDTO postsDTO = new PostsDTO();
    postsDTO.setNo(postEntity.getNo());
    postsDTO.setTitle(postEntity.getTitle());
    postsDTO.setCategory(postEntity.getCategory());
    postsDTO.setUserid(postEntity.getUserid());
    postsDTO.setContent(postEntity.getContent());
    postsDTO.setRegdate(postEntity.getRegdate());
    postsDTO.setViewcnt(postEntity.getViewcnt());
    postsDTO.setCreatedAt(postEntity.getCreatedAt());
    postsDTO.setUpdatedAt(postEntity.getUpdatedAt());
    
    return postsDTO;
    }

}
