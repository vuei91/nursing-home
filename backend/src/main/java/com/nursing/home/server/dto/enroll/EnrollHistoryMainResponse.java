package com.nursing.home.server.dto.enroll;

import java.util.UUID;

public interface EnrollHistoryMainResponse {
    String getUsername();
    String getMemberName();
    UUID getPatientId();
    String getPatientName();
    String getHospitalName();
    String getEnrollStatus();
    Integer getExceptCount();
}
