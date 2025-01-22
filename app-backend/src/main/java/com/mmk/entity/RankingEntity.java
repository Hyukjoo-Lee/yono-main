package com.mmk.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
    @Column(name = "ranking_num")
    private int rankingNum;

    @ManyToOne
    @JoinColumn(name = "badge_num", nullable = false)
    private BadgeEntity badgeEntity;

    @Column(name = "ranking_position", nullable = false)
    private int rankingPosition; // 등수
}
