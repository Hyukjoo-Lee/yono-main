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

    @Override
    public CommunityEntity findById(int userId) {
      CommunityEntity community = communityRepo.findById(userId).orElse(null);

      if(community == null){
        throw new RuntimeException("해당 게시글을 찾을 수 없습니다!");
      }
      return community;
    }

}
