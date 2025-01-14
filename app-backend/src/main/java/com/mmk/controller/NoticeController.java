package com.mmk.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.mmk.dto.NoticeDTO;
import com.mmk.service.NoticeService;

@Controller
@RequestMapping("/notice")
public class NoticeController {
  
  @Autowired
  private NoticeService noticeService;

  //글쓰기
  @PostMapping("/noticeFormBox")
  public ResponseEntity<NoticeDTO> createNotice(@RequestBody NoticeDTO noticeData){
    noticeService.save(noticeData);
    return ResponseEntity.ok(noticeData);
  }

  //글 목록 불러오기
  @GetMapping("")
    public ResponseEntity<List<NoticeDTO>> getNotices() {
        List<NoticeDTO> noticeList = noticeService.getNoticeList();
        return ResponseEntity.ok(noticeList);
    }
  
  //글 상세조회
  @GetMapping("/{id}")
  public ResponseEntity<NoticeDTO> getCommunityById(@PathVariable String id){
    NoticeDTO notice = noticeService.findById(id);
    return ResponseEntity.ok(notice);
  }
}