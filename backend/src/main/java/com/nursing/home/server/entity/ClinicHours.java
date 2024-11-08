package com.nursing.home.server.entity;

import com.nursing.home.server.dto.hospital.ClinicHoursCreateRequest;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.id.uuid.UuidGenerator;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ClinicHours {
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "UUID", type = UuidGenerator.class)
    @Column(columnDefinition = "BINARY(16)", name = "clinic_hours_id")
    private UUID id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hospital_id")
    private Hospital hospital;
    private String weekName;
    private String weekTime;
    private String deadlineTime;
    private String breakTime;
    @CreationTimestamp 
    private LocalDateTime createdAt;
    @UpdateTimestamp 
    private LocalDateTime updatedAt;

    public ClinicHours (ClinicHoursCreateRequest request, Hospital hospital) {
        this.weekName = request.getWeekName();
        this.weekTime = request.getWeekTime();
        this.deadlineTime = request.getDeadlineTime();
        this.breakTime = request.getBreakTime();
        this.hospital = hospital;
    }
}
