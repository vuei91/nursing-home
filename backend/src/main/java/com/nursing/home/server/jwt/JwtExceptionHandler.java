package com.nursing.home.server.jwt;

import com.nursing.home.server.common.ApiResponse;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.security.SignatureException;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Order(1)
@RestControllerAdvice
public class JwtExceptionHandler {

    @ExceptionHandler(NotFoundTokenException.class)
    public ResponseEntity<ApiResponse<String>> signatureExceptionHandler(Exception e) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ApiResponse.error(e.getMessage()));
    }

    @ExceptionHandler(SignatureException.class)
    public ResponseEntity<ApiResponse<String>> signatureExceptionHandler() {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ApiResponse.error("잘못된 토큰입니다"));
    }

    @ExceptionHandler(ExpiredJwtException.class)
    public ResponseEntity<ApiResponse<String>> expiredJwtExceptionHandler() {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ApiResponse.error("만료된 토큰이다"));
    }

    @ExceptionHandler(MalformedJwtException.class)
    public ResponseEntity<ApiResponse<String>> malformedJwtExceptionHandler() {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ApiResponse.error("유효하지 않은 토큰입니다"));
    }

    @ExceptionHandler(SecurityException.class)
    public ResponseEntity<ApiResponse<String>> securityExceptionHandler() {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ApiResponse.error("보안 예외 처리"));
    }
}
