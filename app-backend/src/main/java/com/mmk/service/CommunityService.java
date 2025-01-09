package com.mmk.service;

import java.util.List;

import com.mmk.dto.CommunityDTO;

public interface CommunityService {

  void save(CommunityDTO communityData);

  List<CommunityDTO> getCommunityList();
}
