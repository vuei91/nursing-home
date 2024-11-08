package com.nursing.home.server.service;

import com.nursing.home.server.dto.member.MemberCreateRequest;
import com.nursing.home.server.dto.member.MemberCUDResponse;
import com.nursing.home.server.dto.member.MemberReadResponse;
import com.nursing.home.server.dto.member.MemberUpdateRequest;

public interface MemberService {

    MemberReadResponse getMember();
    MemberCUDResponse createMember(MemberCreateRequest request);
    MemberCUDResponse deleteMember(String id);
    MemberCUDResponse updateMember(String id, MemberUpdateRequest request);
}
