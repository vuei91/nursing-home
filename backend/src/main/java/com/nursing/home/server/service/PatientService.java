package com.nursing.home.server.service;

import com.nursing.home.server.dto.patient.PatientCreateRequest;
import com.nursing.home.server.dto.patient.PatientCUDResponse;
import com.nursing.home.server.dto.patient.PatientReadResponse;
import com.nursing.home.server.dto.patient.PatientUpdateRequest;

import java.util.UUID;

public interface PatientService {
    PatientCUDResponse createPatient(PatientCreateRequest request);
    Integer deletePatient(UUID id);
    PatientCUDResponse updatePatient(UUID id, PatientUpdateRequest request);
    PatientReadResponse getPatient(UUID id);
}
