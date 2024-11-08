package com.nursing.home.server.dto.hospital;

import com.nursing.home.server.entity.ClinicHours;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.UUID;

@Getter
@AllArgsConstructor
@Builder
public class ClinicHoursCUDResponse {
    private UUID id;
    private String weekName;
    private String weekTime;
    private String deadlineTime;
    private String breakTime;

    public ClinicHoursCUDResponse(ClinicHours clinicHours) {
        this.id = clinicHours.getId();
        this.weekName = clinicHours.getWeekName();
        this.weekTime = clinicHours.getWeekTime();
        this.deadlineTime = clinicHours.getDeadlineTime();
        this.breakTime = clinicHours.getBreakTime();
    }
}
