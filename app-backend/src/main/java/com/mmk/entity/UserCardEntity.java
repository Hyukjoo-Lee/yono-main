package com.mmk.entity;

import java.sql.Timestamp;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

// 사용자 소유 카드 엔터티: 사용자가 등록한 카드 정보
@Setter
@Getter
@ToString
@Entity
@SequenceGenerator(name = "user_card_seq_generator", sequenceName = "user_card_seq", initialValue = 1, allocationSize = 1)
@Table(name = "user_card")
public class UserCardEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_card_seq_generator")
    @Column(name = "user_card_id")
    private int userCardId;

    // 카드 번호
    @Column(name = "user_card_num", nullable = false)
    private String userCardNum;

    // 카드 만료일
    @Column(name = "expiry_date", nullable = false)
    private String expiryDate;

    // 사용자 이름 (카드 표기용)
    @Column(name = "user_name", nullable = false)
    private String userName;

    // 사용자 카드사 아이디
    @Column(name = "user_card_company_id")
    private String companyId;

    // 사용자 카드사 비밀번호
    @Column(name = "user_card_company_pwd")
    private String companyPwd;

    // 사용자 카드사 커넥티드 아이디
    @Column(name = "user_card_connectedId")
    private String connectedId;

    // 대표카드 설정
    // 대표카드가 아닌 경우 0, 대표카드인 경우 1
    @Column(name = "primary_card", columnDefinition = "int default 0")
    private int primaryCard = 0;

    @CreationTimestamp
    private Timestamp createdAt;

    @UpdateTimestamp
    private Timestamp updatedAt;

    // CardEntity 에서 카드 타이틀, 이미지, 연결된 혜택들 가져와야함
    @ManyToOne
    @JoinColumn(name = "card_id", nullable = false)
    private CardEntity cardEntity;

    @ManyToOne
    @JoinColumn(name = "user_num", nullable = false)
    private UserEntity userEntity;
}
