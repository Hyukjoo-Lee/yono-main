package com.mmk.controller;

import java.io.File;
import java.io.IOException;
import java.util.Calendar;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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

    @PostMapping("/write")
    public ResponseEntity<Void> saveNotice(@RequestBody NoticeDTO noticeDTO,
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
        String propertyPath = System.getProperty("user.dir").replace("\\app-backend","");
        String uploadFolder = propertyPath + "\\uploads\\images";

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
        String fileDBName = "/uploads/images" + year + "-" + month + "-" + date + "/" + newFileName;

        File saveFile = new File(homedir + "/" + newFileName);
        log.info("파일 저장 경로 : " + saveFile.getAbsolutePath());

        try{
            file.transferTo(saveFile);
        }catch(Exception e){
            e.printStackTrace();
        }

        return fileDBName;
    }
}
