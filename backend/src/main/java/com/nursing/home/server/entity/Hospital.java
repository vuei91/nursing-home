package com.nursing.home.server.entity;

import com.nursing.home.server.dto.hospital.HospitalCreateRequest;
import com.nursing.home.server.dto.hospital.HospitalUpdateRequest;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.id.uuid.UuidGenerator;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Hospital {

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "UUID", type = UuidGenerator.class)
    @Column(columnDefinition = "BINARY(16)", name = "hospital_id")
    private UUID id;
    private String name;
    private String category;
    private String tel;
    private String address;
    private String website;
    private String subject;
    private String doctors;
    private String convenience;
    private String parking;
    @OneToMany(mappedBy = "hospital")
    private List<ClinicHours> clinicHoursList;
    private String latitude;
    private String longitude;
    @OneToOne(mappedBy = "hospital")
    private CareWorker careWorker;
    @CreationTimestamp 
    private LocalDateTime createdAt;
    @UpdateTimestamp
    private LocalDateTime updatedAt;



    @OneToMany(mappedBy = "hospital")
    List<Enroll> enrolls = new ArrayList<>();

    public Hospital(HospitalCreateRequest request) {
        this.name = request.getName();
        this.tel = request.getTel();
        this.address = request.getAddress();
        this.latitude = request.getLatitude();
        this.longitude = request.getLongitude();
        this.category = request.getCategory();
        this.doctors = request.getDoctors();
        this.subject = request.getSubject();
        this.parking = request.getParking();
        this.convenience = request.getConvenience();
    }

    public void update(HospitalUpdateRequest request) {
        if(request.getName() != null) this.name = request.getName();
        if(request.getTel() != null) this.tel = request.getTel();
        if(request.getAddress() != null) this.address = request.getAddress();
        if(request.getLatitude() != null) this.latitude = request.getLatitude();
        if(request.getLongitude() != null) this.longitude = request.getLongitude();
        if(request.getCategory() != null) this.category = request.getCategory();
        if(request.getParking() != null) this.parking = request.getParking();
        if(request.getConvenience() != null) this.convenience = request.getConvenience();
    }
}
