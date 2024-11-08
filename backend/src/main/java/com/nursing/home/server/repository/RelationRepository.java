package com.nursing.home.server.repository;

import com.nursing.home.server.entity.Relation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface RelationRepository extends JpaRepository<Relation, UUID> {
    Optional<Relation> findByMemberIdAndPatientId(UUID memberId, UUID patientId);
    List<Relation> findAllByMemberId(UUID memberId);
}
