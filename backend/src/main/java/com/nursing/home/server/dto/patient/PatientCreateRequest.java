package com.nursing.home.server.dto.patient;

import lombok.*;


@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class PatientCreateRequest {
    private String name;
    private String phone;
    private String address;
    private Integer grade;
    private String longitude;
    private String latitude;
    private String detailAddress;
}
