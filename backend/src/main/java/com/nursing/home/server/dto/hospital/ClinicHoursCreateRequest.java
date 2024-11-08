package com.nursing.home.server.dto.hospital;

import lombok.*;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class ClinicHoursCreateRequest {
    private String weekName;
    private String weekTime;
    private String deadlineTime;
    private String breakTime;
}
