package com.mmk.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
@Table(name = "card_history", indexes = {
        @Index(name = "idx_user_card_and_date", columnList = "user_card_Id, resUsedDate"),
        @Index(name = "idx_user_card", columnList = "user_card_Id")
})
public class CardHistoryEntity {

    @Id
    @Size(max = 20)
    @Column(name = "resApprovalNo", nullable = false, length = 20)
    private String resApprovalNo; // 승인번호

    @NotNull
    @Size(max = 8)
    @Column(name = "resUsedDate", nullable = false, length = 8)
    private String resUsedDate; // 사용 날짜

    @NotNull
    @Size(max = 6)
    @Column(name = "resUsedTime", nullable = false, length = 6)
    private String resUsedTime; // 사용 일시

    @NotNull
    @Size(max = 50)
    @Column(name = "resMemberStoreName", nullable = false, length = 50)
    private String resMemberStoreName; // 가맹점명

    @NotNull
    @Size(max = 50)
    @Column(name = "resUsedAmount", nullable = false, length = 50)
    private String resUsedAmount; // 이용금액

    @NotNull
    @Size(max = 20)
    @Column(name = "resMemberStoreType", nullable = false, length = 20)
    private String resMemberStoreType; // 가맹점 업종

    @ManyToOne
    @JoinColumn(name = "user_card_id", referencedColumnName = "user_card_id", nullable = false, foreignKey = @ForeignKey(name = "fk_card_history_user_card_id"))
    private UserCardEntity userCardEntity;

}
