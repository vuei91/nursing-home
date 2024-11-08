package com.nursing.home.server.dto.patient;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.util.UUID;

@Getter
@Builder
@ToString
public class PatientDeleteRequest {
    private UUID id;
}
