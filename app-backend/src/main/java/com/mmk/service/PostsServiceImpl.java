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
    int userId = Integer.parseInt(id);
    
    // Optional을 사용하지 않고, 직접 null 체크
    PostsEntity postEntity = postsDao.findById(userId);

    // 값이 존재하지 않으면 예외 처리
    if (postEntity == null) {
        throw new RuntimeException("게시글을 찾을 수 없습니다.");
    }

    // Entity → DTO 변환
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

@Override
public PostsDTO updatePost(int no, PostsDTO postsData) {
    // 게시글 조회
    PostsEntity postEntity = postsDao.findById(no);

    // null 체크 후 예외 처리
    if (postEntity == null) {
        throw new RuntimeException("게시글을 찾을 수 없습니다.");
    }

    // 게시글 수정
    postEntity.setTitle(postsData.getTitle());
    postEntity.setCategory(postsData.getCategory());
    postEntity.setContent(postsData.getContent());

    // 수정된 게시글을 DB에 저장
    postsDao.save(postEntity);  // save는 수정된 데이터를 저장하는 용도로 사용됩니다.

    // 수정된 게시글을 DTO로 변환하여 반환
    PostsDTO updatedPostDTO = new PostsDTO();
    updatedPostDTO.setNo(postEntity.getNo());
    updatedPostDTO.setTitle(postEntity.getTitle());
    updatedPostDTO.setCategory(postEntity.getCategory());
    updatedPostDTO.setUserid(postEntity.getUserid());
    updatedPostDTO.setContent(postEntity.getContent());
    updatedPostDTO.setRegdate(postEntity.getRegdate());
    updatedPostDTO.setViewcnt(postEntity.getViewcnt());
    updatedPostDTO.setCreatedAt(postEntity.getCreatedAt());
    updatedPostDTO.setUpdatedAt(postEntity.getUpdatedAt());

    return updatedPostDTO;
}

@Override
public void deletePostById(String id) {
    // id를 Integer로 변환
    int userId = Integer.parseInt(id);

    // 게시글 존재 여부 확인
    PostsEntity postEntity = postsDao.findById(userId);

    // null 체크 후 예외 처리
    if (postEntity == null) {
        throw new RuntimeException("게시글을 찾을 수 없습니다.");
    }

    // 게시글 삭제
    postsDao.deleteById(userId); // DAO에서 deleteById 메서드를 호출
}

}
