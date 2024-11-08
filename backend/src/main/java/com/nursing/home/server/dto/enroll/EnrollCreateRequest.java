package com.nursing.home.server.dto.enroll;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@ToString
public class EnrollCreateRequest {
    private List<UUID> patientIds;
    private UUID hospitalId;
    private LocalDateTime startTime;
}
