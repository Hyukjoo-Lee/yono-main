package com.mmk.dto;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ReplyLikeDTO {

    private int id;              // 고유 ID (Primary Key)
    private String commentId;       // 좋아요가 눌린 댓글 ID (Foreign Key)
    private String userId;        // 좋아요를 누른 사용자 ID (Foreign Key)
    private LocalDateTime regdate; // 좋아요 누른 시간
    
    
}
