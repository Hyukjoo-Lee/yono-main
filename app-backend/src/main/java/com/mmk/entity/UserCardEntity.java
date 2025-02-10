package com.mmk.entity;

import java.sql.Timestamp;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
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

    // 카드 번호 (최대 길이 20, 필수)
    @NotNull
    @Size(max = 20)
    @Column(name = "user_card_num", nullable = false, length = 20)
    private String userCardNum;

    // 카드 만료일 (YYYYMM 형식, 6자리, 필수)
    @NotNull
    @Size(min = 4, max = 4, message = "카드 만료일은 YYMM(2902: 2029년 02월 형식) 이어야 합니다.")
    @Column(name = "expiry_date", nullable = false, length = 4)
    private String expiryDate;

    // 카드 비밀번호 (고정 길이 4자리, 필수)
    @NotNull
    @Size(max = 255)
    @Column(name = "card_pwd", nullable = false, length = 255)
    private String cardPwd;

    // 카드 이미지 (최대 길이 255, 필수)
    @NotNull
    @Size(max = 255)
    @Column(name = "card_img", nullable = false, length = 255)
    private String cardImgUrl;

    @Column(name = "primary_card", nullable = false)
    @ColumnDefault("'일반카드'")
    private String primaryCard;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false)
    private Timestamp createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private Timestamp updatedAt;

    @ManyToOne
    @JoinColumn(name = "card_company_num", nullable = false)
    private UserCardCompanyEntity userCardCompanyEntity;

    @ManyToOne
    @JoinColumn(name = "card_id", referencedColumnName = "card_id", nullable = false, foreignKey = @ForeignKey(name = "fk_user_card_card_id"))
    private CardEntity cardEntity;

    @ManyToOne
    @JoinColumn(name = "user_num", referencedColumnName = "user_num", nullable = false, foreignKey = @ForeignKey(name = "fk_user_card_user_num"))
    private UserEntity userEntity;
}
