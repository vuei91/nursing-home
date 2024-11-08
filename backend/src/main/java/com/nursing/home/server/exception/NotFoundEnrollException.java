package com.nursing.home.server.exception;

public class NotFoundEnrollException extends RuntimeException{
    public NotFoundEnrollException() {
        super("존재하지 않는 신청입니다.");
    }
}
