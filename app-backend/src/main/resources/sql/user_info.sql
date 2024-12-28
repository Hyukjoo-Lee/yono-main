create sequence user_seq
start with 1
increment by 1
nocycle
nocache;

alter sequence user_seq
nocache;

select * from user_info;

insert into user_info (user_num, user_id, name, profile, email,  password,  address,  spending_target, created_at, updated_at) 
values (user_seq.nextval, 'crtestid', '김채림', '/images/image1.jpg', 'cr@google.com', '1234','집', 500000, sysdate, sysdate);

insert into user_info (user_num, user_id, name, profile, email, password,  address,  spending_target, created_at, updated_at) 
values (user_seq.nextval, 'hjtestid', '이혁주', '/images/image2.jpg', 'hj@google.com', '1234','집', 500000, sysdate, sysdate);

insert into user_info (user_num, user_id, name, profile, email, password, address,  spending_target, created_at, updated_at) 
values (user_seq.nextval, 'mktestid', '허민경', '/images/image3.jpg', 'mk@google.com', '1234','집', 500000, sysdate, sysdate);

insert into user_info (user_num, user_id, name, profile, email,  password, address,  spending_target, created_at, updated_at) 
values (user_seq.nextval, 'hktestid', '이현경', '/images/image4.jpg', 'hk@google.com','1234', '집', 500000, sysdate, sysdate);

commit;
select * from user_info where email = 'hk@google.com';

drop table user_info;

update user_info set profile = '/images/image1.jpg' where user_num = 41;