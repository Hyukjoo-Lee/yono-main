create sequence user_seq
start with 1
increment by 1
nocycle
nocache;

alter sequence user_seq
nocache;

select * from user_info;

insert into user_info (user_num, user_id, name, email,  password, spending_target, created_at, updated_at) 
values (user_seq.nextval, 'crtestid', '김채림', 'cr@google.com', '1234', 500000, sysdate, sysdate);

insert into user_info (user_num, user_id, name, email, password,  spending_target, created_at, updated_at) 
values (user_seq.nextval, 'hjtestid', '이혁주', 'hj@google.com', '1234', 500000, sysdate, sysdate);

insert into user_info (user_num, user_id, name, email, password,  spending_target, created_at, updated_at) 
values (user_seq.nextval, 'mktestid', '허민경', 'mk@google.com', '1234', 500000, sysdate, sysdate);

insert into user_info (user_num, user_id, name, email, password,  spending_target, created_at, updated_at) 
values (user_seq.nextval, 'jhtestid', '김지훈', 'lizars4024@gmail.com', '1234',  50000, sysdate, sysdate);

insert into user_info (user_num, user_id, name, email, password,  spending_target, created_at, updated_at) 
values (user_seq.nextval, 'jetestid', '박지은', 'je@google.com', '1234',  500000, sysdate, sysdate);

insert into user_info (user_num, user_id, name, email, password,  spending_target, created_at, updated_at) 
values (user_seq.nextval, 'hongid', '홍길동구리', 'hong@google.com', '1234',  500000, sysdate, sysdate);

insert into user_info (user_num, user_id, name, email, password,  spending_target, created_at, updated_at) 
values (user_seq.nextval, 'leeid', '이순신', 'lee@google.com', '1234', 500000, sysdate, sysdate);

commit;

select * from user_info where email = 'mk@google.com';

drop table user_info;

delete from user_info where name = '김지훈';

update user_info set name = '홍길동구리' where user_num = 37;
update user_info set state = 1, USER_ROLE = 0 where user_num = 1; -- ADMIN / USER 직관적이게 수정
