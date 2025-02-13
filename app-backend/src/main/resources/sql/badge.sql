select * from badge;
drop table badge;


INSERT INTO badge (badge_num, badge, badge_date, current_month_amount, previous_month_amount, ranking, user_num)
VALUES (badge_seq.nextval, 10, '202501', 900,000, 1,000,000, 5, 40); 

INSERT INTO badge (badge_num, badge, badge_date, current_month_amount, previous_month_amount, ranking, user_num)
VALUES (badge_seq.nextval, 30, '202501', 350,000, 500,000, 4, 41); 

INSERT INTO badge (badge_num, badge, badge_date, current_month_amount, previous_month_amount, ranking, user_num)
VALUES (badge_seq.nextval, 1,764, '202501', 700,000, 850,000, 3, 42); 


INSERT INTO badge (badge_num, badge, badge_date, current_month_amount, previous_month_amount, ranking, user_num)
VALUES (badge_seq.nextval, 3,478, '202501', 600,000 ,920,000, 2, 43); 


INSERT INTO badge (badge_num, badge, badge_date, current_month_amount, previous_month_amount, ranking, user_num)
VALUES (badge_seq.nextval, 3,888, '202501', 1,100,000, 1,800,000, 1, 44); 
