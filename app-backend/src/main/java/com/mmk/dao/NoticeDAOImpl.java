package com.mmk.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.mmk.entity.NoticeEntity;

@Repository
public class NoticeDAOImpl implements NoticeDAO {

  @Autowired
  private NoticeRepository noticeRepo;

  @Override
  public void save(NoticeEntity noticeData) {
    this.noticeRepo.save(noticeData);
  }

  @Override
  public List<NoticeEntity> getNoticeList() {
    return this.noticeRepo.findAll();
  }

	@Override
	public NoticeEntity findById(int adminId) {
		NoticeEntity notice = noticeRepo.findById(adminId).orElse(null);

    if(notice == null){
      throw new RuntimeException("해당 공지사항을 찾을 수 없습니다!");
    }
    return notice;
	}
  
}
