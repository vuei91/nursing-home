package com.nursing.home.server.controller;

import com.nursing.home.server.common.ApiResponse;
import com.nursing.home.server.dto.enroll.*;
import com.nursing.home.server.service.impl.EnrollServiceImpl;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@Slf4j
@RestController
@RequestMapping("/enroll")
@RequiredArgsConstructor
public class EnrollController {

    private final EnrollServiceImpl enrollServiceImpl;

    @GetMapping("/")
    public ApiResponse<List<EnrollHistoryMainResponse>> getEnrollHistoryMainList() {
        return ApiResponse.ok(enrollServiceImpl.getEnrollHistoryMainList());
    }

    @GetMapping("/{patientId}")
    public ApiResponse<List<EnrollHistoryDetailResponse>> getEnrollHistoryDetail(@PathVariable UUID patientId) {
        return ApiResponse.ok(enrollServiceImpl.getEnrollHistoryDetail(patientId));
    }

    @GetMapping("/hospital/{hospitalId}")
    public ApiResponse<List<EnrollReadResponse>> getEnrollLsByHospital(@PathVariable UUID hospitalId) {
        return ApiResponse.ok(enrollServiceImpl.getEnrollsByHospital(hospitalId));
    }

    @GetMapping("/patient/{patientId}")
    public ApiResponse<List<EnrollReadResponse>> getEnrollLsByPatient(@PathVariable UUID patientId) {
        return ApiResponse.ok(enrollServiceImpl.getEnrollLsByPatient(patientId));
    }

    @PostMapping("/")
    public ApiResponse<List<EnrollCUDResponse>> createEnroll(@RequestBody @Valid EnrollCreateRequest request) {
        return ApiResponse.ok(enrollServiceImpl.createEnrolls(request));
    }

    @PutMapping("/progress/{id}")
    public ApiResponse<EnrollCUDResponse> progress(@PathVariable UUID id) {
        return ApiResponse.ok(enrollServiceImpl.progress(id));
    }

    @PutMapping("/cancel/{id}")
    public ApiResponse<EnrollCUDResponse> cancel(@PathVariable UUID id) {
        return ApiResponse.ok(enrollServiceImpl.cancel(id));
    }
}
