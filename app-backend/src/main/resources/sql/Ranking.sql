commit;

update badge set ranking = 5 where badge_num = 26;

select * from badge;


INSERT INTO badge (badge_num, badge_date, badge, ranking, current_month_amount, previous_month_amount, user_num)
VALUES (badge_seq.nextval, '202501', 500, 4, 350000, 300000, (SELECT user_num FROM user_info WHERE user_id = 'crtestid'));

INSERT INTO badge (badge_num, badge_date, badge, ranking, current_month_amount, previous_month_amount, user_num)
VALUES (badge_seq.nextval, '202501', 1000, 1, 500000, 400000, (SELECT user_num FROM user_info WHERE user_id = 'hjtestid'));

INSERT INTO badge (badge_num, badge_date, badge, ranking, current_month_amount, previous_month_amount, user_num)
VALUES (badge_seq.nextval, '202501', 800, 2, 400000, 380000, (SELECT user_num FROM user_info WHERE user_id = 'mktestid'));

INSERT INTO badge (badge_num, badge_date, badge, ranking, current_month_amount, previous_month_amount, user_num)
VALUES (badge_seq.nextval, '202501', 400, 5, 200000, 380000, (SELECT user_num FROM user_info WHERE user_id = 'jhtestid'));

INSERT INTO badge (badge_num, badge_date, badge, ranking, current_month_amount, previous_month_amount, user_num)
VALUES (badge_seq.nextval, '202501', 650, 3, 380000, 190000, (SELECT user_num FROM user_info WHERE user_id = 'jetestid'));

INSERT INTO badge (badge_num, badge_date, badge, ranking, current_month_amount, previous_month_amount, user_num)
VALUES (badge_seq.nextval, '202501', 800, 2, 450000, 160000, (SELECT user_num FROM user_info WHERE user_id = 'hongid'));

INSERT INTO badge (badge_num, badge_date, badge, ranking, current_month_amount, previous_month_amount, user_num)
VALUES (badge_seq.nextval, '202501', 1000, 1, 600000, 120000, (SELECT user_num FROM user_info WHERE user_id = 'leeid'));




INSERT INTO badge (badge_num, badge_date, badge, ranking, current_month_amount, previous_month_amount, user_num)
VALUES (badge_seq.nextval, '202412', 10, 1, 480000, 450000, (SELECT user_num FROM user_info WHERE user_id = 'crtestid'));

INSERT INTO badge (badge_num, badge_date, badge, ranking, current_month_amount, previous_month_amount, user_num)
VALUES (badge_seq.nextval, '202412', 8, 2, 420000, 400000, (SELECT user_num FROM user_info WHERE user_id = 'hjtestid'));

INSERT INTO badge (badge_num, badge_date, badge, ranking, current_month_amount, previous_month_amount, user_num)
VALUES (badge_seq.nextval, '202412', 7, 3, 390000, 380000, (SELECT user_num FROM user_info WHERE user_id = 'mktestid'));

INSERT INTO badge (badge_num, badge_date, badge, ranking, current_month_amount, previous_month_amount, user_num)
VALUES (badge_seq.nextval, '202412', 5, 4, 250000, 300000, (SELECT user_num FROM user_info WHERE user_id = 'jhtestid'));

INSERT INTO badge (badge_num, badge_date, badge, ranking, current_month_amount, previous_month_amount, user_num)
VALUES (badge_seq.nextval, '202412', 4, 5, 180000, 190000, (SELECT user_num FROM user_info WHERE user_id = 'jetestid'));

INSERT INTO badge (badge_num, badge_date, badge, ranking, current_month_amount, previous_month_amount, user_num)
VALUES (badge_seq.nextval, '202412', 3, 6, 150000, 160000, (SELECT user_num FROM user_info WHERE user_id = 'hongid'));

INSERT INTO badge (badge_num, badge_date, badge, ranking, current_month_amount, previous_month_amount, user_num)
VALUES (badge_seq.nextval, '202412', 2, 7, 100000, 120000, (SELECT user_num FROM user_info WHERE user_id = 'leeid'));

delete from badge where badge_num = 61;