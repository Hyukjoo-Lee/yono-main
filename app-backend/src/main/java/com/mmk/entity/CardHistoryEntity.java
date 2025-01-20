package com.mmk.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
@Entity
@Table(name = "card_History")
public class CardHistoryEntity {
    
    @Id
    @Column(name = "resApprovalNo", nullable = false)
    private String resApprovalNo; // 승인번호

    @Column(name = "resUsedDate", nullable = false)
    private String resUsedDate; // 사용 날짜

    @Column(name = "resUsedTime", nullable = false)
    private String resUsedTime; // 사용 일시

    @Column(name = "resMemberStoreName", nullable = false)
    private String resMemberStoreName; // 가맹점명

    @Column(name = "resUsedAmount", nullable = false)
    private String resUsedAmount; // 이용금액

    @Column(name = "resMemberStoreType", nullable = false)
    private String resMemberStoreType; // 가맹점 업종

    @ManyToOne
    @JoinColumn(name = "user_card_Id", nullable = false)
    private UserCardEntity userCardEntity;
}
