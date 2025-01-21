-- KB국민 My WE:SH 카드 
INSERT INTO card (CARD_ID, CARD_TITLE, CARD_PROVIDER, ORGANIZATION_CODE, CARD_IMG_URL, CREATED_AT, UPDATED_AT)
VALUES (CARD_SEQ.nextval, 'KB국민 My WE:SH 카드', '국민', '0301', '/images/cards/kb/kb-my1.png', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- 현대카드 M카드 
INSERT INTO card (CARD_ID, CARD_TITLE, CARD_PROVIDER, ORGANIZATION_CODE, CARD_IMG_URL, CREATED_AT, UPDATED_AT)
VALUES (CARD_SEQ.nextval, '현대 M카드', '현대', '0302', '/images/cards/hyundai/hyundai-m1.png', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- 삼성카드 iD SIMPLE
INSERT INTO card (CARD_ID, CARD_TITLE, CARD_PROVIDER, ORGANIZATION_CODE, CARD_IMG_URL, CREATED_AT, UPDATED_AT)
VALUES (CARD_SEQ.nextval, '삼성 iD SIMPLE카드', '삼성', '0303', '/images/cards/samsung/samsung-id1.png', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- 농협 별다줄카드
INSERT INTO card (CARD_ID, CARD_TITLE, CARD_PROVIDER, ORGANIZATION_CODE, CARD_IMG_URL, CREATED_AT, UPDATED_AT)
VALUES (CARD_SEQ.nextval, '농협 별다줄카드', '농협', '0304', '/images/cards/nh/nh-byul1.png', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- 신한 처음카드
INSERT INTO card (CARD_ID, CARD_TITLE, CARD_PROVIDER, ORGANIZATION_CODE, CARD_IMG_URL, CREATED_AT, UPDATED_AT)
VALUES (CARD_SEQ.nextval, '신한 처음카드', '신한', '0306', '/images/cards/shinhan/shinhan-first1.png', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- 하나 알뜰카드
INSERT INTO card (CARD_ID, CARD_TITLE, CARD_PROVIDER, ORGANIZATION_CODE, CARD_IMG_URL, CREATED_AT, UPDATED_AT)
VALUES (CARD_SEQ.nextval, '하나 알뜰카드', '하나', '0313', '/images/cards/shinhan/shinhan-first1.png', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

drop table card;
commit;

drop table user_card;

select * from user_card;
select * from card;