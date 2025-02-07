select * from badge;
delete from badge where user_num = 45;

drop table badge;

DROP SEQUENCE badge_seq;
TRUNCATE table badge;

commit;