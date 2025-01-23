package com.mmk.service;

import org.springframework.stereotype.Service;

@Service
public class BadgeServiceImpl implements BadgeService {

    // @Autowired
    // private CardHistoryService cardHistoryService;

    // @Autowired
    // private UserDAO userDAO;

    // @Autowired
    // private UserCardDAO userCardDAO;

    // @Autowired
    // private CardHistoryDAO cardHistoryDAO;

    // @Override
    // public List<CardHistoryDTO> uploadOneMonthCardHistory(int userNum) {
    //     // 현재 날짜와 이번 달의 첫 날 구하기
    //     LocalDate today = LocalDate.now();
    //     LocalDate firstDayOfMonth = today.withDayOfMonth(1); // 이번 달 1일
    //     DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
    //     String startDate = firstDayOfMonth.format(formatter);  // "yyyyMMdd" 형식으로 날짜 변환

    //     // 사용자 정보 가져오기
    //     UserEntity userEntity = userDAO.getUserByUserNum(userNum);
    //     if (userEntity == null) {
    //         throw new IllegalArgumentException("User with userNum " + userNum + " does not exist.");
    //     }

    //     UserCardEntity userCardEntity = userCardDAO.findByUserNumAndPrimaryCard(userEntity, 1);
    //     if (userCardEntity == null) {
    //         throw new IllegalArgumentException("Primary card for userNum " + userNum + " does not exist.");
    //     }

    //     int userCardId = userCardEntity.getUserCardId();  // 사용자 카드 ID

    //     // DB에서 해당 카드의 사용 내역 조회 (이번 달)
    //     List<CardHistoryEntity> entityList = cardHistoryDAO.findRecentHistory(userCardId, startDate);
    //     if (entityList == null || entityList.isEmpty()) {
    //         return new ArrayList<>(); // 조회된 데이터가 없을 경우 빈 리스트 반환
    //     }

    //     // 결과 리스트 생성 (DTO로 변환)
    //     List<CardHistoryDTO> resultList = new ArrayList<>();
    //     for (CardHistoryEntity cardHistoryEntity : entityList) {
    //         resultList.add(toDTO(cardHistoryEntity));  // 엔티티를 DTO로 변환하여 추가
    //     }

    //     // 변환된 DTO 리스트 반환
    //     return resultList;
    // }

    // private CardHistoryDTO toDTO(CardHistoryEntity entity) {
    //     if (entity == null) {
    //         throw new IllegalArgumentException("CardHistoryEntity cannot be null.");
    //     }
    //     if (entity.getUserCardEntity() == null) {
    //         throw new IllegalArgumentException("UserCardEntity cannot be null in CardHistoryEntity.");
    //     }

    //     CardHistoryDTO dto = new CardHistoryDTO();
    //     dto.setResApprovalNo(entity.getResApprovalNo());
    //     dto.setResUsedDate(entity.getResUsedDate());
    //     dto.setResUsedTime(entity.getResUsedTime());
    //     dto.setResMemberStoreName(entity.getResMemberStoreName());
    //     dto.setResUsedAmount(entity.getResUsedAmount());
    //     dto.setResMemberStoreType(entity.getResMemberStoreType());
    //     dto.setUserCardId(entity.getUserCardEntity().getUserCardId());
    //     return dto;
    // }
}