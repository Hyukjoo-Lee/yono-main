commit;

update badge set ranking = 5 where badge_num = 21;

select * from badge;


INSERT INTO badge (badge_num, badge_date, badge, ranking, current_month_amount, previous_month_amount, user_num)
VALUES (badge_seq.nextval, '202501', 500, 0, 350000, 300000, (SELECT user_num FROM user_info WHERE user_id = 'crtestid'));

INSERT INTO badge (badge_num, badge_date, badge, ranking, current_month_amount, previous_month_amount, user_num)
VALUES (badge_seq.nextval, '202501', 1000, 0, 500000, 400000, (SELECT user_num FROM user_info WHERE user_id = 'hjtestid'));

INSERT INTO badge (badge_num, badge_date, badge, ranking, current_month_amount, previous_month_amount, user_num)
VALUES (badge_seq.nextval, '202501', 800, 0, 400000, 380000, (SELECT user_num FROM user_info WHERE user_id = 'mktestid'));

INSERT INTO badge (badge_num, badge_date, badge, ranking, current_month_amount, previous_month_amount, user_num)
VALUES (badge_seq.nextval, '202501', 400, 0, 200000, 380000, (SELECT user_num FROM user_info WHERE user_id = 'jhtestid'));

INSERT INTO badge (badge_num, badge_date, badge, ranking, current_month_amount, previous_month_amount, user_num)
VALUES (badge_seq.nextval, '202501', 650, 0, 380000, 190000, (SELECT user_num FROM user_info WHERE user_id = 'jetestid'));

INSERT INTO badge (badge_num, badge_date, badge, ranking, current_month_amount, previous_month_amount, user_num)
VALUES (badge_seq.nextval, '202501', 800, 0, 450000, 160000, (SELECT user_num FROM user_info WHERE user_id = 'hongid'));

INSERT INTO badge (badge_num, badge_date, badge, ranking, current_month_amount, previous_month_amount, user_num)
VALUES (badge_seq.nextval, '202501', 1000, 0, 600000, 120000, (SELECT user_num FROM user_info WHERE user_id = 'leeid'));




INSERT INTO badge (badge_num, badge_date, badge, ranking, current_month_amount, previous_month_amount, user_num)
VALUES (badge_seq.nextval, '202412', 10, 0, 480000, 450000, (SELECT user_num FROM user_info WHERE user_id = 'crtestid'));

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

delete from badge where badge_num = 14;

select * from badge;
