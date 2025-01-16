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
@SequenceGenerator(name = "cardCompany_seq_generator", sequenceName = "cardCompany_seq", initialValue = 1, allocationSize = 1)
@Table(name = "card_Company")
public class CardCompanyEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "cardCompany_seq_generator")
    @Column(name = "card_Company_Num")
    private int cardCompanyNum;

    @Column(name = "userNum", nullable = false)
    private int userNum;

    @Column(name = "organization", nullable = false)
    private String organization;

    @Column(name = "company_Id", nullable = false)
    private String companyId;

    @Column(name = "company_pwd", nullable = false)
    private String companyPwd;
}   
