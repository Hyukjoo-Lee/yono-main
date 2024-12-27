// package com.mmk.vo;

// import jakarta.persistence.Entity;
// import jakarta.persistence.GeneratedValue;
// import jakarta.persistence.GenerationType;
// import jakarta.persistence.Id;
// import jakarta.persistence.SequenceGenerator;
// import jakarta.persistence.Table;
// import lombok.Getter;
// import lombok.Setter;
// import lombok.ToString;

// @Setter
// @Getter
// @ToString
// @Entity
// @SequenceGenerator( // 시퀀스 생성기를 설정하는 애노테이션
//         name = "uno_seq_geranking", // 시퀀스 제너레이터 이름
//         sequenceName = "ranking_seq", // 시퀀스 이름
//         initialValue = 1, // 시작값
//         allocationSize = 1 // 1씩 증가값
// )
// @Table(name = "tbl_Ranking")
// public class RankingVO {

//     @Id
//     @GeneratedValue(strategy = GenerationType.SEQUENCE, // 사용할 전략을 시퀀스로 선택
//             generator = "uno_seq_geranking" // 시퀀스 생성기에 설정해 놓은 시퀀스 제너레이터 이름
//     )
//     private int uno;

//     private int ranking;

//     private String name;
//     private String id;
//     private int badge;

//     private String image;
// }
