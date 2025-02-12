package com.mmk.controller;

import java.io.File;
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

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


@RestController
@RequestMapping("/posts")
public class PostsController {

    private static final Logger logger = LoggerFactory.getLogger(CardController.class);

    @Value("${IMAGE_PATH}")
    private String uploadDir;

    @Autowired
    private PostsService postsService;

    /*
     * 게시글을 작성하고, 이미지가 포함된 경우 서버에 업로드
     *
     * @param postFormData 게시글 정보를 담은 JSON 문자열
     * @param postFile     업로드할 이미지 파일 (선택 사항)
     * @return 게시글 저장 결과를 포함한 ResponseEntity
     */

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

                File folder = new File(homedir);
                if (!folder.exists()) {
                    folder.mkdirs();
                }

                
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

                pd.setImgurl(fileDBName); 
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

    // 모든 게시글 목록 조회
    @GetMapping("/list")
    public ResponseEntity<List<PostsDTO>> getPosts() {
        List<PostsDTO> posts = postsService.getAllPosts(); 
        return ResponseEntity.ok(posts);
    }

    // 게시글 상세 조회 및 조회수 증가
    @GetMapping("/list/{id}")
    public ResponseEntity<PostsDTO> getPostsByIdAndIncreaseViewCount(@PathVariable int id) {
        PostsDTO posts = postsService.findByIdAndViewCnt(id);
        return ResponseEntity.ok(posts);
    }

    @PutMapping("/update/{no}")
public ResponseEntity<ApiResponse<PostsDTO>> updatePost(
    @PathVariable("no") int no,
    @RequestParam("postFormData") String postFormData,
    @RequestParam(value = "file", required = false) MultipartFile file,
    @RequestParam(value = "originalImage", required = false) String originalImage) {

    try {
        logger.debug("postFormData: {}", postFormData);
        // PostsDTO pd = new ObjectMapper().readValue(postFormData, PostsDTO.class);
        String pno = Integer.toString(no);
         logger.debug("pno:  {}", pno);
        PostsDTO pd = postsService.findById(pno);
        // no 에 해당되는 전 경로 가져오기
        logger.debug("pd:  {}",pd);
        String uploadFolder = uploadDir + "/uploads/images/";
        pd.setNo(no);
        logger.debug("업로드 폴더: {}", uploadDir);
        // 새 파일이 업로드된 경우에만 기존 파일 삭제
        if (file != null && !file.isEmpty() && pd.getImgurl() != null && !pd.getImgurl().isEmpty()) {
            Path oldFilePath = Paths.get(uploadDir, pd.getImgurl()).toAbsolutePath();
            logger.debug("전 사진 경로: {}", oldFilePath);
            File oldFile = oldFilePath.toFile();
            
            if (oldFile.exists()) {
                boolean deleted = oldFile.delete();
                System.out.println(deleted ? "기존 파일 삭제 성공: " + oldFilePath : "기존 파일 삭제 실패: " + oldFilePath);
            } else {
                System.out.println("기존 파일이 존재하지 않음: " + oldFilePath);
            }
        }

        // 새 파일 업로드 로직
        if (file != null && !file.isEmpty()) {
            String originalFileName = file.getOriginalFilename();
            if (originalFileName == null || originalFileName.isEmpty()) {
                throw new RuntimeException("파일 이름을 읽을 수 없습니다.");
            }

            // 저장할 디렉토리 생성
            Calendar cal = Calendar.getInstance();
            String todayDir = uploadFolder + "/" + cal.get(Calendar.YEAR) + "-" + (cal.get(Calendar.MONTH) + 1) + "-" + cal.get(Calendar.DATE);
            File folder = new File(todayDir);
            if (!folder.exists()) folder.mkdirs();

            // 새로운 파일명 생성
            String fileExtension = originalFileName.substring(originalFileName.lastIndexOf(".") + 1);
            String newFileName = "post_" + new Random().nextInt(100000000) + "." + fileExtension;
            String fileDBName = "/uploads/images/" + cal.get(Calendar.YEAR) + "-" + (cal.get(Calendar.MONTH) + 1) + "-" + cal.get(Calendar.DATE) + "/" + newFileName;

            File saveFile = new File(todayDir + "/" + newFileName);
            file.transferTo(saveFile);

            // 새 이미지 URL을 DB에 저장
            pd.setImgurl(fileDBName);
            System.out.println("새 파일 저장 성공: " + saveFile.getAbsolutePath());
        } else {
            // 새 파일이 없으면 기존 이미지 유지
            pd.setImgurl(originalImage);
            System.out.println("새 파일이 없으므로 기존 이미지 유지: " + originalImage);
        }

        // 게시글 업데이트
        postsService.updatePost(pd);

        return ResponseEntity.ok(new ApiResponse<>(200, "게시글 수정 성공", pd));

    } catch (Exception e) {
        e.printStackTrace();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse<>(500, "서버 오류: " + e.getMessage(), null));
    }
}


    //게시글을 삭제하고, 연결된 이미지 파일도 함게 삭제
    @DeleteMapping("/delete/{postId}")
    public ResponseEntity<ApiResponse<String>> deletePost(@PathVariable String postId) {
        try {
            PostsDTO post = postsService.findById(postId);

            if (post == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new ApiResponse<>(404, "게시글을 찾을 수 없습니다.", null));
            }


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
            postsService.deletePostById(postId);
            return ResponseEntity.ok(new ApiResponse<>(200, "게시글과 이미지가 성공적으로 삭제되었습니다.", null));

    } catch (Exception e) {
        e.printStackTrace();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ApiResponse<>(500, "서버 오류: " + e.getMessage(), null));
    }
}
};