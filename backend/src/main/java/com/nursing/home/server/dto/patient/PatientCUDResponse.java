package com.nursing.home.server.dto.patient;

import com.nursing.home.server.entity.Patient;
import lombok.*;

import java.util.UUID;

@Getter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PatientCUDResponse {
    private UUID id;
    private String name;
    private String phone;
    private Integer grade;
    private String address;
    private String detailAddress;

    public PatientCUDResponse(Patient patient) {
        this.id = patient.getId();
        this.name = patient.getName();
        this.phone = patient.getPhone();
        this.grade = patient.getGrade();
        this.address = patient.getAddress();
        this.detailAddress = patient.getDetailAddress();
    }
}
