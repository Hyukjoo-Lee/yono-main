package com.mmk.controller;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mmk.dto.ReplyDTO;
import com.mmk.entity.ReplyEntity;
import com.mmk.service.ReplyService;
import com.mmk.service.ReplyLikeService;

@RestController
@RequestMapping("/reply")
public class ReplyController {

    @Autowired
    private ReplyService replyService;

    @Autowired
    private ReplyLikeService replyLikeService;

    
    @PostMapping("/add")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ReplyDTO> addComment(
            @RequestBody ReplyDTO comment) {
        if (replyService.validate(comment)) { //특정 조건 검사 
            replyService.add(comment);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

   @GetMapping("/list/{pno}") // 게시판 번호로 댓글 가져오기
    public ResponseEntity<List<ReplyDTO>> listCommentsByPno(@PathVariable int pno) {
        try {
        // 서비스 계층을 통해 댓글 목록을 가져옵니다.
        List<ReplyDTO> comments = replyService.findByPno(pno);
        return ResponseEntity.ok(comments); // 성공 시 댓글 목록 반환
        } catch (Exception e) {
            e.printStackTrace();
         return ResponseEntity.status(500).body(null); // 서버 오류 발생 시 500 응답
        }
    }
    

    @PutMapping("/edit/{rno}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<String> editComment(@PathVariable int rno, @RequestBody ReplyDTO updatedComment) {
    try {
        boolean isUpdated = replyService.edit(rno, updatedComment);
        
        if (isUpdated) {
            return ResponseEntity.ok().build(); // 수정 성공
        } else {
            return ResponseEntity.status(405).body("댓글을 찾을 수 없습니다.");
        }
    } catch (SecurityException e) {
        return ResponseEntity.status(403).body("본인이 작성한 댓글이 아닙니다."); 
    } catch (Exception e) {
        e.printStackTrace();
        return ResponseEntity.status(500).body("서버 오류가 발생했습니다."); // 기타 서버 오류
    }
}



    @DeleteMapping("/delete/{rno}/{userId}")
    public ResponseEntity<Void> deleteComment(@PathVariable int rno, @PathVariable String userId) {
        try {
            replyService.delete(rno, userId); // 댓글 삭제 호출
            return ResponseEntity.ok().build();
        } catch (SecurityException e) {
            return ResponseEntity.status(403).build(); // 본인이 작성한 댓글이 아닌 경우 403 반환
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(404).build(); // 댓글이 없을 경우 404 반환
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build(); // 기타 서버 오류
        }

    }
    
    @PostMapping("/like/{rno}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Map<String, Object>> toggleLike(
    @PathVariable int rno,
    @RequestBody Map<String, String> payload) {

    String userId = payload.get("userId");

    try {
        // 좋아요 상태 토글
        boolean isLiked = replyLikeService.toggleLike(rno, userId);

        // 해당 댓글의 like_count를 업데이트 후 응답에 포함
        ReplyEntity reply = replyService.findByRno(rno);
        
        Map<String, Object> response = new HashMap<>();
        response.put("isLiked", isLiked);
        response.put("likeCount", reply.getLike_count());  // like_count 업데이트 된 값을 포함

        return ResponseEntity.ok(response);
    } catch (Exception e) {
        e.printStackTrace();
        return ResponseEntity.status(500).body(Collections.singletonMap("error", "서버 오류가 발생했습니다."));
    }
}


    
}

    