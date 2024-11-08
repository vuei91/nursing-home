package com.nursing.home.server.controller;

import com.nursing.home.server.common.ApiResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/oauth2")
public class OAuth2Controller {
    @GetMapping("/login")
    public ApiResponse<String> login() {
        return ApiResponse.ok("로그인 성공");
    }

    @GetMapping("/logout")
    public ApiResponse<String> logout() {
        return ApiResponse.ok("로그아웃 성공");
    }
}
