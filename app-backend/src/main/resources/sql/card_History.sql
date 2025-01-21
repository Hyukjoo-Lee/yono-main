select * from card_History where USER_CARD_ID = 22 order by res_used_date;
drop table card_History;
TRUNCATE table card_History;

commit;

delete from CARD_HISTORY where RES_USED_DATE > '20241200';

drop table card;
drop table card_company;
drop table user_card;
drop table user_info;
drop table card_benefit;
drop table card_history;
drop table tbl_posts;