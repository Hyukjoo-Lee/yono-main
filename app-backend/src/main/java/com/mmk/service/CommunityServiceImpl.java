package com.mmk.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mmk.dao.CommunityDAO;
import com.mmk.dto.CommunityDTO;
import com.mmk.entity.CommunityEntity;

import jakarta.transaction.Transactional;

@Service
public class CommunityServiceImpl implements CommunityService {
  
  @Autowired
  private CommunityDAO communityDAO;

  //글 등록하기
  @Override
  @Transactional
  public void save(CommunityDTO communityData) {

      CommunityEntity communityEntity = new CommunityEntity();

      communityEntity.setCommTitle(communityData.getCommTitle());
      communityEntity.setCommCategory(communityData.getCommCategory());
      communityEntity.setUserId(communityData.getUserId());
      communityEntity.setCommCont(communityData.getCommCont());
      communityEntity.setCommImgUrl(communityData.getCommImgUrl());

      communityDAO.save(communityEntity);
  }

  private CommunityDTO convertToDTO(CommunityEntity entity) {

    CommunityDTO dto = new CommunityDTO();

    dto.setCommunityNo(entity.getCommunityNo());
    dto.setCommCategory(entity.getCommCategory());
    dto.setUserId(entity.getUserId());
    dto.setCommTitle(entity.getCommTitle());
    dto.setCommCont(entity.getCommCont());
    dto.setViewCount(entity.getViewCount());
    
    return dto;
  }

  // 글목록을 불러오기
  @Override
  public List<CommunityDTO> getCommunityList() {
    List<CommunityEntity> communityEntities = communityDAO.getCommunityList();

    return communityEntities.stream()
      .map(this::convertToDTO)
      .collect(Collectors.toList());
  }

  @Override
  public CommunityDTO findById(String id) {
    int userId = Integer.parseInt(id);

    CommunityEntity communityEntity = communityDAO.findById(userId);

    if(communityEntity == null){
      throw new RuntimeException("해당 게시글을 찾을 수 없습니다!");
    }

    CommunityDTO communityDTO = new CommunityDTO();
    communityDTO.setCommunityNo(communityEntity.getCommunityNo());
    communityDTO.setCommCategory(communityEntity.getCommCategory());
    communityDTO.setUserId(communityEntity.getUserId());
    communityDTO.setCommTitle(communityEntity.getCommTitle());
    communityDTO.setCommCont(communityEntity.getCommCont());
    communityDTO.setViewCount(communityEntity.getViewCount());

    return communityDTO;
  }
}
