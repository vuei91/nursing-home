package com.nursing.home.server.dto.hospital;

import com.nursing.home.server.entity.Hospital;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;


import java.util.List;
import java.util.UUID;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class HospitalReadResponse {
    private UUID id;
    private String name;
    private String tel;
    private String address;
    private String category;
    private String subject;
    private String doctors;
    private List<ClinicHoursReadResponse> clinicHoursList;
    // 위도
    private String latitude;
    // 경도
    private String longitude;
    private String convenience;
    private String parking;

    public HospitalReadResponse(Hospital hospital) {
        this.id = hospital.getId();
        this.name = hospital.getName();
        this.tel = hospital.getTel();
        this.address = hospital.getAddress();
        this.latitude = hospital.getLatitude();
        this.longitude = hospital.getLongitude();
        this.category = hospital.getCategory();
        this.subject = hospital.getSubject();
        this.doctors = hospital.getDoctors();
        this.convenience = hospital.getConvenience();
        this.parking = hospital.getParking();
        this.clinicHoursList = hospital.getClinicHoursList().stream().map(ClinicHoursReadResponse::new).toList();
    }
}
