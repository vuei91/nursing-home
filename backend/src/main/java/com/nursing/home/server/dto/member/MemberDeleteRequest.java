package com.nursing.home.server.dto.member;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MemberDeleteRequest {
    private String username;
}
