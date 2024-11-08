package com.nursing.home.server.dto.enroll;

import java.time.LocalDate;
import java.util.UUID;

public interface EnrollReadResponse {
     UUID getEnrollId();
     String getEnrollStatus();
     String getMemberName();
     String getMemberUsername();
     String getMemberPhone();
     String getMemberAddress();
     UUID getPatientId();
     String getPatientName();
     String getPatientAddress();
     String getPatientPhone();
     String getPatientGrade();
     UUID getHospitalId();
     String getHospitalName();
     String getHospitalAddress();
     LocalDate getEnrollStartTime();
     String getHospitalTel();
     String getHospitalWebsite();
}
