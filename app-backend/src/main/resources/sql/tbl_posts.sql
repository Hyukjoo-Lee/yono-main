create sequence posts_seq
start with 1
increment by 1
nocycle
nocache;

alter sequence posts_seq
nocache;

alter table tbl_posts add imgurl VARCHAR2(500);

select * from tbl_posts;




drop table tbl_posts;