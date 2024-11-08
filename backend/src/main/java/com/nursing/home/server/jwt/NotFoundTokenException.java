package com.nursing.home.server.jwt;

public class NotFoundTokenException extends RuntimeException{
    public NotFoundTokenException() {
        super("토큰이 존재하지 않습니다.");
    }

}
