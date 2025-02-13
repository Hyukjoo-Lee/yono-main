package com.mmk.service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mmk.dao.CardBenefitDAO;
import com.mmk.dao.CardDAO;
import com.mmk.dao.UserCardCompanyDAO;
import com.mmk.dto.CardBenefitDTO;
import com.mmk.dto.CardDTO;
import com.mmk.dto.CardSummaryDTO;
import com.mmk.dto.RecCardDTO;
import com.mmk.dto.UserCardCompanyDTO;
import com.mmk.entity.CardEntity;
import com.mmk.entity.UserCardCompanyEntity;

@Service
public class CardServiceImpl implements CardService {

    private static final Logger logger = LoggerFactory.getLogger(CardServiceImpl.class);

    @Autowired
    private CardDAO cardDAO;

    @Autowired
    private UserCardCompanyDAO cardCompanyDAO;

    @Autowired
    private UserCardService userCardService;

    @Autowired
    private CodefService codefService;

    @Autowired
    private CardBenefitService cardBenefitService;

    @Autowired
    private CardHistoryService cardHistoryService;

    @Autowired
    private CardBenefitDAO cardBenefitDAO;

    @Override
    public CardDTO createCard(CardDTO cardDTO) {
        if (cardDAO.existsByCardTitle(cardDTO.getCardTitle())) {
            throw new IllegalArgumentException("이미 존재하는 카드이름입니다.");
        }

        CardEntity cardEntity = toEntity(cardDTO);
        cardDAO.createCard(cardEntity);
        return toDTO(cardEntity);
    }

    @Override
    public List<CardDTO> getAllCards() {
        List<CardEntity> cardEntities = cardDAO.getAllCards();

        List<CardDTO> cardDTOs = new ArrayList<>();

        for (CardEntity cardEntity : cardEntities) {
            CardDTO cardDTO = toDTO(cardEntity);
            cardDTOs.add(cardDTO);
        }

        return cardDTOs;
    }

    @Override
    public CardEntity getByTitle(String title) {
        CardEntity cardEntity = cardDAO.findByCardTitle(title);

        if (cardEntity == null) {
            throw new IllegalArgumentException("존재 하지 않는 카드이름입니다.");
        }

        return cardEntity;
    }

    @Override
    public List<CardDTO> getAllCardsByOrganizationCode(String organizationCode) {

        List<CardEntity> cardEntities = cardDAO.getAllCardsByOrganizationCode(organizationCode);

        if (cardEntities.isEmpty()) {
            throw new NoSuchElementException("해당 기관에 해당하는 카드가 없습니다.");
        }

        List<CardDTO> cardDTOs = new ArrayList<>();

        for (CardEntity cardEntity : cardEntities) {
            CardDTO cardDTO = toDTO(cardEntity);
            cardDTOs.add(cardDTO);
        }

        return cardDTOs;
    }

    @Override
    public CardDTO findByUserNum(int userNum) {
        int cardId = userCardService.findPrimaryCardByUserNum(userNum).getCardId();
        return toDTO(cardDAO.findByCardId(cardId));
    }

