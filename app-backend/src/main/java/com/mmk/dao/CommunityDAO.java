package com.mmk.dao;

import java.util.List;

import com.mmk.entity.CommunityEntity;

public interface CommunityDAO {

  void save(CommunityEntity communityData);
  
  List<CommunityEntity> getCommunityList();
}
