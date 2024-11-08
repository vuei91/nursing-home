package com.nursing.home.server.controller;

import com.nursing.home.server.common.ApiResponse;
import com.nursing.home.server.dto.patient.PatientCreateRequest;
import com.nursing.home.server.dto.patient.PatientCUDResponse;
import com.nursing.home.server.dto.patient.PatientReadResponse;
import com.nursing.home.server.dto.patient.PatientUpdateRequest;
import com.nursing.home.server.service.impl.PatientServiceImpl;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/patient")
public class PatientController {
    private final PatientServiceImpl patientServiceImpl;

    @GetMapping("/{id}")
    public ApiResponse<PatientReadResponse> getPatient(@PathVariable UUID id) {
        return ApiResponse.ok(patientServiceImpl.getPatient(id));
    }

    @PostMapping("/")
    public ApiResponse<PatientCUDResponse> createPatient(@RequestBody @Valid PatientCreateRequest request) {
        return ApiResponse.ok(patientServiceImpl.createPatient(request));
    }

    @PutMapping("/{id}")
    public ApiResponse<PatientCUDResponse> updatePatient(@PathVariable UUID id, @RequestBody @Valid PatientUpdateRequest request) {
        return ApiResponse.ok(patientServiceImpl.updatePatient(id, request));
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Integer> deletePatient(@PathVariable UUID id) {
        return ApiResponse.ok(patientServiceImpl.deletePatient(id));
    }
}
