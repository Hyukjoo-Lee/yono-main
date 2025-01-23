package com.mmk.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
@Entity
@SequenceGenerator(name = "badge_seq_generator", sequenceName = "badge_seq", initialValue = 1, allocationSize = 1)
@Table(name = "badge")
public class BadgeEntity {

    // @Id
    // @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "badge_seq_generator")
    // @Column(name = "badge_num")
    // private int badgeNum;

    // @Column(name = "badge_date")
    // private String badgeDate; // 202501 -> 날짜

    // @Column(name = "badge")
    // private int badge; // 12 -> 뱃지 갯수

    // @ManyToOne
    // @JoinColumn(name = "card_history", nullable = false)
    // private CardHistoryEntity cardHistoryEntity;

}
