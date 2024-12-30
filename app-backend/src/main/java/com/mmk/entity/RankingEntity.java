package com.mmk.entity;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Timestamp;

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
    private int rankingId;

    private int rankingPosition;
    private String userName;
    private String userId;
    private int totalBadges;

    private String rankingMonth;
    private String rankingImgUrl;

    @CreationTimestamp
    private Timestamp createdAt;

    @UpdateTimestamp
    private Timestamp updatedAt;
}
