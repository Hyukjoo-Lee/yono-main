select * from user_card;
commit;
drop table user_card;

delete from USER_CARD where USER_CARD_ID = 40;

INSERT INTO user_card (USER_CARD_ID, CARD_PWD, USER_CARD_COMPANY_ID, USER_CARD_COMPANY_PWD, CREATED_AT, EXPIRY_DATE, PRIMARY_CARD, UPDATED_AT, USER_CARD_NUM, USER_NAME, CARD_ID, USER_NUM)
VALUES (user_card_seq.nextval, '카드비밀번호', '카드사아이디', '카드사비밀번호',  CURRENT_TIMESTAMP, '유효기간', 0,  CURRENT_TIMESTAMP, '카드번호', '현대신용카드', 7, 77);

update user_card set primary_card = 0 where user_num = 117;