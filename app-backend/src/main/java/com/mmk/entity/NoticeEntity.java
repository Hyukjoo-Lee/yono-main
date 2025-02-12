package com.mmk.entity;

import java.sql.Timestamp;
import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * 공지사항 정보를 저장하는 엔티티 클래스
 */
@Setter
@Getter
@ToString
@Entity
@SequenceGenerator(name = "no_seq_genotice", sequenceName = "notice_seq", initialValue = 1, allocationSize = 1)
@Table(name = "notice")
public class NoticeEntity {

  /**
   * 공지사항 번호 (Primary Key)
   */
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "no_seq_genotice")
  @Column(name = "notice_no")
  private int noticeNo;

  /**
   * 공지사항 제목 (최소 1자, 최대 50자)
   */
  @Size(min = 1, max = 50)
  @Column(name = "title", nullable=false, length =50)
  private String title;

  /**
   * 공지사항 내용 (최소 10자, 최대 4000자)
   */
  @Size(min = 10, max = 4000)
  @Column(name = "content", nullable=false,length=4000)
  private String content;

  /**
   * 이미지 URL (최대 255자)
   */
  @Size(max = 255)
  @Column(name = "img_url", length = 255)
  private String imgurl;

  /**
   * 공지사항 생성 일자 (자동 생성됨)
   */
  @CreationTimestamp
  @Column(name = "created_at")
  private Timestamp createdAt;

  /**
   * 공지사항 수정 일자
   */
  @Column(name = "updated_at")
  private LocalDateTime updatedAt;

  /**
   * 작성자 (UserEntity와 Many-to-One 관계)
   */
  @ManyToOne
  @JoinColumn(name = "user_num", referencedColumnName = "user_num", nullable = false, foreignKey = @ForeignKey(name = "fk_notice_user_num"))
  private UserEntity userEntity;

  /**
   * 엔티티가 처음 저장될 때 실행되는 메서드 (updatedAt을 null로 설정)
   */
  @PrePersist
  public void prePersist() {
    if (updatedAt == null) {
      updatedAt = null;
    }
  }

  /**
   * 엔티티가 업데이트될 때 실행되는 메서드 (updatedAt을 현재 시간으로 설정)
   */
  @PreUpdate
  public void preUpdate() {
    if (updatedAt == null) {
      updatedAt = LocalDateTime.now();
    }
  }
}