package com.nursing.home.server.dto.enroll;

import java.util.UUID;

public interface EnrollHistoryDetailResponse {
    String getMemberName();
    String getPatientName();
    String getHospitalName();
    String getHospitalAddress();
    String getEnrollStatus();
    UUID getHospitalId();
}
