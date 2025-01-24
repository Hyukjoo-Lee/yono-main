alter sequence notice_seq
nocache;

SELECT notice_seq.NEXTVAL FROM DUAL;

select * from notice;

commit;

drop table notice;

purge table notice;

purge RECYCLEBIN;