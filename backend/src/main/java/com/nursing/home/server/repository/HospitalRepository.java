package com.nursing.home.server.repository;

import com.nursing.home.server.dto.hospital.HospitalResponseForList;
import com.nursing.home.server.entity.Hospital;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface HospitalRepository extends JpaRepository<Hospital, UUID> {
    @Query(" select " +
            "   h.id as id, " +
            "   h.address as address, " +
            "   h.name as name, " +
            "   case when :x is null then '-' " +
            "   when :y is null then '-' " +
            "   else ROUND(" +
            "       CAST(function('ST_distance_sphere', " +
            "           POINT(h.longitude, h.latitude), " +
            "           POINT(:x, :y)) as double" +
            "       ) / 1000, 2" +
            "   ) end as distance " +
            " from Hospital h" +
            " order by CAST(function('ST_distance_sphere', POINT(h.longitude, h.latitude), POINT(:x, :y)) as double) / 1000")
    List<HospitalResponseForList> findAllForList(String x, String y);
}
