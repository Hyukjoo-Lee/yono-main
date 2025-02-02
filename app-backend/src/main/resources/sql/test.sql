commit;

select * from card;
select * from CARD_COMPANY;
select * from user_card;
select * from USER_INFO;
SELECT * from card_benefit;


drop table card; -- 6
drop table card_company; --- 5
drop table user_card; -- 3
drop table user_info; -- 4
drop table card_benefit; -- 1
drop table card_history; -- 2
drop table tbl_posts; -- 7
drop table tbl_reply; -- 8

insert into user_info (user_num, user_id, name, profile, email, password,  address, detail_Address, postcode, spending_target, created_at, updated_at) 
values (user_seq.nextval, 'hjtestid', '이혁주', '/images/image2.jpg', 'hj@google.com', '1234', '서울시 용산구', '1415호', '11111', 500000, sysdate, sysdate);

insert into user_info (user_num, user_id, name, profile, email, password, address, detail_Address, postcode, spending_target, created_at, updated_at) 
values (user_seq.nextval, 'jhtestid', '김지훈', '/images/image3.jpg', 'lizars4024@gmail.com', '1234', '서울시 용산구', '1415호', '11111', 500000, sysdate, sysdate);

insert into user_info (user_num, user_id, name, profile, email, password, address, detail_Address, postcode, spending_target, created_at, updated_at) 
values (user_seq.nextval, 'jetestid', '박지은', '/images/image3.jpg', 'je@google.com', '1234', '서울시 용산구', '1415호', '11111', 500000, sysdate, sysdate);

create sequence cardCompany_seq
start with 1
increment by 1
nocycle
nocache;

select * from card_company;

drop table card_company;
delete from CARD_COMPANY where user_num = 1;

commit;


insert into card_company (CARD_COMPANY.CARD_COMPANY_NUM, user_num, company_id, company_pwd, CARD_COMPANY.CONNECTED_ID, organization) 
values (cardCompany_seq.nextval, '1', 'BIGIE2', '*As89117465', 'aIrIVPH3kPh95dvn6AkgKR', '0304');