package com.nursing.home.server.entity;

import com.nursing.home.server.dto.member.MemberCreateRequest;
import com.nursing.home.server.dto.member.MemberUpdateRequest;
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
public class Member {
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "UUID", type = UuidGenerator.class)
    @Column(columnDefinition = "BINARY(16)", name = "member_id")
    private UUID id;
    @Column(unique = true)
    private String username;
    private String password;
    private String type;
    private String role;
    @Column(unique = true)
    private String email;
    private String name;
    @Column(unique = true)
    private String phone;
    private String address;
    private String latitude;
    private String longitude;
    @OneToOne(mappedBy = "member")
    private CareWorker careWorker;
    @CreationTimestamp 
    private LocalDateTime createdAt;
    @UpdateTimestamp 
    private LocalDateTime updatedAt;


    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    List<Relation> relations = new ArrayList<>();

    public Member(MemberCreateRequest memberCreateRequest) {
        this.username = memberCreateRequest.getUsername();
        this.email = memberCreateRequest.getEmail();
        this.name = memberCreateRequest.getName();
        this.address = memberCreateRequest.getAddress();
        this.phone = memberCreateRequest.getPhone();
        this.password = memberCreateRequest.getPassword();
        this.role = memberCreateRequest.getRole();
        this.type = memberCreateRequest.getType();
        this.latitude = memberCreateRequest.getLatitude();
        this.longitude = memberCreateRequest.getLongitude();
    }

    public void update(MemberUpdateRequest request) {
        if (request.getEmail() != null) this.email = request.getEmail();
        if (request.getName() != null) this.name = request.getName();
        if (request.getAddress() != null) this.address = request.getAddress();
        if (request.getPhone() != null) this.phone = request.getPhone();
        if (request.getPassword() != null) this.password = request.getPassword();
        if (request.getRole() != null) this.role = request.getRole();
        if (request.getType() != null) this.type = request.getType();
        if (request.getLatitude() != null) this.type = request.getLatitude();
        if (request.getLongitude() != null) this.type = request.getLongitude();
    }

}
