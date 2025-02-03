package com.mmk.controller;

import java.io.File;
import java.io.IOException;
import java.util.Calendar;
import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.mmk.dto.NoticeDTO;
import com.mmk.service.NoticeService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/notice")
public class NoticeController {

  @Autowired
  private NoticeService noticeService;

  //글 쓰기
  @PostMapping("/write")
  public ResponseEntity<Void> saveNotice(
    @ModelAttribute NoticeDTO noticeDTO,
    @RequestParam(value = "file", required= false) MultipartFile file) throws IOException{
    
    System.out.println("아이디 : " + noticeDTO);

    if(file != null && !file.isEmpty()){
      String fileName = saveFile(file);
      noticeDTO.setImgurl(fileName);
    }
    noticeDTO.setUpdatedAt(null);
    noticeDTO.setUserId(noticeDTO.getUserId());
    noticeService.saveNotice(noticeDTO);
    return ResponseEntity.ok().build();
    }

    private String saveFile(MultipartFile file) throws IOException{
      String propertyPath = System.getProperty("user.dir").replace("\\app-backend", "").replace("/app-backend", "");
      String uploadFolder = propertyPath + "/uploads/images";

    Calendar cal = Calendar.getInstance();
    int year = cal.get(Calendar.YEAR);
    int month = cal.get(Calendar.MONTH) + 1;
    int date = cal.get(Calendar.DATE);
    String homedir = uploadFolder + "/" + year + "-" + month + "-" + date;

    File path = new File(homedir);
    if(!path.exists()){
      path.mkdirs();
    }

    String fileName = file.getOriginalFilename();
    if(fileName == null || fileName.isEmpty()){
      fileName = "default_filename.jpg";
    }

    Random r = new Random();
    int random = r.nextInt(100000000);
    int index = fileName.lastIndexOf(".");
    String fileExtension = fileName.substring(index + 1);
    String originalFileName = fileName.substring(0,fileName.length() - fileExtension.length() -1);
    String newFileName = originalFileName + year + month + date + random + "." + fileExtension;
    String fileDBName = "/uploads/images/" + year + "-" + month + "-" + date + "/" + newFileName;

    File saveFile = new File(homedir + "/" + newFileName);
    log.info("파일 저장 경로 : " + saveFile.getAbsolutePath());

    try{
      file.transferTo(saveFile);
    }catch(Exception e){
      e.printStackTrace();
    }

    return fileDBName;
  }

  //글 목록 불러오기
  @GetMapping("/list")
  public List<NoticeDTO> searchNotice(@RequestParam("keyword") String keyword){
    return noticeService.searchNotice(keyword);
  }

  //글 상세보기+조회수 증가
//   @GetMapping("/{id}")
// public ResponseEntity<NoticeDTO> getNoticeDetail(@PathVariable("id") int id){
//     try {
//         noticeService.increaseViewCount(id);
        
//         NoticeDTO notice = noticeService.getNoticeById(id);
//         if (notice != null) {
//             return ResponseEntity.ok(notice);
//         } else {
//             return ResponseEntity.notFound().build();
//         }
//     } catch (Exception e) {
//         log.error("Error while getting notice details: ", e);
//         return ResponseEntity.status(500).build();
//     }
// }
  //글 상세보기
  @GetMapping("/detail")
  public ResponseEntity<NoticeDTO> getNoticeDetail(@RequestParam("id") int id){
    NoticeDTO notice = noticeService.getNoticeById(id);
    if(notice != null){
      return ResponseEntity.ok(notice);
    }else{
        return ResponseEntity.notFound().build();
    }
  }

  //글 삭제
  @PostMapping("/delete")
  public ResponseEntity<Void> deleteByNotice(@RequestBody List<Integer> ids){
    for(Integer id : ids) {
      NoticeDTO notice = noticeService.getNoticeById(id);
      if(notice != null && notice.getImgurl() != null){
        String filePath = System.getProperty("user.dir").replace("\\app-backend","").replace("/app-backend","")+notice.getImgurl();
        File file = new File(filePath);
        if(file.exists()){
          if(file.delete()){
            log.info("Deleted image file : " + filePath);
          }else {
            log.warn("Failed to delete image file : " + filePath);
          }
        }
      }
    }
    noticeService.deleteByNotice(ids);
    return ResponseEntity.ok().build();
  }

  //글 수정
  @PostMapping("/edit")
  public ResponseEntity<Void> editNotice(
    @RequestParam("id") int id,
    @RequestParam("title") String title,
    @RequestParam("content") String content,
    @RequestParam(value = "file",required = false) MultipartFile file,
    @RequestParam(value = "imgurl" , required = false) String imgurl) throws IOException{

    NoticeDTO existingNotice = noticeService.getNoticeById(id);
      if(existingNotice == null){
        return ResponseEntity.notFound().build();
      }

      existingNotice.setTitle(title);
      existingNotice.setContent(content);

      if(file != null && !file.isEmpty()){
        if("deleted".equals(imgurl)){
          deleteFile(existingNotice.getImgurl());
          existingNotice.setImgurl(null);
        }
        String fileName = saveFile(file);
        existingNotice.setImgurl(fileName);
      }else if(imgurl != null && imgurl.isEmpty()){
        existingNotice.setImgurl(null);
      }else if("deleted".equals(imgurl)){
        deleteFile(existingNotice.getImgurl());
        existingNotice.setImgurl(null);
      }
      noticeService.saveNotice(existingNotice);
      return ResponseEntity.ok().build();
  }

  private void deleteFile(String filePath){
    if(filePath == null || filePath.isEmpty()){
      return;
    }
    String absolutePath = System.getProperty("user.dir").replace("\\app-backend","").replace("/app-backend","") + filePath;
    File file = new File(absolutePath);
    if(file.exists()){
      if(file.delete()){
        log.info("Deleted file : " + absolutePath);
      }else{
        log.warn("Failed to delete file : " + absolutePath);
      }
    }else{
      log.warn("File does not exist : " + absolutePath);
    }
  }
}
