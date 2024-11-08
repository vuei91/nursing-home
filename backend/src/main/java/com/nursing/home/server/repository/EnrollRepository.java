package com.nursing.home.server.repository;

import com.nursing.home.server.dto.enroll.EnrollHistoryDetailResponse;
import com.nursing.home.server.dto.enroll.EnrollReadResponse;
import com.nursing.home.server.dto.enroll.EnrollHistoryMainResponse;
import com.nursing.home.server.entity.Enroll;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface EnrollRepository extends JpaRepository<Enroll, UUID> {

    @Query(value =
            "select" +
                    "    e.id as enrollId," +
                    "    e.enrollStatus as enrollStatus," +
                    "    m.name as memberName," +
                    "    m.username as memberUsername," +
                    "    m.phone as memberPhone," +
                    "    m.address as memberAddress," +
                    "    p.id as patientId," +
                    "    p.name as patientName," +
                    "    p.address as patientAddress," +
                    "    p.phone as patientPhone," +
                    "    p.grade as patientGrade," +
                    "    h.id as hospitalId," +
                    "    h.name as hospitalName," +
                    "    h.address as hospitalAddress," +
                    "    h.tel as hospitalTel," +
                    "    h.website as hospitalWebsite," +
                    "    e.startTime as enrollStartTime" +
                    " from Member m" +
                    " join fetch Relation r on m = r.member" +
                    " join fetch Patient p on r.patient = p" +
                    " join fetch Enroll e on e.relation = r" +
                    " join fetch Hospital h on h = e.hospital" +
                    " where m.username = :username and h.id = :hospitalId"
    )
    List<EnrollReadResponse> findEnrollsByUsernameAndHospital(String username, UUID hospitalId);

    @Query(value =
            "select" +
                    "    e.id as enrollId," +
                    "    e.enrollStatus as enrollStatus," +
                    "    m.name as memberName," +
                    "    m.username as memberUsername," +
                    "    m.phone as memberPhone," +
                    "    m.address as memberAddress," +
                    "    p.id as patientId," +
                    "    p.name as patientName," +
                    "    p.address as patientAddress," +
                    "    p.phone as patientPhone," +
                    "    p.grade as patientGrade," +
                    "    h.id as hospitalId," +
                    "    h.name as hospitalName," +
                    "    h.address as hospitalAddress," +
                    "    h.tel as hospitalTel," +
                    "    h.website as hospitalWebsite," +
                    "    e.startTime as enrollStartTime" +
                    " from Member m" +
                    " join fetch Relation r on m = r.member" +
                    " join fetch Patient p on r.patient = p" +
                    " join fetch Enroll e on e.relation = r" +
                    " join fetch Hospital h on h = e.hospital" +
                    " where m.username = :username and p.id = :patientId"
    )
    List<EnrollReadResponse> findEnrollsByUsernameAndPatient(String username, UUID patientId);


    @Query(
            "select " +
                "m.username as username, " +
                "m.name as memberName, " +
                "p.id as patientId, " +
                "p.name as patientName, " +
                "(select h1.name from Hospital h1 where h1.id = min(h.id)) as hospitalName, " +
                "(select e1.enrollStatus from Enroll e1 where e1.hospital.id = min(h.id)" +
                    "and e1.relation = (" +
                    "select r1 from Relation r1 where r1.patient = p)" +
                    ") as enrollStatus, " +
                "count(e.hospital) - 1 as exceptCount " +
            " from Member m" +
            " join fetch Relation r on m = r.member" +
            " join fetch Patient p on r.patient = p" +
            " join fetch Enroll e on e.relation = r" +
            " join fetch Hospital h on h = e.hospital" +
            " where m.username = :username" +
            " group by m.username, m.name, p.id, p.name"
    )
    List<EnrollHistoryMainResponse> findHistoryMainList(String username);

    @Query( "select distinct" +
            "    e.id as enrollId," +
            "    e.enrollStatus as enrollStatus," +
            "    m.name as memberName," +
            "    p.name as patientName," +
            "    h.id as hospitalId," +
            "    h.name as hospitalName," +
            "    h.address as hospitalAddress " +
            " from Member m" +
            " join fetch Relation r on m = r.member" +
            " join fetch Patient p on r.patient = p" +
            " join fetch Enroll e on e.relation = r" +
            " join fetch Hospital h on h = e.hospital" +
            " where m.username = :username and p.id = :patientId")
    List<EnrollHistoryDetailResponse> findHistoryDetailList(String username, UUID patientId);
}
