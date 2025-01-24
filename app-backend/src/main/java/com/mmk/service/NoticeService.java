package com.mmk.service;

import java.util.List;

import com.mmk.dto.NoticeDTO;

public interface NoticeService{

  void saveNotice(NoticeDTO notice);

  List<NoticeDTO> searchNotice(String keyword);

}