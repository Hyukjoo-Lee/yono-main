create sequence reply_seq
start with 1
increment by 1
nocycle
nocache;

alter sequence reply_seq
nocache;

alter table tbl_posts add imgurl VARCHAR2(500);

select * from tbl_reply;
commit;

drop table tbl_reply;


