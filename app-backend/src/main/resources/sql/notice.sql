alter sequence notice_seq
nocache;

SELECT notice_seq.NEXTVAL FROM DUAL;

select * from notice;

commit;

drop table notice;

purge table notice; 

purge RECYCLEBIN;

insert into notice (notice_no, content, CREATED_AT, IMG_URL, TITLE, UPDATED_AT, VIEW_COUNT, USER_NUM)
VALUES (NOTICE_SEQ.nextval, '공지사항', sysdate, 'asdf', '제목', sysdate, 0, 1);