package com.mmk.common;

public enum BenefitType {
    OIL, // 주유: 주유소 리터당 할인, LPG 할인
    SHOPPING, // 쇼핑: 대형마트, 온라인 쇼핑 할인
    FOOD, // 음식점: (한식, 중식, 패스트푸드)
    CAFE, // 카페: 커피, 디저트 할인
    CONVENIENCE, // 편의점: 편의점 할인
    FINANCE, // 금융: 외화 환전 수수료 할인, 캐시백
    EDUCATION, // 교육: 학원비 할인, 도서 구매 할인
    TELECOMMUNICATION, // 통신: 이동통신 요금 할인, 해외 로밍 할인
    ENTERTAINMENT, // 여가: 영화, 놀이공원, 숙박 할인
    FLIGHT, // 항공: 항공 마일리지 적립, 면세점 할인
    ALLSTORES, // 전 가맹점: 모든 가맹점 포인트 적립, 캐시백
    VEHICLE, // 차량: 렌터카 할인, 하이패스 통행료 할인
    INSURANCE, // 보험: 자동차 보험료 할인, 건강보험 할인
    HEALTH, // 의료: 건강검진 할인, 약국 할인
    LIFE, // 생활: 전기세, 수도세 할인
    TRANSPORTATION, // 교통: 버스, 택시
    PET, // 애완동물
    ETC; // 기타

    /**
     * 소비내역 카테고리 기반으로 해당하는 혜택 타입을 반환
     * 
     * @param category 카테고리 이름
     * @return 해당하는 BenefitType (혜택 타입)
     */
    public static BenefitType determineFromCategory(String category) {
        if (category == null) {
            return null;
        }

        category = category.toLowerCase();

        if (category.contains("주유") || category.contains("기름") || category.contains("lpg")) {
            return OIL;
        } else if (category.contains("쇼핑") || category.contains("마트") || category.contains("온라인 쇼핑")
                || category.contains("브랜드") || category.contains("백화점")) {
            return SHOPPING;
        } else if (category.contains("음식") || category.contains("한식") || category.contains("중식")
                || category.contains("일식") || category.contains("서양식")
                || category.contains("양식") || category.contains("푸드") || category.contains("주점")) {
            return FOOD;
        } else if (category.contains("카페") || category.contains("커피") || category.contains("디저트")) {
            return CAFE;
        } else if (category.contains("편의점") || category.contains("간식")) {
            return CONVENIENCE;
        } else if (category.contains("금융") || category.contains("환전") || category.contains("캐시백")
                || category.contains("은행") || category.contains("카드")) {
            return FINANCE;
        } else if (category.contains("교육") || category.contains("학원") || category.contains("도서")
                || category.contains("강의") || category.contains("서점")) {
            return EDUCATION;
        } else if (category.contains("통신") || category.contains("로밍") || category.contains("전화")
                || category.contains("인터넷")) {
            return TELECOMMUNICATION;
        } else if (category.contains("영화") || category.contains("놀이공원") || category.contains("숙박")
                || category.contains("공연") || category.contains("여행")) {
            return ENTERTAINMENT;
        } else if (category.contains("항공") || category.contains("마일리지") || category.contains("면세점")
                || category.contains("비행기")) {
            return FLIGHT;
        } else if (category.contains("가맹") || category.contains("포인트") || category.contains("리워드")
                || category.contains("할인")) {
            return ALLSTORES;
        } else if (category.contains("차량") || category.contains("렌터") || category.contains("하이패스")
                || category.contains("주차")) {
            return VEHICLE;
        } else if (category.contains("보험")) {
            return INSURANCE;
        } else if (category.contains("의료") || category.contains("건강") || category.contains("검진")
                || category.contains("약국")
                || category.contains("병원") || category.contains("의원")) {
            return HEALTH;
        } else if (category.contains("생활") || category.contains("전기") || category.contains("수도")
                || category.contains("공과")) {
            return LIFE;
        } else if (category.contains("교통") || category.contains("택시") || category.contains("버스")
                || category.contains("대중")) {
            return TRANSPORTATION;
        } else if (category.contains("애완") || category.contains("반려") || category.contains("펫")) {
            return PET;
        } else {
            return ETC;
        }
    }
}
