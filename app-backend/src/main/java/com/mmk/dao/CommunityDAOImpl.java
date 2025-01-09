package com.mmk.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.mmk.entity.CommunityEntity;

@Repository
public class CommunityDAOImpl implements CommunityDAO {

  @Autowired
    private CommunityRepository communityRepo;

    @Override
    public void save(CommunityEntity communityData) {
      this.communityRepo.save(communityData);
    }

    @Override
    public List<CommunityEntity> getCommunityList(){
      return this.communityRepo.findAll();
    }
}
