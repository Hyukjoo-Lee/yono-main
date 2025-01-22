alter sequence badge_seq
nocache;

SELECT badge_seq.NEXTVAL FROM DUAL;


select * from badge;
drop table badge;
DROP SEQUENCE badge_seq;

INSERT INTO badge (badge_num, badge_date, badge, user_num)
VALUES (badge_seq.nextval, '202501', 30000 , 6);
INSERT INTO badge (badge_num, badge_date, badge, user_num)
VALUES (badge_seq.nextval, '202501', 50000 , 7);
INSERT INTO badge (badge_num, badge_date, badge, user_num)
VALUES (badge_seq.nextval, '202501', 20000 , 8);
INSERT INTO badge (badge_num, badge_date, badge, user_num)
VALUES (badge_seq.nextval, '202501', 10000 , 9);
INSERT INTO badge (badge_num, badge_date, badge, user_num)
VALUES (badge_seq.nextval, '202501', 25000 , 10);
INSERT INTO badge (badge_num, badge_date, badge, user_num)
VALUES (badge_seq.nextval, '202501', 25000 , 13);
INSERT INTO badge (badge_num, badge_date, badge, user_num)
VALUES (badge_seq.nextval, '202501', 50000 , 14);


COMMIT;
update badge set badge = 25000 where user_num = 61;


alter sequence ranking_seq
nocache;

SELECT ranking_seq.NEXTVAL FROM DUAL;

select * from ranking;
drop table ranking;
TRUNCATE TABLE ranking; 
DROP SEQUENCE ranking_seq;

INSERT INTO ranking (ranking_num, badge_num, ranking_position, user_num)
VALUES (ranking_seq.nextval, 7, 2, 6);
INSERT INTO ranking (ranking_num, badge_num, ranking_position, user_num)
VALUES (ranking_seq.nextval, 8, 1, 7);
INSERT INTO ranking (ranking_num, badge_num, ranking_position, user_num)
VALUES (ranking_seq.nextval, 9, 4, 8);
INSERT INTO ranking (ranking_num, badge_num, ranking_position, user_num)
VALUES (ranking_seq.nextval, 10, 5, 9);
INSERT INTO ranking (ranking_num, badge_num, ranking_position, user_num)
VALUES (ranking_seq.nextval, 11, 3, 10);
COMMIT;


MERGE INTO ranking r
USING (
    SELECT 
        b.badge_num,
        b.user_num,
        b.badge,
        DENSE_RANK()  OVER (ORDER BY b.badge DESC) AS ranking_position
    FROM badge b
) rb
ON (r.badge_num = rb.badge_num)
WHEN MATCHED THEN
    UPDATE SET r.ranking_position = rb.ranking_position
WHEN NOT MATCHED THEN
    INSERT (ranking_num, badge_num, user_num, ranking_position)
    VALUES (ranking_seq.nextval, rb.badge_num, rb.user_num, rb.ranking_position);