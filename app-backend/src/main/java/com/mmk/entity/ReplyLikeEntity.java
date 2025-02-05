package com.mmk.entity;

import java.time.LocalDate;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
@Entity
@SequenceGenerator(name = "replylike_seq_generator", sequenceName = "replylike_seq", initialValue = 1, allocationSize = 1)
@Table(name = "reply_like")
public class ReplyLikeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, // 사용할 전략을 시퀀스로 선택
            generator = "replylike_seq_generator")

    @Column(name = "id")
    private int id; // 고유 ID (Primary Key)

    @Column(name = "rno", nullable = false)
    private int rno; // 좋아요가 눌린 댓글 ID (Foreign Key)

    @CreationTimestamp
    @Column(name = "regdate", nullable = false)
    private LocalDate regdate;// 좋아요 누른 시간

    @ManyToOne
    @JoinColumn(name = "user_num", referencedColumnName = "user_num", nullable = false, foreignKey = @ForeignKey(name = "fk_reply_like_user_num"))
    private UserEntity userEntity;
}
// user_info, user_card, user_card_company, card, card_benefit