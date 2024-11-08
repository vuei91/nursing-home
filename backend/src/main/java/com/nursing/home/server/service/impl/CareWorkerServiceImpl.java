package com.nursing.home.server.service.impl;

import com.nursing.home.server.entity.CareWorker;
import com.nursing.home.server.repository.CareWorkerRepository;
import com.nursing.home.server.service.CareWorkerService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CareWorkerServiceImpl implements CareWorkerService {

    private final CareWorkerRepository careWorkerRepository;
    @Override
    public void create(CareWorker careWorker) {
        careWorkerRepository.save(careWorker);
    }
}
