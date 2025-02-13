create sequence posts_seq
start with 1
increment by 1
nocycle
nocache;

alter sequence post
nocache;

alter table post add imgurl VARCHAR2(500);

select * from post;




drop table post;