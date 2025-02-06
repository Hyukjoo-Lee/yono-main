package com.mmk.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Calendar;
import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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


    @Value("${IMAGE_PATH}")
    private String uploadDir;

    @Autowired
    private PostsService postsService;

    @PostMapping("/write")
    public ResponseEntity<ApiResponse<PostsDTO>> createPost(
        @RequestParam("postFormData") String postFormData,
        @RequestParam(value = "file", required = false) MultipartFile postFile) {

    try {
        PostsDTO pd = new ObjectMapper().readValue(postFormData, PostsDTO.class);
        System.out.println("UserId: " + pd.getUserId());
        String uploadFolder = uploadDir + "/uploads/images";

        if (postFile != null && !postFile.isEmpty()) {
            String fileName = postFile.getOriginalFilename();

            if (fileName != null) {

                // 날짜 기반 폴더 생성
                Calendar cal = Calendar.getInstance();
                int year = cal.get(Calendar.YEAR);
                int month = cal.get(Calendar.MONTH) + 1;
                int date = cal.get(Calendar.DATE);

                String homedir = uploadFolder + "/" + year + "-" + month + "-" + date;

                // 폴더 생성
                File folder = new File(homedir);
                if (!folder.exists()) {
                    folder.mkdirs();
                }

                // 랜덤 파일명 생성
                Random r = new Random();
                int random = r.nextInt(100000000);
                int index = fileName.lastIndexOf(".");
                String fileExtension = fileName.substring(index + 1);
                String newFileName = "post_" + random + "." + fileExtension;

                String fileDBName = "/uploads/images/" + year + "-" + month + "-" + date + "/" + newFileName;
                File saveFile = new File(homedir + "/" + newFileName);

                try {
                    postFile.transferTo(saveFile);
                } catch (Exception e) {
                    e.printStackTrace();
                    ApiResponse<PostsDTO> response = new ApiResponse<>(500, "파일 저장 실패", null);
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
                }

                pd.setImgurl(fileDBName); // DB에 저장될 이미지 URL 설정
            } else {
                ApiResponse<PostsDTO> response = new ApiResponse<>(400, "파일 이름이 없습니다", null);
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
            }
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
    public ResponseEntity<PostsDTO> getPostsByIdAndIncreaseViewCount(@PathVariable int id) {
        PostsDTO posts = postsService.findByIdAndViewCnt(id);
        return ResponseEntity.ok(posts);
    }

    @PutMapping("/update/{no}")
    public ResponseEntity<ApiResponse<PostsDTO>> updatePost(
        @PathVariable("no") int no,
        @RequestParam("postFormData") String postFormData,
        @RequestParam(value = "file", required = false) MultipartFile file) { 

    try {
        // JSON 문자열을 PostsDTO 객체로 변환
        PostsDTO ed = new ObjectMapper().readValue(postFormData, PostsDTO.class);
        String uploadFolder = uploadDir + "/uploads/images";

        // 게시글 ID 설정
        ed.setNo(no);

        // 파일이 업로드된 경우 처리
        if (file != null && !file.isEmpty()) {
            String originalFileName = file.getOriginalFilename();
            if (originalFileName == null || originalFileName.isEmpty()) {
                throw new RuntimeException("파일 이름을 읽을 수 없습니다.");
            }
            System.out.println("업로드된 파일 이름: " + originalFileName);  

            // 날짜별 폴더 생성
            Calendar cal = Calendar.getInstance();
            int year = cal.get(Calendar.YEAR);
            int month = cal.get(Calendar.MONTH) + 1;
            int date = cal.get(Calendar.DATE);

            String homedir = uploadFolder + "/" + year + "-" + month + "-" + date;
            // 폴더 생성
            File folder = new File(homedir);
            if (!folder.exists()) {
                folder.mkdirs();
                System.out.println("새로운 폴더 생성: " + homedir);  // 폴더 생성 확인
            }

            // 랜덤 값으로 새 파일 이름 생성
            Random random = new Random();
            int randomNum = random.nextInt(100000000);

            int index = originalFileName.lastIndexOf(".");
            String fileExtension = originalFileName.substring(index + 1);
            String newFileName = "post_" + randomNum + "." + fileExtension;

            // 새 파일 경로 설정
            String fileDBName = "/uploads/images/" + year + "-" + month + "-" + date + "/" + newFileName;
            File saveFile = new File(homedir + "/" + newFileName); // 실제 파일 경로

            // 파일 저장
            try {
                file.transferTo(saveFile);
                System.out.println("새 파일 저장 성공: " + saveFile.getAbsolutePath());  // 파일 저장 경로 출력
            } catch (IOException e) {
                e.printStackTrace();
                throw new RuntimeException("파일 저장 중 오류 발생: " + e.getMessage(), e);
            }

            // 새 파일 경로 업데이트
            ed.setImgurl(fileDBName);
        }

        // 게시글 수정
        postsService.updatePost(ed);

        // 성공 응답
        ApiResponse<PostsDTO> response = new ApiResponse<>(200, "게시글 수정 성공", ed);
        return ResponseEntity.ok(response);

    } catch (JsonProcessingException e) {
        // JSON 파싱 오류 처리
        e.printStackTrace();
        ApiResponse<PostsDTO> response = new ApiResponse<>(400, "JSON 파싱 오류: " + e.getMessage(), null);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);

    } catch (Exception e) {
        // 기타 서버 오류 처리
        e.printStackTrace();
        ApiResponse<PostsDTO> response = new ApiResponse<>(500, "서버 오류: " + e.getMessage(), null);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }
}


    @DeleteMapping("/delete/{postId}")
    public ResponseEntity<ApiResponse<String>> deletePost(@PathVariable String postId) {
    try {
        // 삭제하려는 게시글 조회하여 이미지 경로 확인
        PostsDTO post = postsService.findById(postId);

        if (post == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse<>(404, "게시글을 찾을 수 없습니다.", null));
        }

        // 게시글과 연결된 이미지 파일 삭제
        if (post.getImgurl() != null && !post.getImgurl().isEmpty()) {
					  //절대 경로로 변환
            Path filePath = Paths.get(uploadDir, post.getImgurl()).toAbsolutePath();
            System.out.println("삭제 파일 :" + filePath);

            File file = filePath.toFile();
            if (file.exists() && file.isFile()) {
                boolean deleted = file.delete();
                if (!deleted) {
                    System.err.println("이미지 파일 삭제 실패: " + filePath);
                } else {
                    System.out.println("이미지 파일 삭제 성공: " + filePath);
                }
            }
        }

        // 데이터베이스에서 게시글 삭제
        postsService.deletePostById(postId);

        // 성공 응답 반환
        return ResponseEntity.ok(new ApiResponse<>(200, "게시글과 이미지가 성공적으로 삭제되었습니다.", null));

    } catch (Exception e) {
        e.printStackTrace();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ApiResponse<>(500, "서버 오류: " + e.getMessage(), null));
    }
}



};
