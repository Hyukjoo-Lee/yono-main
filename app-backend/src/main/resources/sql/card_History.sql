select * from card_History where USER_CARD_ID = 23 order by res_used_date;
drop table card_History;
TRUNCATE table card_History;

select * from CARD_HISTORY;

commit;

delete from CARD_HISTORY where USER_CARD_ID = 23;

drop table card; --6
drop table card_company; --7
drop table user_card; --8
drop table user_info; --9
drop table card_benefit; --1
drop table card_history; --2
drop table tbl_posts; --3
drop table ranking; --4 
drop table badge; --5