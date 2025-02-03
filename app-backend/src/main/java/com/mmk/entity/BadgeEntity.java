package com.mmk.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
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

    @NotNull
    @Size(max = 6)
    @Column(name = "badge_date", nullable = false, length = 6)
    private String badgeDate; // 202501 -> 날짜

    @NotNull
    @Size(max = 10000)
    @Column(name = "badge", nullable = false, length = 10000, columnDefinition = "int default 0")
    private int badge; // 12 -> 뱃지 갯수

    @NotNull
    @Size(max = 10000)
    @Column(name = "ranking", nullable = false, length = 10000)
    private int ranking; // 랭킹 순위
    
    @NotNull
    @Size(max = 5000)
    @Column(name = "current_month_amount", nullable = false, length = 50000, columnDefinition = "int default 0")
    private int currentMonthAmount; // 지난 달의 총 사용 금액

    @NotNull
    @Size(max = 50000)
    @Column(name = "previous_month_amount", nullable = false, length = 50000, columnDefinition = "int default 0")
    private int previousMonthAmount; // 저저번 달 총 사용 금액

    // @ManyToOne
    // @JoinColumn(name = "card_History", nullable = false)
    // private CardHistoryEntity cardHistoryEntity;

    @ManyToOne
    @JoinColumn(name = "user_num", referencedColumnName = "user_num", nullable = false, foreignKey = @ForeignKey(name = "fk_badge_user_num"))
    private UserEntity userEntity;
}