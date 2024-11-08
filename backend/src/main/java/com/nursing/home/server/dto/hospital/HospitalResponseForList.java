package com.nursing.home.server.dto.hospital;

import java.util.UUID;

public interface HospitalResponseForList {
    UUID getId();
    String getName();
    String getDistance();
    String getAddress();
}
