package com.mmk.entity;

import java.sql.Timestamp;

import org.hibernate.annotations.CreationTimestamp;

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

@Getter
@Setter
@ToString
@Entity
@SequenceGenerator(
        name = "no_seq_geDailyStatistics",
        sequenceName = "daily_statistics_seq",
        initialValue = 1,
        allocationSize = 1
)
@Table(name = "daily_statistics")
public class DailyStatisticsEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "no_seq_geDailyStatistics")
    @Column(name = "daily_id", nullable = false)
    private int dailyId;

    @Column(name = "user_id", nullable = false)
    private String userId;

    @Column(name = "daily_date", nullable = false)
    private String dailyDate;

    @Column(name = "daily_target", nullable = false)
    private int dailyTarget;

    @Column(name = "card_image", nullable = false)
    private String cardImage;

    @Column(name = "card_name", nullable = false)
    private String cardName;

    @Column(name = "store", nullable = false)
    private String store;

    @Column(name = "category", nullable = false)
    private String category;

    @Column(name = "amount", nullable = false)
    private int amount;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false)
    private Timestamp createdAt;
}
