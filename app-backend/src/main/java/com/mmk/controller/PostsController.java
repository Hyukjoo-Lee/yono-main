package com.mmk.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.mmk.service.PostsService;
import com.mmk.dto.PostsDTO;
import org.springframework.web.bind.annotation.PutMapping;








@Controller
@RequestMapping("/posts")
public class PostsController {

    @Autowired
    private PostsService postsService;


   @PostMapping("/write") 
   public ResponseEntity<PostsDTO> createPost(@RequestBody PostsDTO postsData) {
       postsService.save(postsData); // 게시글 저장
       return ResponseEntity.ok(postsData); // 저장한 게시글 반환
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
   @PutMapping("/update") 
   public ResponseEntity<PostsDTO> updatePost(@RequestBody PostsDTO postsData) {
       PostsDTO updatedPost = postsService.updatePost(postsData.getNo(), postsData); // postsService에 수정 로직 추가
       return ResponseEntity.ok(updatedPost);
   }
 
  // 게시글 삭제
@DeleteMapping("/delete/{id}")
public ResponseEntity<String> deletePost(@PathVariable String id) {
    postsService.deletePostById(id); 
    return ResponseEntity.ok("게시글이 삭제되었습니다.");
}

}
