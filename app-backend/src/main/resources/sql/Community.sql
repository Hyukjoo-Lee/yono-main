create sequence community_seq
start with 1
increment by 1
nocycle
nocache;

alter sequence community_seq
nocache;

select community_seq.nextval from dual;

select * from community;

commit;