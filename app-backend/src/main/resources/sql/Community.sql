DROP SEQUENCE community_seq;

create sequence community_seq
start with 1
increment by 1
nocycle
nocache;

alter sequence community_seq
nocache;

alter table community add imgurl VARCHAR2(500);

select * from community;

drop table community;

commit;

--데이터 직접 넣기
INSERT INTO community (community_no, comm_category, comm_cont, comm_img_url, comm_title, created_at, user_id, view_count, reply_count)
VALUES (community_seq.nextval, '질문', '글 내용입니당', 'default_image.jpg', '글제목입니다.', CURRENT_TIMESTAMP, 'user', 0, 0);

--테이블 존재 여부 확인
SELECT * FROM user_tables WHERE table_name = 'COMMUNITY';
