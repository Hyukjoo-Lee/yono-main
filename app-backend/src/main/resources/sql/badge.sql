select * from badge;

drop table badge;

DROP SEQUENCE badge_seq;
TRUNCATE table badge;

commit;

CREATE SEQUENCE badge_seq
START WITH 1
INCREMENT BY 1
NOCACHE
NOCYCLE;


