select * from user_card;
drop table user_card;
commit;

INSERT INTO user_card (USER_CARD_ID, USER_CARD_COMPANY_ID, USER_CARD_COMPANY_PWD, CREATED_AT, EXPIRY_DATE, PRIMARY_CARD, UPDATED_AT, USER_CARD_NUM, USER_NAME, CARD_ID, USER_NUM)
VALUES (user_card_seq.nextval, 'wlgns4024', 'zhfmzm0908!',  CURRENT_TIMESTAMP, '0627', 0,  CURRENT_TIMESTAMP, '4890160181422418', '현대신용카드', 7, 77);