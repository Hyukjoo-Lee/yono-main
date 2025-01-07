package com.mmk.entity;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Timestamp;

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
        name = "no_seq_geranking",
        sequenceName = "ranking_seq",
        initialValue = 1,
        allocationSize = 1
)
@Table(name = "ranking")
public class RankingEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "no_seq_geranking")
    @Column(name = "ranking_id")
    private int rankingId;

    @Column(name = "ranking_position", nullable = false)
    private int rankingPosition;
    @Column(name = "user_name", nullable = false)
    private String userName;
    @Column(name = "user_id", nullable = false)
    private String userId;
    @Column(name = "total_badges", nullable = false)
    private int totalBadges;

    @Column(name = "ranking_month", nullable = false)
    private String rankingMonth;
    @Column(name = "ranking_img_url", nullable = false)
    private String rankingImgUrl;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false)
    private Timestamp createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private Timestamp updatedAt;
}
