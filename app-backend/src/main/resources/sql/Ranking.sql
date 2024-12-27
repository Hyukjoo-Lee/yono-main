alter sequence ranking_seq
nocache;

SELECT ranking_seq.NEXTVAL FROM DUAL;


select * from ranking;
drop table ranking;
DROP SEQUENCE ranking_seq;


INSERT INTO ranking (ranking_id, ranking_position, user_name, user_id, total_badges, ranking_month, ranking_img_url, created_at, updated_at)
VALUES (user_seq.nextval, 3, '김지훈', 'jh_ID', 65000, '2024-12', '/images/image1.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO ranking (ranking_id, ranking_position, user_name, user_id, total_badges, ranking_month, ranking_img_url, created_at, updated_at)
VALUES (user_seq.nextval, 5, '박지은', 'je_ID', 30000, '2024-12', '/images/image2.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO ranking (ranking_id, ranking_position, user_name, user_id, total_badges, ranking_month, ranking_img_url, created_at, updated_at)
VALUES (user_seq.nextval, 1, '김채림', 'cr_ID', 70000, '2024-12', '/images/image3.png', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO ranking (ranking_id, ranking_position, user_name, user_id, total_badges, ranking_month, ranking_img_url, created_at, updated_at)
VALUES (user_seq.nextval, 4, '이혁주', 'hj_ID', 40000, '2024-12', '/images/image4.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO ranking (ranking_id, ranking_position, user_name, user_id, total_badges, ranking_month, ranking_img_url, created_at, updated_at)
VALUES (user_seq.nextval, 2, '허민경', 'mk_ID', 67000, '2024-12', '/images/image5.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO ranking (ranking_id, ranking_position, user_name, user_id, total_badges, ranking_month, ranking_img_url, created_at, updated_at)
VALUES (user_seq.nextval, 6, '홍길동', 'kd_ID', 20000, '2024-12', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO ranking (ranking_id, ranking_position, user_name, user_id, total_badges, ranking_month, ranking_img_url, created_at, updated_at)
VALUES (user_seq.nextval, 7, '수지', 'sj_ID', 10000, '2024-12', '/images/image2.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO ranking (ranking_id, ranking_position, user_name, user_id, total_badges, ranking_month, ranking_img_url, created_at, updated_at)
VALUES (user_seq.nextval, 8, '아이유', 'iu_ID', 5000, '2024-12', '/images/image3.png', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO ranking (ranking_id, ranking_position, user_name, user_id, total_badges, ranking_month, ranking_img_url, created_at, updated_at)
VALUES (user_seq.nextval, 9, '김석진', 'sj_ID', 700, '2024-12', '/images/image4.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

UPDATE ranking SET total_badges=67000 where user_id='mk_ID';


COMMIT;