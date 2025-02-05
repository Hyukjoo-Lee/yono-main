CREATE TABLE user_info (
    user_num        NUMBER PRIMARY KEY,
    user_id         VARCHAR2(16)  NOT NULL UNIQUE,
    email           VARCHAR2(100) NOT NULL UNIQUE,
    password        VARCHAR2(255) NOT NULL,
    name            VARCHAR2(17)  NOT NULL,
    spending_target NUMBER DEFAULT 0 NOT NULL,
    profile        VARCHAR2(255) DEFAULT 'temp_profile',
    state          NUMBER DEFAULT 1 NOT NULL,
    user_role      NUMBER DEFAULT 1 NOT NULL,
    created_at     TIMESTAMP DEFAULT SYSTIMESTAMP NOT NULL,
    updated_at     TIMESTAMP DEFAULT SYSTIMESTAMP NOT NULL
);

CREATE TABLE user_card_company (
    card_company_num NUMBER PRIMARY KEY,
    organization_code VARCHAR2(4) NOT NULL,
    company_id VARCHAR2(50) NOT NULL,
    company_pwd VARCHAR2(255) NOT NULL,
    connected_id VARCHAR2(255),
    user_num NUMBER NOT NULL,
    CONSTRAINT fk_user_card_company_user FOREIGN KEY (user_num) REFERENCES user_info(user_num)
);

CREATE TABLE card (
    card_id           NUMBER PRIMARY KEY,
    card_title        VARCHAR2(100) NOT NULL UNIQUE,
    card_provider     VARCHAR2(50)  NOT NULL,
    organization_code VARCHAR2(4),
    card_img_url      VARCHAR2(255),
    created_at        TIMESTAMP DEFAULT SYSTIMESTAMP NOT NULL,
    updated_at        TIMESTAMP DEFAULT SYSTIMESTAMP NOT NULL
);

CREATE TABLE card_benefit (
    benefit_id    NUMBER PRIMARY KEY,
    benefit_title VARCHAR2(100) NOT NULL,
    benefit_value VARCHAR2(50)  NOT NULL,
    benefit_type  VARCHAR2(50)  NOT NULL,
    created_at    TIMESTAMP DEFAULT SYSTIMESTAMP NOT NULL,
    updated_at    TIMESTAMP DEFAULT SYSTIMESTAMP NOT NULL,
    card_id       NUMBER NOT NULL,
    CONSTRAINT fk_card_benefit_card FOREIGN KEY (card_id) REFERENCES card(card_id)
);

CREATE TABLE user_card (
    user_card_id  NUMBER PRIMARY KEY,
    user_card_num VARCHAR2(20)  NOT NULL,
    expiry_date   VARCHAR2(4)   NOT NULL,
    card_pwd      VARCHAR2(4)   NOT NULL,
    card_img      VARCHAR2(255) NOT NULL,
    primary_card  NUMBER DEFAULT 0 NOT NULL,
    created_at    TIMESTAMP DEFAULT SYSTIMESTAMP NOT NULL,
    updated_at    TIMESTAMP DEFAULT SYSTIMESTAMP NOT NULL,
    card_company_num NUMBER NOT NULL,
    card_id       NUMBER NOT NULL,
    user_num      NUMBER NOT NULL,
    CONSTRAINT fk_user_card_company FOREIGN KEY (card_company_num) REFERENCES user_card_company(card_company_num),
    CONSTRAINT fk_user_card_card FOREIGN KEY (card_id) REFERENCES card(card_id),
    CONSTRAINT fk_user_card_user FOREIGN KEY (user_num) REFERENCES user_info(user_num)
);

CREATE TABLE card_history (
    resApprovalNo        VARCHAR2(20) PRIMARY KEY,
    resUsedDate          VARCHAR2(8)  NOT NULL,
    resUsedTime          VARCHAR2(6)  NOT NULL,
    resMemberStoreName   VARCHAR2(50) NOT NULL,
    resUsedAmount        VARCHAR2(50) NOT NULL,
    resMemberStoreType   VARCHAR2(20) NOT NULL,
    user_card_id         NUMBER NOT NULL,
    CONSTRAINT fk_card_history_user_card FOREIGN KEY (user_card_id) REFERENCES user_card(user_card_id)
);

