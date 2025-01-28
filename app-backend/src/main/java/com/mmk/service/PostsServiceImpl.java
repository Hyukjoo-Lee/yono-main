package com.mmk.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mmk.dao.PostsDAO;
import com.mmk.dao.ReplyDAO;
import com.mmk.dao.UserDAO;
import com.mmk.dto.PostsDTO;
import com.mmk.entity.PostsEntity;
import com.mmk.entity.UserEntity;

import jakarta.transaction.Transactional;

@Service
public class PostsServiceImpl implements PostsService {

    @Autowired
    private PostsDAO postsDao;

    @Autowired
    private UserDAO userDao;

    @Autowired
    private ReplyDAO replyDAO;

@Override
public void save(PostsDTO postsData) {
    // 사용자 조회
    System.out.println("사용자 ID: " + postsData.getUserId());
    UserEntity userEntity = userDao.getUserByUserId(postsData.getUserId());  // userId로 UserEntity 조회
    if (userEntity == null) {
        throw new RuntimeException("유효하지 않은 사용자 ID: " + postsData.getUserId());
    }

    // DTO → Entity 변환
    PostsEntity postsEntity = convertToEntity(postsData);

    // UserEntity를 PostsEntity에 설정
    postsEntity.setUserEntity(userEntity);  // UserEntity를 PostsEntity에 설정

    // 게시물 저장
    postsDao.save(postsEntity);  
}


    @Override
    public List<PostsDTO> getAllPosts() {
        // 모든 게시글 조회 및 DTO 변환
        return postsDao.getAllPosts()
                .stream()
                .map(this::convertToDto) // 변환 메서드 사용
                .collect(Collectors.toList());
    }

    @Transactional
    @Override
    public PostsDTO findByIdAndViewCnt(int id) {
        // 게시글 조회
        PostsEntity postEntity = postsDao.findById(id);
        if (postEntity == null) {
            throw new RuntimeException("게시글을 찾을 수 없습니다. 게시글 ID: " + id);
        }

        // 조회수 증가 및 업데이트
        postEntity.setViewcnt(postEntity.getViewcnt() + 1);
        postsDao.updateCnt(postEntity);

        // Entity → DTO 변환
        return convertToDto(postEntity);
    }

    @Transactional
    @Override
    public void deletePostById(String postId) {
        try {
            replyDAO.deleteByPno(Integer.parseInt(postId)); // 댓글 삭제

            postsDao.deleteById(postId);
        } catch (NumberFormatException e) {
            throw new RuntimeException("게시글 ID는 숫자여야 합니다. 입력된 값: " + postId, e);
        } catch (Exception e) {
            throw new RuntimeException("게시글 삭제 중 오류 발생. 게시글 ID: " + postId, e);
        }
    }

    @Override
    public void updatePost(PostsDTO postsDTO) {
        // 사용자 조회
        UserEntity userEntity = userDao.getUserByUserId(postsDTO.getUserId());
        if (userEntity == null) {
            throw new RuntimeException("유효하지 않은 사용자 ID: " + postsDTO.getUserId());
        }

        // DTO → Entity 변환 및 업데이트
        PostsEntity postEntity = convertToEntity(postsDTO);
        postEntity.setUserEntity(userEntity);
        postsDao.updatePost(postEntity);
    }

    // Helper method: DTO → Entity 변환
    private PostsEntity convertToEntity(PostsDTO dto) {
        PostsEntity entity = new PostsEntity();
        entity.setNo(dto.getNo());
        entity.setTitle(dto.getTitle());
        entity.setCategory(dto.getCategory());
        entity.setContent(dto.getContent());
        entity.setRegdate(dto.getRegdate());
        entity.setViewcnt(dto.getViewcnt());
        entity.setImgurl(dto.getImgurl());
        entity.setCreatedAt(dto.getCreatedAt());
        entity.setUpdatedAt(dto.getUpdatedAt());
        return entity;
    }

    // Helper method: Entity → DTO 변환
    private PostsDTO convertToDto(PostsEntity entity) {
        PostsDTO dto = new PostsDTO();
        dto.setNo(entity.getNo());
        dto.setTitle(entity.getTitle());
        dto.setCategory(entity.getCategory());
        dto.setContent(entity.getContent());
        dto.setRegdate(entity.getRegdate());
        dto.setViewcnt(entity.getViewcnt());
        dto.setImgurl(entity.getImgurl());
        dto.setCreatedAt(entity.getCreatedAt());
        dto.setUpdatedAt(entity.getUpdatedAt());

        if (entity.getUserEntity() != null) {
            dto.setUserId(entity.getUserEntity().getUserId());
        }
        return dto;
    }


    @Override
    public PostsDTO findById(String postId) {
    try {
        // 게시글 ID로 게시글 엔티티 조회
        PostsEntity postEntity = postsDao.findById(Integer.parseInt(postId));

        if (postEntity == null) {
            throw new RuntimeException("게시글을 찾을 수 없습니다. 게시글 ID: " + postId);
        }

        // Entity → DTO 변환 후 반환
        return convertToDto(postEntity);

    } catch (NumberFormatException e) {
        throw new RuntimeException("입력된 값: " + postId, e);
    } catch (Exception e) {
        throw new RuntimeException("게시글 조회 중 오류 발생. 게시글 ID: " + postId, e);
    }
}

}
