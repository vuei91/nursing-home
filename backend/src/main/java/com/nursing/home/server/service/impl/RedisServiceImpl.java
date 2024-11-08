package com.nursing.home.server.service.impl;

import com.nimbusds.jose.shaded.gson.Gson;
import com.nimbusds.jose.shaded.gson.reflect.TypeToken;
import com.nursing.home.server.common.GlobalStorage;
import com.nursing.home.server.service.RedisService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class RedisServiceImpl implements RedisService {

    private final RedisTemplate<String, String> redisTemplate;
    private final Gson gson = new Gson();

    @Override
    public String set(Map<String, String> map) {
        ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();
        valueOperations.set(map.get("key"), map.get("value"));
        return "Success Redis Setting(map: " + map + ")";
    }

    @Override
    public String setKeyUsername(Map<String,String> map) {
        Map<String, String> newMap = new HashMap<>();
        String username = GlobalStorage.getUsername();
        String jsonData = getKeyUsername();
        if (jsonData != null) {
            newMap = gson.fromJson(jsonData, new TypeToken<Map<String, String>>() {
            }.getType());
        }
        Set<String> keys = map.keySet();
        for (String key : keys) {
            newMap.put(key, map.get(key));
        }
        String putData = gson.toJson(newMap);
        ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();
        valueOperations.set(username, putData);
        return "Success Redis Setting(username: " + username + ", map: " + map + ")";
    }

    @Override
    public String getKeyUsername() {
        String username = GlobalStorage.getUsername();
        ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();
        return valueOperations.get(username);
    }

    @Override
    public String get(String key) {
        ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();
        return valueOperations.get(key);
    }
}
