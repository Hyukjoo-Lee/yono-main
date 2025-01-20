create sequence notice_seq
start with 1
increment by 1
nocycle
nocache;

alter sequence notice_seq
nocache;

alter table tbl_notice;

select * from tbl_notice;

drop table tbl_notice;