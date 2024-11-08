package com.nursing.home.server.repository;

import com.nursing.home.server.entity.ClinicHours;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ClinicHoursRepository extends JpaRepository<ClinicHours, UUID> {
}
