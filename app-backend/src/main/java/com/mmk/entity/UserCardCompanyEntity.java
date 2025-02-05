package com.mmk.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
@SequenceGenerator(name = "user_card_company_seq_generator", sequenceName = "user_card_company_seq", initialValue = 1, allocationSize = 1)
@Table(name = "user_card_company")
public class UserCardCompanyEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_card_company_seq_generator")
    @Column(name = "card_company_num")
    private int cardCompanyNum;

    @Size(min = 4, max = 4, message = "기관 코드는 정확히 4자리여야 합니다.")
    @Column(name = "organization_code", nullable = false, length = 4)
    private String organizationCode;

    @NotNull
    @Size(max = 50)
    @Column(name = "company_id", nullable = false, length = 50)
    private String companyId;

    @NotNull
    @Size(max = 255)
    @Column(name = "company_pwd", nullable = false, length = 255)
    private String companyPwd;

    @Size(max = 255)
    @Column(name = "connected_id", length = 255)
    private String connectedId;

    @Column(name = "user_num", nullable = false)
    private int userNum;
}