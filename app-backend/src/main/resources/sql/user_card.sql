select * from user_card;
drop table user_card;
commit;

INSERT INTO user_card (USER_CARD_ID, USER_CARD_COMPANY_ID, USER_CARD_COMPANY_PWD, CREATED_AT, EXPIRY_DATE, PRIMARY_CARD, UPDATED_AT, USER_CARD_NUM, USER_NAME, CARD_ID, USER_NUM)
VALUES (user_card_seq.nextval, 'playwithme31', 'test!!8520',  CURRENT_TIMESTAMP, '유효기간', 0,  CURRENT_TIMESTAMP, '4481258123549143', '하나체크크카드', 6, 1);