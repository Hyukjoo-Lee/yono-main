package com.mmk.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
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

  @PostMapping("communityFormBox")
  public ResponseEntity<CommunityDTO> createPost(@RequestBody CommunityDTO communityData){
    communityService.save(communityData);
    return ResponseEntity.ok(communityData);
  }

}
