package com.nursing.home.server.service.impl;

import com.nursing.home.server.common.GlobalStorage;
import com.nursing.home.server.dto.patient.PatientCUDResponse;
import com.nursing.home.server.dto.patient.PatientCreateRequest;
import com.nursing.home.server.dto.patient.PatientReadResponse;
import com.nursing.home.server.dto.patient.PatientUpdateRequest;
import com.nursing.home.server.entity.Member;
import com.nursing.home.server.entity.Patient;
import com.nursing.home.server.entity.Relation;
import com.nursing.home.server.exception.NotFoundMemberException;
import com.nursing.home.server.exception.NotFoundPatientException;
import com.nursing.home.server.repository.MemberRepository;
import com.nursing.home.server.repository.PatientRepository;
import com.nursing.home.server.repository.RelationRepository;
import com.nursing.home.server.service.PatientService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PatientServiceImpl implements PatientService {
    private final MemberRepository memberRepository;
    private final PatientRepository patientRepository;
    private final RelationRepository relationRepository;

    @Override
    public PatientReadResponse getPatient(UUID id) {
        Patient patient = patientRepository.findById(id).orElseThrow(NotFoundPatientException::new);
        return new PatientReadResponse(patient);
    }

    @Override
    @Transactional
    public PatientCUDResponse createPatient(PatientCreateRequest request) {
        String username = GlobalStorage.getUsername();
        Member member = memberRepository
                .findByUsername(username)
                .orElseThrow(NotFoundMemberException::new);
        Patient patient = new Patient(request);
        Relation relation = Relation
                .builder()
                .member(member)
                .patient(patient)
                .build();
        relationRepository.save(relation);
        Patient newPatient = patientRepository.save(patient);
        return new PatientCUDResponse(newPatient);
    }

    @Override
    @Transactional
    public Integer deletePatient(UUID id) {
        Patient patient = patientRepository.findById(id).orElseThrow(NotFoundPatientException::new);
        patientRepository.delete(patient);
        String username = GlobalStorage.getUsername();
        UUID memberId = memberRepository.findByUsername(username).orElseThrow(NotFoundMemberException::new).getId();
        List<Relation> relations = relationRepository.findAllByMemberId(memberId);
        System.out.println(relations.size());
        return relations.size();
    }

    @Override
    @Transactional
    public PatientCUDResponse updatePatient(UUID id, PatientUpdateRequest request) {
        Patient updatedPatient = patientRepository.findById(id).orElseThrow(NotFoundPatientException::new);
        updatedPatient.update(request);
        Patient patient = patientRepository.save(updatedPatient);
        return new PatientCUDResponse(patient);
    }

}
