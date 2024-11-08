package com.nursing.home.server.jwt;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

@Component
public class JwtProvider {

    @Value("${spring.jwt.secret}")
    private String secretKey;

    public String create(String id) {
        Date expiredDate = Date.from(Instant.now().plus(1, ChronoUnit.HOURS));
        Key key = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));
        return Jwts
                .builder()
                .signWith(key, SignatureAlgorithm.HS256)
                .setSubject(id)
                .setIssuedAt(new Date())
                .setExpiration(expiredDate)
                .compact();
    }

    public String validate(String jwt) {
        Key key = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));
        return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwt).getBody().getSubject();
    }
}
