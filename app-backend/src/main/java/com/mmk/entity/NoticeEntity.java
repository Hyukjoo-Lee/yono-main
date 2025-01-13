package com.mmk.entity;

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

@Setter
@Getter
@ToString
@Entity
@SequenceGenerator(
  name = "notice_seq",
  sequenceName = "notice_seq",
  initialValue = 1,
  allocationSize = 1
)
@Table(name = "notice")
public class NoticeEntity {
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "notice_seq")
  @Column(name = "notice_no")
  private int noticeNo;

  @Column(name = "admin_id",nullable = false)
  private String adminId;

  @Column(name = "notice_title",nullable = false)
  private String noticeTitle;

  @Column(name = "notice_cont",nullable = false)
  private String noticeCont;

  @Column(name = "notice_img_url")
  private String noticeImgUrl;

  @Column(name="view_count", nullable=false, columnDefinition = "int default 0")
  private int viewCount = 0;

  @CreationTimestamp
  @Column(name="created_at")
  private Timestamp createdAt;

  @UpdateTimestamp
  @Column(name="updated_at")
  private Timestamp updatedAt;

}