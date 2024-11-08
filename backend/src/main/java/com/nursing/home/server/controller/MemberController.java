package com.nursing.home.server.controller;

import com.nursing.home.server.common.ApiResponse;
import com.nursing.home.server.dto.member.MemberCUDResponse;
import com.nursing.home.server.dto.member.MemberCreateRequest;
import com.nursing.home.server.dto.member.MemberReadResponse;
import com.nursing.home.server.dto.member.MemberUpdateRequest;
import com.nursing.home.server.service.impl.MemberServiceImpl;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/member")
public class MemberController {

    private final MemberServiceImpl memberServiceImpl;

    @GetMapping("/")
    public ApiResponse<MemberReadResponse> memberReadResponse() {
        return ApiResponse.ok(memberServiceImpl.getMember());
    }

    @PostMapping("/")
    public ApiResponse<MemberCUDResponse> createMember(@RequestBody @Valid MemberCreateRequest request) {
        log.info(request.toString());
        return ApiResponse.ok(memberServiceImpl.createMember(request));
    }

    @PutMapping("/{username}")
    public ApiResponse<MemberCUDResponse> updateMember(@PathVariable String username, @RequestBody @Valid MemberUpdateRequest request) {
        log.info(username);
        log.info(request.toString());
        return ApiResponse.ok(memberServiceImpl.updateMember(username, request));
    }

    @DeleteMapping("/{username}")
    public ApiResponse<MemberCUDResponse> deleteMember(@PathVariable String username) {
        log.info(username);
        return ApiResponse.ok(memberServiceImpl.deleteMember(username));
    }
}
