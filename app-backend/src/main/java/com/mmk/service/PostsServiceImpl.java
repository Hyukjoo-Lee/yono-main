package com.mmk.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mmk.dao.PostsDAO;
import com.mmk.dao.ReplyDAO;
import com.mmk.dao.UserDAO;
import com.mmk.dto.PostsDTO;
import com.mmk.entity.PostEntity;
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

    /**
     * 새로운 게시글을 저장.
     *
     * @param postsData 저장할 게시글 정보
     * @throws RuntimeException 사용자 ID가 유효하지 않을 경우 예외 발생
     */
    @Override
    public void save(PostsDTO postsData) {
        System.out.println("사용자 ID: " + postsData.getUserId());
        UserEntity userEntity = userDao.getUserByUserId(postsData.getUserId());
        if (userEntity == null) {
            throw new RuntimeException("유효하지 않은 사용자 ID: " + postsData.getUserId());
        }

        PostEntity postsEntity = convertToEntity(postsData);

        postsEntity.setUserEntity(userEntity);

        postsDao.save(postsEntity);
    }

    
    /**
     * 모든 게시글을 조회
     *
     * @return 게시글 목록 (DTO 리스트)
     */
    @Override
    public List<PostsDTO> getAllPosts() {

        return postsDao.getAllPosts()
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    
    /**
     * 특정 ID의 게시글을 조회하고 조회수를 증가
     *
     * @param id 조회할 게시글의 ID
     * @return 조회된 게시글 정보 (DTO)
     * @throws RuntimeException 게시글이 존재하지 않을 경우 예외 발생
     */


    
    /**
     * 특정 ID의 게시글을 조회하고 조회수를 증가
     *
     * @param id 조회할 게시글의 ID
     * @return 조회된 게시글 정보 (DTO)
     * @throws RuntimeException 게시글이 존재하지 않을 경우 예외 발생
     */
    @Transactional
    @Override
    public PostsDTO findByIdAndViewCnt(int id) {

        PostEntity postEntity = postsDao.findById(id);
        if (postEntity == null) {
            throw new RuntimeException("게시글을 찾을 수 없습니다. 게시글 ID: " + id);
        }

        postEntity.setViewcnt(postEntity.getViewcnt() + 1);
        postsDao.updateCnt(postEntity);

        return convertToDto(postEntity);
    }

    //게시글을 삭제하며, 해당 게시글의 댓글도 함께 삭제
    @Transactional
    @Override
    public void deletePostById(String postId) {
        try {
            replyDAO.deleteByPno(Integer.parseInt(postId));

            postsDao.deleteById(postId);
        } catch (NumberFormatException e) {
            throw new RuntimeException("게시글 ID는 숫자여야 합니다. 입력된 값: " + postId, e);
        } catch (Exception e) {
            throw new RuntimeException("게시글 삭제 중 오류 발생. 게시글 ID: " + postId, e);
        }
    }

    //게시글 수정
    @Override
    public void updatePost(PostsDTO postsDTO) {
        UserEntity userEntity = userDao.getUserByUserId(postsDTO.getUserId());
        if (userEntity == null) {
            throw new RuntimeException("유효하지 않은 사용자 ID: " + postsDTO.getUserId());
        }

        PostEntity postEntity = convertToEntity(postsDTO);
        postEntity.setUserEntity(userEntity);
        postsDao.updatePost(postEntity);
    }

    //특정 게시글을 조회
    @Override
    public PostsDTO findById(String postId) {
        try {
            
            PostEntity postEntity = postsDao.findById(Integer.parseInt(postId));

            if (postEntity == null) {
                throw new RuntimeException("게시글을 찾을 수 없습니다. 게시글 ID: " + postId);
            }

            
            return convertToDto(postEntity);

        } catch (NumberFormatException e) {
            throw new RuntimeException("입력된 값: " + postId, e);
        } catch (Exception e) {
            throw new RuntimeException("게시글 조회 중 오류 발생. 게시글 ID: " + postId, e);
        }
    }

    /**
     * DTO 객체를 Entity 객체로 변환
     *
     * @param dto 변환할 DTO 객체
     * @return 변환된 Entity 객체
     */
    
    private PostEntity convertToEntity(PostsDTO dto) {
        PostEntity entity = new PostEntity();
        entity.setPno(dto.getNo());
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

    /**
     * Entity 객체를 DTO 객체로 변환
     *
     * @param entity 변환할 Entity 객체
     * @return 변환된 DTO 객체
     */
    private PostsDTO convertToDto(PostEntity entity) {
        PostsDTO dto = new PostsDTO();
        dto.setNo(entity.getPno());
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

}
