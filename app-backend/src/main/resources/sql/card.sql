-- KB국민 My WE:SH 카드 
INSERT INTO card (CARD_ID, CARD_TITLE, CARD_PROVIDER, ORGANIZATION_CODE, CARD_IMG_URL, CREATED_AT, UPDATED_AT)
VALUES (CARD_SEQ.nextval, 'KB국민 My WE:SH 카드', 'kb', '0301', '/images/cards/kb/kb-my/kb-my1.png', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- 현대카드 M카드 
INSERT INTO card (CARD_ID, CARD_TITLE, CARD_PROVIDER, ORGANIZATION_CODE, CARD_IMG_URL, CREATED_AT, UPDATED_AT)
VALUES (CARD_SEQ.nextval, '현대 M카드', 'hyundai', '0302', '/images/cards/hyundai/hyundai-m/hyundai-m1.png', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- 삼성카드 iD SIMPLE
INSERT INTO card (CARD_ID, CARD_TITLE, CARD_PROVIDER, ORGANIZATION_CODE, CARD_IMG_URL, CREATED_AT, UPDATED_AT)
VALUES (CARD_SEQ.nextval, '삼성 iD SIMPLE카드', 'samsung', '0303', '/images/cards/samsung/samsung-id/samsung-id1.png', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- 농협 별다줄카드
INSERT INTO card (CARD_ID, CARD_TITLE, CARD_PROVIDER, ORGANIZATION_CODE, CARD_IMG_URL, CREATED_AT, UPDATED_AT)
VALUES (CARD_SEQ.nextval, '농협 별다줄카드', 'nh', '0304', '/images/cards/nh/nh-byul/nh-byul1.png', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- 신한 처음카드
INSERT INTO card (CARD_ID, CARD_TITLE, CARD_PROVIDER, ORGANIZATION_CODE, CARD_IMG_URL, CREATED_AT, UPDATED_AT)
VALUES (CARD_SEQ.nextval, '신한 처음카드', 'shinhan', '0306', '/images/cards/shinhan/shinhan-first/shinhan-first1.png', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- 하나 알뜰카드
INSERT INTO card (CARD_ID, CARD_TITLE, CARD_PROVIDER, ORGANIZATION_CODE, CARD_IMG_URL, CREATED_AT, UPDATED_AT)
VALUES (CARD_SEQ.nextval, '하나 알뜰카드', 'hana', '0313', '/images/cards/hana/hana-kpass/hana-kpass1.png', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO card (CARD_ID, CARD_TITLE, CARD_PROVIDER, ORGANIZATION_CODE, CARD_IMG_URL, CREATED_AT, UPDATED_AT)
VALUES (CARD_SEQ.nextval, '국민내일배움카드(체크)', 'nh', '0304', '/images/cards/nh/nh-bright-tmr/nh-bright-tmr1.png', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO card (CARD_ID, CARD_TITLE, CARD_PROVIDER, ORGANIZATION_CODE, CARD_IMG_URL, CREATED_AT, UPDATED_AT)
VALUES (CARD_SEQ.nextval, '올바른POINT체크', 'nh', '0304', '/images/cards/nh/nh-honest/nh-honest1.png', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO card (CARD_ID, CARD_TITLE, CARD_PROVIDER, ORGANIZATION_CODE, CARD_IMG_URL, CREATED_AT, UPDATED_AT)
VALUES (CARD_SEQ.nextval, '현대카드 ZERO Edition2(할인형)', 'hyundai', '0302', '/images/cards/hyundai/hyundai-zero/hyundai-zero1.png', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

drop table card;
commit;

drop table user_card;

select * from user_card;
select * from card;