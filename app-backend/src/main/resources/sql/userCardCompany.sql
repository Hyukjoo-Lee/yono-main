select * from user_card_company;
drop sequence card_company_seq;

delete from USER_CARD_COMPANY where user_num = 4;
commit;