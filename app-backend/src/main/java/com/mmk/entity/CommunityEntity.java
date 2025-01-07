package com.mmk.entity;

// import java.security.Timestamp;
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
  name = "gecommunity_no_seq",
  sequenceName = "gecommunity_no_seq",
  initialValue= 1,
  allocationSize=1
)
@Table(name = "community")
public class CommunityEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "gecommunity_no_seq")
  @Column(name = "community_no")
  private int communityNo;
  @Column(name = "comm_category")
  private String commCategory;
  @Column(name = "user_id", nullable=false)
  private String userId;
  @Column(name = "admin_id", nullable=false)
  private String adminId;
  @Column(name = "comm_title",nullable=false)
  private String commTitle;
  @Column(name = "comm_cont",nullable=false)
  private String commCont;
  @Column(name="comm_img_url",nullable=false)
  private String commImgUrl;
  @Column(name="view_count",nullable=false)
  private int viewCount;
  @Column(name="reply_count",nullable=false)
  private int replyCount;

  @CreationTimestamp
  @Column(name="created_at",nullable=false)
  private Timestamp createdAt;

  @UpdateTimestamp
  @Column(name="updated_at",nullable=false)
  private Timestamp updatedAt;
}
