package com.nursing.home.server.dto.hospital;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.time.LocalTime;
import java.util.List;

@Builder
@Getter
@AllArgsConstructor
@ToString
public class HospitalCreateRequest {
    // 병원이름
    private String name;
    private String tel;
    // 병원주소
    private String address;
    private String category;
    // 위도
    private String latitude;
    // 경도
    private String longitude;
    private String doctors;
    private String subject;
    private String convenience;
    private String parking;
    // 진료시간
    private List<ClinicHoursCreateRequest> clinicHoursList;
}
