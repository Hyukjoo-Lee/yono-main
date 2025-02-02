package com.mmk.service;

import java.util.List;

import com.mmk.dto.NoticeDTO;

public interface NoticeService {
  
  void save(NoticeDTO noticeData);

  List<NoticeDTO> getNoticeList();

  NoticeDTO findById(String id);
}