    @Override
    public UserCardCompanyDTO saveCodefCard(UserCardCompanyDTO cardCompanyDTO) {

        int userNum = cardCompanyDTO.getUserNum();
        String organization = cardCompanyDTO.getOrganization();

        UserCardCompanyEntity cardCompanyEntity = cardCompanyDAO.findByUserNumAndOrganizationCode(userNum,
                organization);

        if (cardCompanyEntity == null) {
            throw new RuntimeException("카드 회사 정보가 존재하지 않습니다.");
        } else {
            int companyNum = cardCompanyEntity.getCardCompanyNum();
            String companyId = cardCompanyEntity.getCompanyId();
            String companyPwd = cardCompanyEntity.getCompanyPwd();
            String connectedId = cardCompanyEntity.getConnectedId();

            cardCompanyDTO.setCardCompanyNum(companyNum);
            cardCompanyDTO.setCompanyId(companyId);
            cardCompanyDTO.setCompanyPwd(companyPwd);
            cardCompanyDTO.setConnectedId(connectedId);
        }

        // Codef API로 보유카드 정보 요청
        List<Map<String, Object>> cardList = codefService.getUserCardList(cardCompanyDTO.getConnectedId(),
                organization);

        if (cardList.isEmpty()) {
            throw new RuntimeException("Codef API로부터 카드 정보를 가져오지 못했습니다.");
        }

        // 마스터 카드, 유저 카드 저장
        cardList.forEach(card -> {
            CardDTO cardDTO = new CardDTO();
            cardDTO.setCardTitle((String) card.get("cardName"));
            cardDTO.setCardProvider(getCardProvider(organization));
            cardDTO.setOrganizationCode((String) card.get("organizationCode"));
            cardDTO.setCardImgUrl((String) card.get("imageLink"));

            createCard(cardDTO);
        });

        // Codef API로 카드 혜택 요청
        List<Map<String, Object>> benefitList = codefService.getUserPerformance(cardCompanyDTO.getConnectedId(),
                organization);

        if (benefitList.isEmpty()) {
            throw new RuntimeException("Codef API로부터 카드 혜택 정보를 가져오지 못했습니다.");
        }

        benefitList.forEach(benefit -> {
            CardBenefitDTO cardBenefitDTO = new CardBenefitDTO();
            String cardTitle = (String) benefit.get("cardName");
            cardBenefitDTO.setCardTitle(cardTitle);
            @SuppressWarnings("unchecked")
            List<Map<String, Object>> benefits = (List<Map<String, Object>>) benefit.get("benefits");
            benefits.forEach(b -> {
                String benefitTitle = (String) b.get("benefitName");
                String businessType = (String) b.get("businessTypes");
                cardBenefitDTO.setBenefitTitle(benefitTitle);
                cardBenefitDTO.setBenefitType(businessType);
                cardBenefitService.saveCardBenefit(cardBenefitDTO);
            });
        });
        return cardCompanyDTO;
    }

    // 기관코드에 따른 CARD_PROVIDER 설정
    private String getCardProvider(String organization) {
        switch (organization) {
            case "0301":
                return "kb";
            case "0302":
                return "hyundai";
            case "0303":
                return "samsung";
            case "0304":
                return "nh";
            case "0306":
                return "shinhan";
            case "0313":
                return "hana";
            default:
                throw new IllegalArgumentException("유효하지 않은 기관코드: " + organization);
        }
    }

    @Override
    public List<RecCardDTO> getRecommendedCards(int userNum) {

        logger.info("User {}: 추천 카드 조회 시작", userNum);

        // 사용자가 가장 많이 소비한 상위 카테고리 목록 조회
        List<CardSummaryDTO> topCategoryList = cardHistoryService.getUserTopSpendingCategories(userNum);

        // 카드 추천 리스트 (LinkedHashMap 사용하여 순서 유지)
        Map<String, RecCardDTO> recommendedCards = new LinkedHashMap<>();

        for (CardSummaryDTO category : topCategoryList) {
            String storeType = category.getStoreType();
            logger.info("User {}: 소비 카테고리 - {}", userNum, storeType);

            // 해당 카테고리와 매칭되는 카드 혜택 조회
            List<Object[]> matchingBenefits = cardBenefitDAO.findMatchingCardBenefits(storeType);
            if (matchingBenefits.isEmpty()) {
                logger.warn("User {}: '{}' 카테고리에서 매칭되는 혜택 없음", userNum, storeType);
                continue;
            }

            // 매칭된 카드 데이터 처리
            processMatchingBenefits(recommendedCards, matchingBenefits, storeType);

            // 최대 5개의 카드만 추천
            if (recommendedCards.size() >= 5)
                break;
        }

        return getSortedRecommendedCards(recommendedCards);
    }

