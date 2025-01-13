package com.mmk.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mmk.dto.ReplyDTO;
import com.mmk.service.ReplyService;

@RestController
@RequestMapping("/reply")
public class ReplyController {

    @Autowired
    private ReplyService replyService;

    
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

}
