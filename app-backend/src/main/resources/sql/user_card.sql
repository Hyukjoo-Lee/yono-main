select * from user_card;
drop table user_card;
commit;

INSERT INTO user_card (USER_CARD_ID, USER_CARD_COMPANY_ID, USER_CARD_COMPANY_PWD, CREATED_AT, EXPIRY_DATE, PRIMARY_CARD, UPDATED_AT, card_pwd, USER_CARD_NUM, USER_NAME, CARD_ID, USER_NUM)
VALUES (user_card_seq.nextval, '카드사 아이디', '카드사 비밀번호',  CURRENT_TIMESTAMP, '유효기간', 0,  CURRENT_TIMESTAMP, '카드비밀번호', '카드번호', '하나체크카드', 6, 1);