    // 매칭된 카드 혜택 데이터 추가 (중복 제거)
    private void processMatchingBenefits(Map<String, RecCardDTO> recommendedCards, List<Object[]> matchingBenefits,
            String storeType) {
        for (Object[] cardData : matchingBenefits) {
            String cardTitle = (String) cardData[0];
            String cardImgUrl = (String) cardData[1];
            String cardApplyUrl = (String) cardData[2];

            // 첫 번째 혜택 (현재 소비 패턴과 매칭된 혜택)
            String benefitTitle = (String) cardData[3];
            String benefitType = (String) cardData[4];
            String benefitValue = (String) cardData[5];

            logger.debug("카드: {}, 매칭된 혜택: {}", cardTitle, benefitTitle);

            // 기존 카드가 존재하면 가져옴
            RecCardDTO recCard = recommendedCards.get(cardTitle);

            // 기존 카드가 없으면 새로 생성하여 추가
            if (recCard == null) {
                recCard = new RecCardDTO(cardTitle, cardImgUrl, cardApplyUrl, new ArrayList<>(), new ArrayList<>());
                recommendedCards.put(cardTitle, recCard);
            }

            // 혜택 중복 방지 (Set 사용)
            Set<String> addedBenefits = new HashSet<>();
            addedBenefits.add(benefitTitle); // 첫 번째 혜택 추가
            recCard.getBenefits().add(new CardBenefitDTO(benefitTitle, benefitValue, benefitType));

            // 해당 카드의 추가 혜택 조회 후 중복 제거
            List<CardBenefitDTO> allBenefits = cardBenefitService.getAllCardBenefitsByCardTitle(cardTitle);
            logger.debug("매칭 카드의 추가 혜택: {}", allBenefits);

            for (CardBenefitDTO benefit : allBenefits) {
                if (!addedBenefits.contains(benefit.getBenefitTitle())) {
                    recCard.getBenefits().add(benefit);
                    addedBenefits.add(benefit.getBenefitTitle());
                }
            }

            // 매칭된 소비 카테고리
            if (!recCard.getMatchedCategories().contains(storeType)) {
                recCard.getMatchedCategories().add(storeType);
            }
        }
    }

    // 추천된 카드 리스트를 혜택 개수 기준으로 정렬 후 반환
    private List<RecCardDTO> getSortedRecommendedCards(Map<String, RecCardDTO> recommendedCards) {
        List<RecCardDTO> cardList = new ArrayList<>(recommendedCards.values());

        // 혜택 개수가 많은 순으로 정렬 (내림차순)
        cardList.sort((c1, c2) -> Integer.compare(c2.getBenefits().size(), c1.getBenefits().size()));

        // 최대 5개까지
        List<RecCardDTO> sortedCards = new ArrayList<>();

        for (int i = 0; i < Math.min(5, cardList.size()); i++) {
            sortedCards.add(cardList.get(i));
        }

        return sortedCards;
    }

    private CardEntity toEntity(CardDTO dto) {
        CardEntity entity = new CardEntity();
        entity.setCardId(dto.getCardId());
        entity.setCardTitle(dto.getCardTitle());
        entity.setCardProvider(dto.getCardProvider());
        entity.setOrganizationCode(dto.getOrganizationCode());
        entity.setCardImgUrl(dto.getCardImgUrl());
        entity.setCreatedAt(dto.getCreatedAt());
        entity.setUpdatedAt(dto.getUpdatedAt());
        return entity;
    }

    private CardDTO toDTO(CardEntity entity) {
        CardDTO dto = new CardDTO();
        dto.setCardId(entity.getCardId());
        dto.setCardTitle(entity.getCardTitle());
        dto.setCardProvider(entity.getCardProvider());
        dto.setOrganizationCode(entity.getOrganizationCode());
        dto.setCardImgUrl(entity.getCardImgUrl());
        dto.setCreatedAt(entity.getCreatedAt());
        dto.setUpdatedAt(entity.getUpdatedAt());
        return dto;
    }
}