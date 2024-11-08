package com.nursing.home.server.service.impl;

import com.nursing.home.server.common.GlobalStorage;
import com.nursing.home.server.dto.enroll.*;
import com.nursing.home.server.entity.*;
import com.nursing.home.server.exception.*;
import com.nursing.home.server.repository.*;
import com.nursing.home.server.service.EnrollService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class EnrollServiceImpl implements EnrollService {
    private final EnrollRepository enrollRepository;
    private final PatientRepository patientRepository;
    private final HospitalRepository hospitalRepository;
    private final MemberRepository memberRepository;
    private final RelationRepository relationRepository;

    @Override
    public List<EnrollHistoryMainResponse> getEnrollHistoryMainList() {
        String username = GlobalStorage.getUsername();
        return enrollRepository.findHistoryMainList(username);
    }

    @Override
    public List<EnrollHistoryDetailResponse> getEnrollHistoryDetail(UUID patientId) {
        String username = GlobalStorage.getUsername();
        return enrollRepository.findHistoryDetailList(username, patientId);
    }

    @Override
    public List<EnrollReadResponse> getEnrollsByHospital(UUID hospitalId) {
        String username = GlobalStorage.getUsername();
        return enrollRepository.findEnrollsByUsernameAndHospital(username, hospitalId);
    }

    @Override
    public List<EnrollReadResponse> getEnrollLsByPatient(UUID patientId) {
        String username = GlobalStorage.getUsername();
        return enrollRepository.findEnrollsByUsernameAndPatient(username, patientId);
    }

    @Override
    @Transactional
    public List<EnrollCUDResponse> createEnrolls(EnrollCreateRequest request) {
        String username = GlobalStorage.getUsername();
        List<UUID> patientIds = request.getPatientIds();
        List<EnrollCUDResponse> enrolls = new ArrayList<>();
        Member member = memberRepository
                .findByUsername(username)
                .orElseThrow(NotFoundMemberException::new);
        Hospital hospital = hospitalRepository
                .findById(request.getHospitalId())
                .orElseThrow(NotFoundHospitalException::new);
        for (UUID patientId : patientIds) {
            Relation relation = relationRepository
                    .findByMemberIdAndPatientId(member.getId(), patientId)
                    .orElseThrow(NotFoundRelationException::new);
            Patient patient = patientRepository
                    .findById(patientId)
                    .orElseThrow(NotFoundPatientException::new);
            Enroll enroll = new Enroll(hospital, relation, request);
            Enroll newEnroll = enrollRepository.save(enroll);
            enrolls.add(new EnrollCUDResponse(newEnroll, patient, member));
        }
        return enrolls;
    }

    @Override
    public EnrollCUDResponse cancel(UUID id) {
        Enroll enroll = enrollRepository.findById(id).orElseThrow(NotFoundEnrollException::new);
        enroll.cancel();
        Enroll newEnroll = enrollRepository.save(enroll);
        return new EnrollCUDResponse(newEnroll);
    }

    @Override
    public EnrollCUDResponse progress(UUID id) {
        Enroll enroll = enrollRepository.findById(id).orElseThrow(NotFoundEnrollException::new);
        enroll.progress();
        Enroll newEnroll = enrollRepository.save(enroll);
        return new EnrollCUDResponse(newEnroll);
    }
}
