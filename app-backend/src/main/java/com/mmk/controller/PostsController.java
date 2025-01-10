package com.mmk.controller;

import java.io.File;
import java.util.Calendar;
import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mmk.common.ApiResponse;
import com.mmk.dto.PostsDTO;
import com.mmk.service.PostsService;


@RestController
@RequestMapping("/posts")
public class PostsController {

    @Autowired
    private PostsService postsService;


    @PostMapping("/write") 
    public ResponseEntity<ApiResponse<PostsDTO>> createPost(
            @RequestParam("postFormData") String postFormData,
            @RequestParam(value = "file", required = false) MultipartFile postFile) {

        String uploadFolder = System.getProperty("user.dir")
                + "/mickle-muckle/app-backend/src/main/resources/static/fileuploadfolder";

        try {
            PostsDTO pd = new ObjectMapper().readValue(postFormData, PostsDTO.class);

            if (postFile != null && !postFile.isEmpty()) {
                String fileName = postFile.getOriginalFilename();

                Calendar cal = Calendar.getInstance();
                int year = cal.get(Calendar.YEAR);
                int month = cal.get(Calendar.MONTH) + 1;
                int date = cal.get(Calendar.DATE);

                Random r = new Random();
                int random = r.nextInt(100000000);
                int index = fileName.lastIndexOf(".");
                String fileExtension = fileName.substring(index + 1);
                String newFileName = "post_" + year + month + date + random + "." + fileExtension;

                String fileDBName = "/fileuploadfolder/" + newFileName;

                File saveFile = new File(uploadFolder + "/" + newFileName);

                try {
                    postFile.transferTo(saveFile);
                } catch (Exception e) {
                    e.printStackTrace();
                }

                pd.setImgurl(fileDBName);

            }

            postsService.save(pd);
            
            ApiResponse<PostsDTO> response = new ApiResponse<>(201, "게시글 저장 성공", pd);
            return ResponseEntity.ok(response);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            ApiResponse<PostsDTO> response = new ApiResponse<>(400, "게시글 저장 오류", null);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    //모든 게시글 목록 조회 
    @GetMapping("/list") 
    public ResponseEntity<List<PostsDTO>> getPosts() {
    List<PostsDTO> posts = postsService.getAllPosts(); // 모든 게시글을 가져옴
    return ResponseEntity.ok(posts);
    }

    //게시글 상세 조회
    @GetMapping("/list/{id}")
    public ResponseEntity<PostsDTO> getPostsById(@PathVariable String id) {
    PostsDTO posts = postsService.findById(id);
    return ResponseEntity.ok(posts);
    }
    
    // 게시글 수정
    @PutMapping("/update/{userId}") 
        public ResponseEntity<ApiResponse<PostsDTO>> updatePost(
        @PathVariable("userId")  String userId,
        @RequestPart("postFormData") String postFormData,
        @RequestPart(value = "file", required = false) MultipartFile file) {

        String uploadFolder = System.getProperty("user.dir") + "/mickle-muckle/app-backend/src/main/resources/static/fileuploadfolder";
        try {
            // JSON 문자열을 PostsDTO 객체로 변환
            PostsDTO ed = new ObjectMapper().readValue(postFormData, PostsDTO.class);
            ed.setUserId(userId);
        // 파일이 업로드된 경우, 기존 파일을 덮어쓰는 방식으로 처리
        if (file != null && !file.isEmpty()) {
            String fileName = file.getOriginalFilename();

            // 날짜 및 랜덤 값으로 새 파일 이름 생성
            Calendar cal = Calendar.getInstance();
            int year = cal.get(Calendar.YEAR);
            int month = cal.get(Calendar.MONTH) + 1;
            int date = cal.get(Calendar.DATE);

            Random r = new Random();
            int random = r.nextInt(100000000);
            int index = fileName.lastIndexOf(".");
            String fileExtension = fileName.substring(index + 1);
            String newFileName = "post_" + year + month + date + random + "." + fileExtension;

            // 새 파일 경로
            String fileDBName = "/fileuploadfolder/" + newFileName;

            // 파일이 저장될 실제 경로
            File saveFile = new File(uploadFolder + "/" + newFileName);

            // 기존 파일 삭제 (필요한 경우)
            if (ed.getImgurl() != null && !ed.getImgurl().isEmpty()) {
                File oldFile = new File(uploadFolder + ed.getImgurl().replace("/fileuploadfolder/", ""));
                if (oldFile.exists()) {
                    oldFile.delete(); // 기존 파일 삭제
                }
            }

            // 새 파일 저장
            try {
                file.transferTo(saveFile);
                ed.setImgurl(fileDBName); // 새로 저장한 파일의 경로를 설정
            } catch (Exception e) {
                e.printStackTrace();
            }
            ed.setImgurl(fileDBName);
        }
        postsService.updatePost(ed);

        

        ApiResponse<PostsDTO> response = new ApiResponse<>(201, "게시글 저장 성공", ed);
            return ResponseEntity.ok(response);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            ApiResponse<PostsDTO> response = new ApiResponse<>(400, "게시글 저장 오류", null);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    // 게시글 삭제
    @DeleteMapping("/delete/{postId}")
    public ResponseEntity<String> deletePost(@PathVariable String postId) {
    postsService.deletePostById(postId);
    return ResponseEntity.ok("게시글이 삭제되었습니다.");
    }


};
