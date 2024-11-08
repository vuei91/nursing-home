package com.nursing.home.server.repository;

import com.nursing.home.server.entity.Member;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface MemberRepository extends JpaRepository<Member, UUID> {
    @EntityGraph(attributePaths = {"relations"})
    Optional<Member> findByUsername(String username);
}
