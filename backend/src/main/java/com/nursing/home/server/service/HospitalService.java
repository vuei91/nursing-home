package com.nursing.home.server.service;

import com.nursing.home.server.dto.hospital.*;

import java.util.List;
import java.util.UUID;

public interface HospitalService {

    List<HospitalResponseForList> getHospitals();

    HospitalReadResponse getHospital(UUID id);

    HospitalCUDResponse createHospital(HospitalCreateRequest request);
    HospitalCUDResponse deleteHospital(UUID id);
    HospitalCUDResponse updateHospital(UUID id, HospitalUpdateRequest request);
}
