select * from card_History where USER_CARD_ID = 23 order by res_used_date;
drop table card_History;
TRUNCATE table card_History;

select * from CARD_HISTORY;


commit;

delete from CARD_HISTORY where USER_CARD_ID = 23;

drop table card;
drop table card_company;
drop table user_card;
drop table user_info;
drop table card_benefit;
drop table card_history;
drop table tbl_posts;
drop table badge;