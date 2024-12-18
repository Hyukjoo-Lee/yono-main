package com.mmk.vo;

import java.sql.Timestamp;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Entity
@SequenceGenerator(name = "user_seq_generator", sequenceName = "user_seq", initialValue = 1, allocationSize = 1)
@Table(name = "user_info")
public class UserInfoVO {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_seq_generator")
    @Column(name = "user_id")
    private int userId;

    @Column(name = "email", unique = true, nullable = false)
    private String email;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "name", nullable = false)
    private String name;

    // todo: 카카오 지도 API 연동 이후 처리 현재는 기본 값을 temp_address 로 지정함
    @Column(name = "address", nullable = false, columnDefinition = "varchar(255) default 'temp_address'")
    private String address = "temp_address";

    @Column(name = "spending_target", columnDefinition = "int default 0")
    private int spendingTarget;

    // todo: 프로필 사진 필드 추가
    @CreationTimestamp
    @Column(name = "created_at")
    private Timestamp createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private Timestamp updatedAt;
}