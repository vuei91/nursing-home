package com.nursing.home.server.service;

import com.nursing.home.server.service.impl.MemberServiceImpl;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;

@Transactional
@SpringBootTest
@Rollback(false)
class MemberServiceTest {

    @Autowired
    private MemberServiceImpl memberServiceImpl;
    @Test
    public void 회원등록(){

    }
}