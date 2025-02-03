select * from card_company;
drop sequence user_card_company_seq;

delete from CARD_COMPANY where user_num = 5;
commit;