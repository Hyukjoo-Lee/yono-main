package com.mmk.service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mmk.dao.CardHistoryDAO;
import com.mmk.dao.UserCardDAO;
import com.mmk.dao.UserDAO;
import com.mmk.dto.CardHistoryDTO;
import com.mmk.entity.CardHistoryEntity;
import com.mmk.entity.UserCardEntity;
import com.mmk.entity.UserEntity;

@Service
public class CardHistoryServiceImpl implements CardHistoryService {

    @Autowired
    UserCardDAO userCardDAO;

    @Autowired
    UserDAO userDAO;

    @Autowired
    CardHistoryDAO cardHistoryDAO;

    @Autowired
    CodefService codefService;

    // 카드내역 DB에 갱신
    @Override
    public void updateCardHistory(int userNum) {
        UserEntity userEntity = userDAO.getUserByUserNum(userNum);
        UserCardEntity userCardEntity = userCardDAO.findByUserNumAndPrimaryCard(userEntity, 1);
        int userCardId = userCardEntity.getUserCardId();

        String recentDate = cardHistoryDAO.findMaxResUsedDate(userCardId);

        LocalDate today = LocalDate.now();
        LocalDate twoMonthsAgoFirstDay = today.minusMonths(2).withDayOfMonth(1);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");

        String startDate = twoMonthsAgoFirstDay.format(formatter);
        String endDate = today.format(formatter);

        if (recentDate != null && recentDate.compareTo(startDate) >= 0) {
            startDate = recentDate;
        }

        System.out.println(startDate);

        String result = codefService.getCardHistory(userCardEntity, startDate, endDate);

        try {
            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
    
            String dataArrayJson = objectMapper.readTree(result).get("data").toString();
            List<CardHistoryDTO> cardHistoryDTOList = objectMapper.readValue(dataArrayJson, new TypeReference<List<CardHistoryDTO>>() {});

            for (CardHistoryDTO cardHistoryDTO : cardHistoryDTOList) {
                cardHistoryDTO.setUserCardId(userCardId);
                cardHistoryDAO.save(toEntity(cardHistoryDTO));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    
    private CardHistoryDTO toDTO(CardHistoryEntity entity) {
        CardHistoryDTO dto = new CardHistoryDTO();
        dto.setResApprovalNo(entity.getResApprovalNo());

        dto.setResUsedDate(entity.getResUsedDate());
        dto.setResUsedTime(entity.getResUsedTime());
        dto.setResMemberStoreName(entity.getResMemberStoreName());
        dto.setResUsedAmount(entity.getResUsedAmount());
        dto.setResMemberStoreType(entity.getResMemberStoreType());
        
        dto.setUserCardId(entity.getUserCardEntity().getUserCardId());
        return dto;
    }

    private CardHistoryEntity toEntity(CardHistoryDTO dto) {
        CardHistoryEntity entity = new CardHistoryEntity();
        entity.setResApprovalNo(dto.getResApprovalNo());

        entity.setResUsedDate(dto.getResUsedDate());
        entity.setResUsedTime(dto.getResUsedTime());
        entity.setResMemberStoreName(dto.getResMemberStoreName());
        entity.setResUsedAmount(dto.getResUsedAmount());
        entity.setResMemberStoreType(dto.getResMemberStoreType());

        entity.setUserCardEntity(userCardDAO.findByUserCardId(dto.getUserCardId()));
        return entity;
    }
}
