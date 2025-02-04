package com.mmk.entity;

import java.sql.Timestamp;
import java.time.LocalDateTime;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
@Entity
@SequenceGenerator(name = "no_seq_genotice", sequenceName = "notice_seq", initialValue = 1, allocationSize = 1)
@Table(name = "notice")
public class NoticeEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "no_seq_genotice")
  @Column(name = "notice_no")
  private int noticeNo;

  @Column(name = "title")
  private String title;
  @Column(name = "content")
  private String content;
  @Column(name = "img_url")
  private String imgurl;

  @CreationTimestamp
  @Column(name = "created_at")
  private Timestamp createdAt;

  @Column(name = "updated_at")
  private LocalDateTime updatedAt;

  @ManyToOne
  @JoinColumn(name = "user_num", referencedColumnName = "user_num")
  private UserEntity userEntity;

  @Column(name = "view_count", nullable = false)
  @ColumnDefault("0")
  private int viewCount = 0;

  @PrePersist
  public void prePersist() {
    if (updatedAt == null) {
      updatedAt = null;
    }
  }

  @PreUpdate
  public void preUpdate() {
    if (updatedAt == null) {
      updatedAt = LocalDateTime.now();
    }
  }
}