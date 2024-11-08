package com.nursing.home.server.dto.patient;

import com.nursing.home.server.entity.Patient;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PatientReadResponse {
    private UUID id;
    private String name;
    private String phone;
    private Integer grade;
    private String address;
    private String detailAddress;

    public PatientReadResponse(Patient patient) {
        this.id = patient.getId();
        this.name = patient.getName();
        this.phone = patient.getPhone();
        this.grade = patient.getGrade();
        this.address = patient.getAddress();
        this.detailAddress = patient.getDetailAddress();
    }
}
