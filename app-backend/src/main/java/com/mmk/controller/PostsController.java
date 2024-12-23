package com.mmk.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.mmk.service.PostsService;
import com.mmk.vo.PostsVO;


@Controller
@RequestMapping("/posts")
public class PostsController {

    @Autowired
    private PostsService postsService;


   @PostMapping("/create-post")
   public ResponseEntity<PostsVO> createPost(@RequestBody PostsVO postsData) {
       postsService.save(postsData); // 게시글 저장
       return ResponseEntity.ok(postsData); // 저장한 게시글 반환
   }

@GetMapping("/get-posts")
public ResponseEntity<List<PostsVO>> getPosts() {
    List<PostsVO> posts = postsService.getAllPosts(); // 모든 게시글을 가져옴
    return ResponseEntity.ok(posts);
}

    


    
}
