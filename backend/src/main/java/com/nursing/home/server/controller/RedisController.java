package com.nursing.home.server.controller;

import com.nursing.home.server.common.ApiResponse;
import com.nursing.home.server.service.impl.RedisServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/redis")
public class RedisController {

    private final RedisServiceImpl redisService;

    @PostMapping("/username")
    public ApiResponse<String> addKeyUsername(@RequestBody Map<String, String> map) {
        String result = redisService.setKeyUsername(map);
        return ApiResponse.ok(result);
    }

    @GetMapping("/username")
    public ApiResponse<String> getKeyUsername() {
        String result = redisService.getKeyUsername();
        return ApiResponse.ok(result);
    }

    @PostMapping("/")
    public ApiResponse<String> addRedisKey(@RequestBody Map<String, String> map) {
        String result = redisService.set(map);
        return ApiResponse.ok(result);
    }

    @GetMapping("/{key}")
    public ApiResponse<String> addRedisKey(@PathVariable String key) {
        String result = redisService.get(key);
        return ApiResponse.ok(result);
    }
}
