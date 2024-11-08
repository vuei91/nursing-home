package com.nursing.home.server.service;

import java.util.Map;

public interface RedisService {
    String set(Map<String,String> map);
    String get(String key);
    String getKeyUsername();
    String setKeyUsername(Map<String, String> map);
}
