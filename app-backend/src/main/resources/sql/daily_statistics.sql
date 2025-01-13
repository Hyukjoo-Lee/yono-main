alter sequence daily_statistics_seq
nocache;

SELECT daily_statistics_seq.NEXTVAL FROM DUAL;

select * from daily_statistics;
drop table daily_statistics;

DROP SEQUENCE daily_statistics_seq;

INSERT INTO daily_statistics (daily_id, user_id, daily_date, daily_target, card_image, card_name, store, category, amount, created_at)
VALUES (daily_statistics_seq.nextval, 'je_ID', '2025-01-01', 80000, '/images/hyundai-m1.png', 'KB국민 My WE:SH카드', '88맥주집', '식비', 30000, CURRENT_TIMESTAMP);
INSERT INTO daily_statistics (daily_id, user_id, daily_date, daily_target, card_image, card_name, store, category, amount, created_at)
VALUES (daily_statistics_seq.nextval, 'je_ID', '2025-01-01', 80000, '/images/kb-my1.png', 'KB국민 My WE:SH카드', '88맥주집', '식비', 50000, CURRENT_TIMESTAMP);
INSERT INTO daily_statistics (daily_id, user_id, daily_date, daily_target, card_image, card_name, store, category, amount, created_at)
VALUES (daily_statistics_seq.nextval, 'je_ID', '2025-01-01', 80000, '/images/nh-byul1.png', 'KB국민 My WE:SH카드', '88맥주집', '식비', 10000, CURRENT_TIMESTAMP);


UPDATE daily_statistics SET amount=2000 where daily_id=15;

INSERT INTO daily_statistics (daily_id, user_id, daily_date, daily_target, card_image, card_name, store, category, amount, created_at)
VALUES (daily_statistics_seq.nextval, 'je_ID', '2025-01-02', 80000, '/images/samsung-id1.png', 'KB국민 My WE:SH카드', '88맥주집', '식비', 5000, CURRENT_TIMESTAMP);
INSERT INTO daily_statistics (daily_id, user_id, daily_date, daily_target, card_image, card_name, store, category, amount, created_at)
VALUES (daily_statistics_seq.nextval, 'je_ID', '2025-01-02', 80000, '/images/shinhan-first1.png', 'KB국민 My WE:SH카드', '88맥주집', '식비', 20000, CURRENT_TIMESTAMP);
INSERT INTO daily_statistics (daily_id, user_id, daily_date, daily_target, card_image, card_name, store, category, amount, created_at)
VALUES (daily_statistics_seq.nextval, 'je_ID', '2025-01-02', 80000, '/images/hyundai-m1.png', 'KB국민 My WE:SH카드', '88맥주집', '식비', 10000, CURRENT_TIMESTAMP);


INSERT INTO daily_statistics (daily_id, user_id, daily_date, daily_target, card_image, card_name, store, category, amount, created_at)
VALUES (daily_statistics_seq.nextval, 'je_ID', '2025-01-03', 80000, '/images/shinhan-first1.png', 'KB국민 My WE:SH카드', '88맥주집', '식비', 500, CURRENT_TIMESTAMP);
INSERT INTO daily_statistics (daily_id, user_id, daily_date, daily_target, card_image, card_name, store, category, amount, created_at)
VALUES (daily_statistics_seq.nextval, 'je_ID', '2025-01-03', 80000, '/images/hyundai-m1.png', 'KB국민 My WE:SH카드', '88맥주집', '식비', 200, CURRENT_TIMESTAMP);
INSERT INTO daily_statistics (daily_id, user_id, daily_date, daily_target, card_image, card_name, store, category, amount, created_at)
VALUES (daily_statistics_seq.nextval, 'je_ID', '2025-01-03', 80000, '/images/kb-my1.png', 'KB국민 My WE:SH카드', '88맥주집', '식비', 1000, CURRENT_TIMESTAMP);

INSERT INTO daily_statistics (daily_id, user_id, daily_date, daily_target, card_image, card_name, store, category, amount, created_at)
VALUES (daily_statistics_seq.nextval, 'je_ID', '2025-01-04', 80000, '/images/shinhan-first1.png', 'KB국민 My WE:SH카드', '88맥주집', '식비', 50000, CURRENT_TIMESTAMP);
INSERT INTO daily_statistics (daily_id, user_id, daily_date, daily_target, card_image, card_name, store, category, amount, created_at)
VALUES (daily_statistics_seq.nextval, 'je_ID', '2025-01-04', 80000, '/images/hyundai-m1.png', 'KB국민 My WE:SH카드', '88맥주집', '식비', 20000, CURRENT_TIMESTAMP);
INSERT INTO daily_statistics (daily_id, user_id, daily_date, daily_target, card_image, card_name, store, category, amount, created_at)
VALUES (daily_statistics_seq.nextval, 'je_ID', '2025-01-04', 80000, '/images/kb-my1.png', 'KB국민 My WE:SH카드', '88맥주집', '식비', 85000, CURRENT_TIMESTAMP);
INSERT INTO daily_statistics (daily_id, user_id, daily_date, daily_target, card_image, card_name, store, category, amount, created_at)
VALUES (daily_statistics_seq.nextval, 'je_ID', '2025-01-04', 80000, '/images/kb-my1.png', 'KB국민 My WE:SH카드', '88맥주집', '식비', 800, CURRENT_TIMESTAMP);
INSERT INTO daily_statistics (daily_id, user_id, daily_date, daily_target, card_image, card_name, store, category, amount, created_at)
VALUES (daily_statistics_seq.nextval, 'je_ID', '2025-01-04', 80000, '/images/kb-my1.png', 'KB국민 My WE:SH카드', '88맥주집', '식비', 2000, CURRENT_TIMESTAMP);

commit;

