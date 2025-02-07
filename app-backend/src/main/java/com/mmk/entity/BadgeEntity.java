package com.mmk.entity;

import org.hibernate.annotations.ColumnDefault;

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
    @ColumnDefault("0")
    @Column(name = "badge", nullable = false)
    private int badge = 0; // 12 -> 뱃지 갯수

    @NotNull
    @Column(name = "ranking", nullable = false)
    private int ranking; // 랭킹 순위

    @NotNull
    @ColumnDefault("0")
    @Column(name = "current_month_amount", nullable = false)
    private int currentMonthAmount = 0; // 지난 달의 총 사용 금액

    @NotNull
    @ColumnDefault("0")
    @Column(name = "previous_month_amount", nullable = false)
    private int previousMonthAmount = 0; // 저저번 달 총 사용 금액

    @ManyToOne
    @JoinColumn(name = "user_num", referencedColumnName = "user_num", nullable = false, foreignKey = @ForeignKey(name = "fk_badge_user_num"))
    private UserEntity userEntity;
}
