package com.nursing.home.server.dto.hospital;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.UUID;

@Getter
@Builder
@AllArgsConstructor
public class HospitalDeleteRequest {
    UUID id;
}
