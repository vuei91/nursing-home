package com.nursing.home.server.controller;

import com.nursing.home.server.common.ApiResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @GetMapping("/verify")
    public ApiResponse<String> home () {
        return ApiResponse.ok("Verify Ok");
    }

}
