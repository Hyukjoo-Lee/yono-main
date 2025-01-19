package com.mmk.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mmk.dao.ReplyDAO;
import com.mmk.dto.ReplyDTO;
import com.mmk.entity.ReplyEntity;


@Service
public class ReplyServiceImpl implements ReplyService {

    @Autowired
    private ReplyDAO replyDao; // 댓글 저장소
    


    @Override
    public boolean validate(ReplyDTO replyDTO) {
        // 예시: 댓글 내용이 비어 있거나 너무 길지 않은지 확인
        if (replyDTO.getR_content() == null || replyDTO.getR_content().trim().isEmpty()) {
            return false;  // 댓글 내용이 없으면 유효하지 않음
        }
        if (replyDTO.getR_content().length() > 500) {
            return false;  // 댓글 내용이 500자 이상이면 유효하지 않음
        }
        return true;  // 유효한 댓글
    }

    @Override
    public void add(ReplyDTO replyDTO) {
        // 유효성 검사
        if (!validate(replyDTO)) {
            throw new IllegalArgumentException("Invalid comment data");  // 유효하지 않으면 예외 발생
        }

        // ReplyDTO를 Reply 엔티티로 변환
        ReplyEntity comment = new ReplyEntity();
        comment.setPno(replyDTO.getPno());
        comment.setUserId(replyDTO.getUserId());
        comment.setR_content(replyDTO.getR_content());
        comment.setLike_count(replyDTO.getLike_count());
        comment.setRegdate(replyDTO.getRegdate());

        // 댓글을 데이터베이스에 저장
        replyDao.save(comment);
    }

    @Override
    public List<ReplyDTO> findByPno(int pno) {
        // ReplyDAO를 통해 특정 게시판 번호(pno)로 댓글 엔티티를 조회
        List<ReplyEntity> replyEntities = replyDao.findByPno(pno);

        // ReplyEntity 리스트를 ReplyDTO 리스트로 변환하여 반환
        return replyEntities.stream()
            .map(entity -> {
                ReplyDTO dto = new ReplyDTO();
                dto.setRno(entity.getRno());
                dto.setPno(entity.getPno());
                dto.setUserId(entity.getUserId());
                dto.setR_content(entity.getR_content());
                dto.setLike_count(entity.getLike_count());
                dto.setCreatedAt(entity.getCreatedAt());
                dto.setUpdatedAt(entity.getUpdatedAt());
                dto.setRegdate(entity.getRegdate());
                return dto;
            })
            .collect(Collectors.toList());
    }

    @Override
    public void delete(int rno, String loggedInUserId) {

        // 댓글 삭제
        replyDao.deleteById(rno);
    }
    @Override
    public boolean edit(int rno, ReplyDTO updatedComment) {
        // 댓글을 데이터베이스에서 찾음
        ReplyEntity existingComment = replyDao.findById(rno).orElse(null);

        if (existingComment == null) {
            return false; // 댓글이 존재하지 않으면 false 반환
        }

        // 댓글 내용이 비어있거나 길이가 너무 길면 수정할 수 없으므로 유효성 체크
        if (!validate(updatedComment)) {
            return false; // 유효하지 않은 댓글 내용
        }

        // 댓글을 수정
        existingComment.setR_content(updatedComment.getR_content()); // 수정된 내용으로 변경
        existingComment.setUpdatedAt(updatedComment.getUpdatedAt()); // 수정일자 업데이트

        // 수정된 댓글을 저장
        replyDao.updateReply(existingComment);

        return true; // 수정 성공
    }

    @Override
    public ReplyEntity findByRno(int rno) {
        // 댓글 번호로 댓글을 찾아서 반환
        Optional<ReplyEntity> replyEntity = replyDao.findById(rno);
        return replyEntity.orElse(null);  // 댓글이 존재하지 않으면 null 반환
    }

}
