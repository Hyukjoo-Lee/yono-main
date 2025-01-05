package com.mmk.entity;

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
@SequenceGenerator(name = "trans_seq_generator", sequenceName = "trans_seq", initialValue = 1, allocationSize = 1)
@Table(name = "transaction")
public class TransEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "trans_seq_generator")
    @Column(name = "card_num")
    private int cardNum;

    @Column(name = "user_num")
    private int userNum;

    @Column(name = "used_date")
    private String usedDate;

    @Column(name = "used_time")
    private String usedTime;

    @Column(name = "card_name")
    private String cardName;

    @Column(name = "store_name")
    private String storeName;

    @Column(name = "used_amount")
    private String usedAmount;

    @Column(name = "paymentType")
    private String paymentType; // 결제 방법 1: 일시불, 2: 할부, 3: 그 외

    @Column(name = "storeType")
    private String storeType; // 가맹점 업종
}
