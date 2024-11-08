package com.nursing.home.server.controller;

import com.nursing.home.server.common.ApiResponse;
import com.nursing.home.server.dto.hospital.*;
import com.nursing.home.server.service.impl.HospitalServiceImpl;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/hospital")
@RequiredArgsConstructor
public class HospitalController {

    private final HospitalServiceImpl hospitalService;

    @GetMapping("/list")
    public ApiResponse<List<HospitalResponseForList>> getHospitals() {
        return ApiResponse.ok(hospitalService.getHospitals());
    }

    @GetMapping("/{id}")
    public ApiResponse<HospitalReadResponse> getHospital(@PathVariable UUID id) {
        return ApiResponse.ok(hospitalService.getHospital(id));
    }

    @PostMapping("/")
    public ApiResponse<HospitalCUDResponse> createHospital(@RequestBody @Valid HospitalCreateRequest request) {
        return ApiResponse.ok(hospitalService.createHospital(request));
    }

    @PutMapping("/{id}")
    public ApiResponse<HospitalCUDResponse> updateHospital(@PathVariable UUID id, @RequestBody @Valid HospitalUpdateRequest request) {
        return ApiResponse.ok(hospitalService.updateHospital(id, request));
    }

    @DeleteMapping("/{id}")
    public ApiResponse<HospitalCUDResponse> deleteHospital(@PathVariable UUID id) {
        return ApiResponse.ok(hospitalService.deleteHospital(id));
    }
}
