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
@SequenceGenerator(name = "badge_seq_generator", sequenceName = "badge_seq", initialValue = 1, allocationSize = 1)
@Table(name = "badge")
public class BadgeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "badge_seq_generator")
    @Column(name = "badge_num")
    private int badgeNum;

    @Column(name = "badge_date")
    private String badgeDate; // 202501 -> 날짜

    @Column(name = "badge")
    private int badge; // 12 -> 뱃지 갯수

    @Column(name = "ranking")
    private int ranking; // 랭킹 순위

    @Column(name = "previous_month_amount")
    private int previousMonthAmount; // 지난 달의 총 사용 금액

    @Column(name = "two_months_ago_amount")
    private int twoMonthsAgoAmount; // 저저번 달 총 사용 금액

    // @ManyToOne
    // @JoinColumn(name = "card_History", nullable = false)
    // private CardHistoryEntity cardHistoryEntity;

    @ManyToOne
    @JoinColumn(name = "user_num", nullable = false)
    private UserEntity userEntity;
}