package com.mmk.controller;

import java.io.File;
import java.util.Calendar;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mmk.common.ApiResponse;
import com.mmk.dto.NoticeDTO;
import com.mmk.service.NoticeService;

@Controller
@RequestMapping("/notice")
public class NoticeController {

    @Autowired
    private NoticeService noticeService;

    // 글 작성 및 파일 업로드 처리
    @PostMapping("/write")
    public ResponseEntity<ApiResponse<NoticeDTO>> createNotice(
            @RequestParam("noticeFormData") String noticeFormData,
            @RequestParam(value = "file", required = false) MultipartFile noticeFile) {

        String uploadFolder = System.getProperty("user.dir") + "/mickle-muckle/app-backend/src/main/resources/static/fileuploadfolder";
        
        try {
            // NoticeDTO로 변환
            NoticeDTO noticeDTO = new ObjectMapper().readValue(noticeFormData, NoticeDTO.class);
            System.out.println("UserId: " + noticeDTO.getUserId());

            // 파일이 존재하면 업로드
            if (noticeFile != null && !noticeFile.isEmpty()) {
                // 파일명 가져오기
                String fileName = noticeFile.getOriginalFilename();
                
                // 파일명 중복 방지 (랜덤 숫자 추가)
                Calendar cal = Calendar.getInstance();
                int year = cal.get(Calendar.YEAR);
                int month = cal.get(Calendar.MONTH) + 1;
                int date = cal.get(Calendar.DATE);
                Random r = new Random();
                int random = r.nextInt(100000000);
                int index = fileName.lastIndexOf(".");
                String fileExtension = fileName.substring(index + 1);
                String newFileName = "notice_" + year + month + date + random + "." + fileExtension;
                
                // 파일 저장 경로
                String fileDBName = "/fileuploadfolder/" + newFileName;
                File saveFile = new File(uploadFolder + "/" + newFileName);
                
                // 파일 저장
                try {
                    noticeFile.transferTo(saveFile);
                } catch (Exception e) {
                    e.printStackTrace();
                    ApiResponse<NoticeDTO> response = new ApiResponse<>(400, "파일 업로드 실패", null);
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
                }

                // 파일 경로 NoticeDTO에 세팅
                noticeDTO.setImgurl(fileDBName);
            }

            // NoticeService에 저장
            noticeService.save(noticeDTO);

            // 성공 응답
            ApiResponse<NoticeDTO> response = new ApiResponse<>(201, "게시글 저장 성공", noticeDTO);
            return ResponseEntity.ok(response);

        } catch (JsonProcessingException e) {
            e.printStackTrace();
            ApiResponse<NoticeDTO> response = new ApiResponse<>(400, "게시글 저장 오류", null);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }
}
