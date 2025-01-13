drop SEQUENCE notice_seq;

create sequence notice_seq
start with 1
increment by 1
nocycle
nocache;

select * from notice;

alter table notice add imgurl VARCHAR2(500);
alter table notice drop column imgurl;
ALTER TABLE NOTICE MODIFY NOTICE_IMG_URL NULL;

insert into notice(notice_no,admin_id,created_at,notice_cont,notice_img_url,notice_title)
values (notice_seq.nextval,'관리자',CURRENT_TIMESTAMP,'공지사항 내용','사진','공시사항 제목');
insert into notice(notice_no,admin_id,created_at,notice_cont,notice_img_url,notice_title)
values (notice_seq.nextval,'관리자',CURRENT_TIMESTAMP,'공지사항 내용2','사진','공시사항 제목2');
insert into notice(notice_no,admin_id,created_at,notice_cont,notice_img_url,notice_title)
values (notice_seq.nextval,'관리자',CURRENT_TIMESTAMP,'공지사항 내용3',null,'공시사항 제목3');

commit;