CREATE INDEX idx_user_card_and_date ON card_history (user_card_id, resUsedDate);

CREATE TABLE post (
    no           NUMBER PRIMARY KEY,
    title        VARCHAR2(50) NOT NULL,
    category     VARCHAR2(50) NOT NULL,
    content      VARCHAR2(4000) NOT NULL,
    regdate      DATE DEFAULT SYSDATE NOT NULL,
    viewcnt      NUMBER DEFAULT 0 NOT NULL,
    imgurl       VARCHAR2(255),
    created_at   TIMESTAMP DEFAULT SYSTIMESTAMP NOT NULL,
    updated_at   TIMESTAMP DEFAULT SYSTIMESTAMP NOT NULL,
    user_num     NUMBER NOT NULL,
    CONSTRAINT fk_post_user FOREIGN KEY (user_num) REFERENCES user_info(user_num)
);

CREATE TABLE reply (
    rno          NUMBER PRIMARY KEY,
    r_content    VARCHAR2(1000) NOT NULL,
    like_count   NUMBER DEFAULT 0 NOT NULL,
    regdate      DATE DEFAULT SYSDATE NOT NULL,
    created_at   TIMESTAMP DEFAULT SYSTIMESTAMP NOT NULL,
    updated_at   TIMESTAMP DEFAULT SYSTIMESTAMP NOT NULL,
    user_num     NUMBER NOT NULL,
    pno          NUMBER NOT NULL,
    CONSTRAINT fk_reply_user FOREIGN KEY (user_num) REFERENCES user_info(user_num),
    CONSTRAINT fk_reply_post FOREIGN KEY (pno) REFERENCES post(no)
);

CREATE TABLE reply_like (
    id          NUMBER PRIMARY KEY,
    rno         NUMBER NOT NULL,
    regdate     DATE DEFAULT SYSDATE NOT NULL,
    user_num    NUMBER NOT NULL,
    CONSTRAINT fk_reply_like_reply FOREIGN KEY (rno) REFERENCES reply(rno),
    CONSTRAINT fk_reply_like_user FOREIGN KEY (user_num) REFERENCES user_info(user_num)
);

CREATE TABLE notice (
    notice_no    NUMBER PRIMARY KEY,
    title        VARCHAR2(50) NOT NULL,
    content      VARCHAR2(4000) NOT NULL,
    img_url      VARCHAR2(255),
    created_at   TIMESTAMP DEFAULT SYSTIMESTAMP NOT NULL,
    updated_at   TIMESTAMP,
    user_num     NUMBER NOT NULL,
    view_count   NUMBER DEFAULT 0 NOT NULL,
    CONSTRAINT fk_notice_user FOREIGN KEY (user_num) REFERENCES user_info(user_num)
);

CREATE TABLE badge (
    badge_num              NUMBER PRIMARY KEY,
    badge_date             VARCHAR2(6) NOT NULL,
    badge                  NUMBER DEFAULT 0 NOT NULL,
    ranking                NUMBER NOT NULL,
    current_month_amount   NUMBER DEFAULT 0 NOT NULL,
    previous_month_amount  NUMBER DEFAULT 0 NOT NULL,
    user_num               NUMBER NOT NULL,
    CONSTRAINT fk_badge_user FOREIGN KEY (user_num) REFERENCES user_info(user_num)
);

CREATE SEQUENCE user_seq START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE user_card_seq START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE user_card_company_seq START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE card_seq START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE card_benefit_seq START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE card_history_seq START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE post_seq START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE reply_seq START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE reply_like_seq START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE notice_seq START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE badge_seq START WITH 1 INCREMENT BY 1;
