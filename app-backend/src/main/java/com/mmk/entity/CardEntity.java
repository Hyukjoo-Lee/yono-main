package com.mmk.entity;

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
@SequenceGenerator(name = "card_seq_generator", sequenceName = "card_seq", initialValue = 1, allocationSize = 1)
@Table(name = "card")
public class CardEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "card_seq_generator")
    @Column(name = "card_id")
    private int cardId;

    @Column(name = "card_num")
    private String cardNum;

    @Column(name = "card_name_en")
    private String cardNameEn;

    @Column(name = "card_provider")
    private String cardProvider;

    @Column(name = "card_img_url")
    private String cardImgUrl;

    @Column(name = "is_primary")
    private int isPrimary;

    @Column(name = "expiry_date")
    private String expiryDate;

    @Column(name = "user_num")
    private int userNum;

    @CreationTimestamp
    private Timestamp createdAt;

    @UpdateTimestamp
    private Timestamp updatedAt;
}
