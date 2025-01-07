package com.mmk.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mmk.dao.CommunityDAO;
import com.mmk.dto.CommunityDTO;
import com.mmk.entity.CommunityEntity;

@Service
public class CommunityServiceImpl implements CommunityService {
  
  @Autowired
    private CommunityDAO communityDao;

    @Override
    public void save(CommunityDTO communityData) {

        CommunityEntity communityEntity = new CommunityEntity();

        communityEntity.setCommTitle(communityData.getCommTitle());
        communityEntity.setCommCategory(communityData.getCommCategory());
        communityEntity.setUserId(communityData.getUserId());
        communityEntity.setCommCont(communityData.getCommCont());

        communityDao.save(communityEntity);
    }
}
