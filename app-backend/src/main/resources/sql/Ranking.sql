alter sequence badge_seq
nocache;

SELECT badge_seq.NEXTVAL FROM DUAL;


select * from badge;
drop table badge;
DROP SEQUENCE badge_seq;

INSERT INTO badge (badge_num, badge_date, badge, user_num)
VALUES (badge_seq.nextval, '202501', 30000 , 1);
INSERT INTO badge (badge_num, badge_date, badge, user_num)
VALUES (badge_seq.nextval, '202501', 50000 , 2);
INSERT INTO badge (badge_num, badge_date, badge, user_num)
VALUES (badge_seq.nextval, '202501', 20000 , 3);
INSERT INTO badge (badge_num, badge_date, badge, user_num)
VALUES (badge_seq.nextval, '202501', 10000 , 4);
INSERT INTO badge (badge_num, badge_date, badge, user_num)
VALUES (badge_seq.nextval, '202501', 25000 , 5);

COMMIT;
update badge set badge = 25000 where user_num = 61;


alter sequence ranking_seq
nocache;

SELECT ranking_seq.NEXTVAL FROM DUAL;

select * from ranking;
drop table ranking;
TRUNCATE TABLE ranking; 
DROP SEQUENCE ranking_seq;

INSERT INTO ranking (ranking_num, badge_num, ranking_position)
VALUES (ranking_seq.nextval, 1, 2);
INSERT INTO ranking (ranking_num, badge_num, ranking_position)
VALUES (ranking_seq.nextval, 2, 1);
INSERT INTO ranking (ranking_num, badge_num, ranking_position)
VALUES (ranking_seq.nextval, 3, 4);
INSERT INTO ranking (ranking_num, badge_num, ranking_position)
VALUES (ranking_seq.nextval, 4, 5);
INSERT INTO ranking (ranking_num, badge_num, ranking_position)
VALUES (ranking_seq.nextval, 5, 3);
COMMIT;