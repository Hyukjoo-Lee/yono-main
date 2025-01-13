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
  name = "community_seq",
  sequenceName = "community_seq",
  initialValue= 1,
  allocationSize=1
)
@Table(name = "community")
public class CommunityEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "community_seq")
  @Column(name = "community_no")
  private int communityNo;

  @Column(name = "comm_category")
  private String commCategory;

  @Column(name = "user_id", nullable=false)
  private String userId;

  @Column(name = "comm_title", nullable=false)
  private String commTitle;

  @Column(name = "comm_cont", nullable=false)
  private String commCont;

  @Column(name="comm_img_url")
  private String commImgUrl;

  @Column(name="view_count", nullable=false, columnDefinition = "int default 0")
  private int viewCount = 0;

  @Column(name="reply_count", nullable=false, columnDefinition = "int default 0")
  private int replyCount = 0;

  @CreationTimestamp
  @Column(name="created_at")
  private Timestamp createdAt;

  @UpdateTimestamp
  @Column(name="updated_at")
  private Timestamp updatedAt;

  // @CreationTimestamp
  // @Column(name="regdate₩",nullable=false)
  // private Timestamp regdate;
}
