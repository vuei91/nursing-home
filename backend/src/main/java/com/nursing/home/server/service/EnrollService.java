package com.nursing.home.server.service;

import com.nursing.home.server.dto.enroll.*;

import java.util.List;
import java.util.UUID;

public interface EnrollService {
    List<EnrollHistoryMainResponse> getEnrollHistoryMainList();
    List<EnrollHistoryDetailResponse> getEnrollHistoryDetail(UUID patientId);
    List<EnrollReadResponse> getEnrollsByHospital(UUID hospitalId);
    List<EnrollReadResponse> getEnrollLsByPatient(UUID patientId);
    List<EnrollCUDResponse> createEnrolls(EnrollCreateRequest request);
    EnrollCUDResponse cancel(UUID id);
    EnrollCUDResponse progress(UUID id);
}
