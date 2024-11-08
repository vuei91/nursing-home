package com.nursing.home.server.repository;

import com.nursing.home.server.entity.CareWorker;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface CareWorkerRepository extends JpaRepository<CareWorker, UUID> {
}
