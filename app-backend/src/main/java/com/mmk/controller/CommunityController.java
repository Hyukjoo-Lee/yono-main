package com.mmk.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.mmk.dto.CommunityDTO;
import com.mmk.service.CommunityService;

@Controller
@RequestMapping("/community")
public class CommunityController {
  
  @Autowired
  private CommunityService communityService;

  //글쓰기
  @PostMapping("/communityFormBox")
  public ResponseEntity<CommunityDTO> createCommunity(@RequestBody CommunityDTO communityData){
    communityService.save(communityData);
    return ResponseEntity.ok(communityData);
  }

  //글목록 불러오기
  @GetMapping("/list")
  public ResponseEntity<List<CommunityDTO>> getCommunity(){
    List<CommunityDTO> communityList = communityService.getCommunityList();
    return ResponseEntity.ok(communityList);
  }

}
