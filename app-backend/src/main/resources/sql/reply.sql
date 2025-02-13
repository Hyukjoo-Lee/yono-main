create sequence reply_seq
start with 1
increment by 1
nocycle
nocache;

alter sequence reply_seq
nocache;

alter table tbl_posts add imgurl VARCHAR2(500);

select * from reply;
commit;

drop table reply;

select * from tbl_posts;



SELECT constraint_name, table_name
FROM all_constraints
WHERE constraint_type = 'R' -- 외래 키 제약 조건만 조회
AND r_constraint_name IN (
SELECT constraint_name
FROM all_constraints
WHERE table_name = 'TBL_REPLY' AND owner = 'MMK' -- 스키마 이름은 문자열로 입력
);



SELECT USER FROM DUAL;

drop table REPLY_ENTITY_LIKED_BY_USERS;
drop table REPLY_ENTITY_user_likes;


