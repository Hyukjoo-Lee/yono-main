INSERT INTO badge (badge_num, badge_date, badge, ranking, previous_month_amount, two_months_ago_amount, user_num)
VALUES (badge_seq.nextval, '202412', 10, 1, 480000, 450000, (SELECT user_num FROM user_info WHERE user_id = 'crtestid'));

INSERT INTO badge (badge_num, badge_date, badge, ranking, previous_month_amount, two_months_ago_amount, user_num)
VALUES (badge_seq.nextval, '202412', 8, 2, 420000, 400000, (SELECT user_num FROM user_info WHERE user_id = 'hjtestid'));

INSERT INTO badge (badge_num, badge_date, badge, ranking, previous_month_amount, two_months_ago_amount, user_num)
VALUES (badge_seq.nextval, '202412', 7, 3, 390000, 380000, (SELECT user_num FROM user_info WHERE user_id = 'mktestid'));

INSERT INTO badge (badge_num, badge_date, badge, ranking, previous_month_amount, two_months_ago_amount, user_num)
VALUES (badge_seq.nextval, '202412', 7, 3, 400000, 380000, (SELECT user_num FROM user_info WHERE user_id = 'jhtestid'));

INSERT INTO badge (badge_num, badge_date, badge, ranking, previous_month_amount, two_months_ago_amount, user_num)
VALUES (badge_seq.nextval, '202412', 4, 4, 180000, 190000, (SELECT user_num FROM user_info WHERE user_id = 'jetestid'));

INSERT INTO badge (badge_num, badge_date, badge, ranking, previous_month_amount, two_months_ago_amount, user_num)
VALUES (badge_seq.nextval, '202412', 3, 5, 150000, 160000, (SELECT user_num FROM user_info WHERE user_id = 'hongid'));

INSERT INTO badge (badge_num, badge_date, badge, ranking, previous_month_amount, two_months_ago_amount, user_num)
VALUES (badge_seq.nextval, '202412', 2, 6, 100000, 120000, (SELECT user_num FROM user_info WHERE user_id = 'leeid'));




INSERT INTO badge (badge_num, badge_date, badge, ranking, previous_month_amount, two_months_ago_amount, user_num)
VALUES (badge_seq.nextval, '202411', 10, 1, 480000, 450000, (SELECT user_num FROM user_info WHERE user_id = 'crtestid'));

INSERT INTO badge (badge_num, badge_date, badge, ranking, previous_month_amount, two_months_ago_amount, user_num)
VALUES (badge_seq.nextval, '202411', 8, 2, 420000, 400000, (SELECT user_num FROM user_info WHERE user_id = 'hjtestid'));

INSERT INTO badge (badge_num, badge_date, badge, ranking, previous_month_amount, two_months_ago_amount, user_num)
VALUES (badge_seq.nextval, '202411', 7, 3, 390000, 380000, (SELECT user_num FROM user_info WHERE user_id = 'mktestid'));

INSERT INTO badge (badge_num, badge_date, badge, ranking, previous_month_amount, two_months_ago_amount, user_num)
VALUES (badge_seq.nextval, '202411', 5, 4, 250000, 300000, (SELECT user_num FROM user_info WHERE user_id = 'jhtestid'));

INSERT INTO badge (badge_num, badge_date, badge, ranking, previous_month_amount, two_months_ago_amount, user_num)
VALUES (badge_seq.nextval, '202411', 4, 5, 180000, 190000, (SELECT user_num FROM user_info WHERE user_id = 'jetestid'));

INSERT INTO badge (badge_num, badge_date, badge, ranking, previous_month_amount, two_months_ago_amount, user_num)
VALUES (badge_seq.nextval, '202411', 3, 6, 150000, 160000, (SELECT user_num FROM user_info WHERE user_id = 'hongid'));

INSERT INTO badge (badge_num, badge_date, badge, ranking, previous_month_amount, two_months_ago_amount, user_num)
VALUES (badge_seq.nextval, '202411', 2, 7, 100000, 120000, (SELECT user_num FROM user_info WHERE user_id = 'leeid'));

commit;

update badge set badge_date = '202412' where badge_num = 29;

SELECT * FROM all_procedures WHERE object_name = 'UPDATE_RANKING_PROCEDURE';

select * from badge;