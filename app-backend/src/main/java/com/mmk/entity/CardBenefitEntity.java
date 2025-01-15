package com.mmk.entity;

import java.security.Timestamp;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
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
@SequenceGenerator(name = "card_benefit_seq_generator", sequenceName = "card_benefit_seq", initialValue = 1, allocationSize = 1)
@Table(name = "card_benefit")
public class CardBenefitEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "card_benefit_seq_generator")
    @Column(name = "benefit_id")
    private int benefitId;

    @Column(name = "benefit_title", nullable = false)
    private String benefitTitle;

    @Column(name = "benefit_types", nullable = false)
    private String businessTypes;

    @CreationTimestamp
    private Timestamp createdAt;

    @UpdateTimestamp
    private Timestamp updatedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "card_id", referencedColumnName = "card_id", nullable = false)
    private int cardId;
}
