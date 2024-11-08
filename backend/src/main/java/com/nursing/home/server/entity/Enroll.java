package com.nursing.home.server.entity;

import com.nursing.home.server.dto.enroll.EnrollCreateRequest;
import com.nursing.home.server.exception.ProgressCancelException;
import com.nursing.home.server.exception.ProgressFaultException;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.id.uuid.UuidGenerator;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@ToString
@Getter
public class Enroll {

    public enum EnrollStatus {
        ENROLL, CALL, CONTRACT, DEPOSIT, COMPLETE, CANCEL
    }

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "UUID", type = UuidGenerator.class)
    @Column(columnDefinition = "BINARY(16)", name = "enroll_id")
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hospital_id")
    private Hospital hospital;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "relation_id")
    private Relation relation;

    private LocalDateTime startTime;
    private EnrollStatus enrollStatus;

    @CreationTimestamp 
    private LocalDateTime createdAt;
    @UpdateTimestamp 
    private LocalDateTime updatedAt;

    public Enroll(Hospital hospital, Relation relation, EnrollCreateRequest request) {
        this.hospital = hospital;
        this.relation = relation;
        this.startTime = request.getStartTime();
        this.enrollStatus = EnrollStatus.ENROLL;
    }

    public void cancel() {
        this.enrollStatus = EnrollStatus.CANCEL;
    }

    public void progress() {
        if(this.enrollStatus == EnrollStatus.ENROLL) {
            this.enrollStatus = EnrollStatus.CALL;
        } else if(this.enrollStatus == EnrollStatus.CALL) {
            this.enrollStatus = EnrollStatus.CONTRACT;
        } else if(this.enrollStatus == EnrollStatus.CONTRACT) {
            this.enrollStatus = EnrollStatus.DEPOSIT;
        } else if(this.enrollStatus == EnrollStatus.DEPOSIT) {
            this.enrollStatus = EnrollStatus.COMPLETE;
        } else if (this.enrollStatus == EnrollStatus.COMPLETE) {
            throw new ProgressFaultException();
        } else if(this.enrollStatus == EnrollStatus.CANCEL) {
            throw new ProgressCancelException();
        }
    }

}
