create sequence replylike_seq
start with 1
increment by 1
nocycle
nocache;

alter sequence replylike_seq
nocache;


select * from reply_likes;
commit;

drop table reply_likes;