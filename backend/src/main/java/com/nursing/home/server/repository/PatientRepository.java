package com.nursing.home.server.repository;

import com.nursing.home.server.entity.Patient;
import com.nursing.home.server.entity.Relation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface PatientRepository extends JpaRepository<Patient, UUID> {
    List<Patient> findAllByRelationsIn(List<Relation> relations);
}
