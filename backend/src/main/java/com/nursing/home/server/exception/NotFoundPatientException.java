package com.nursing.home.server.exception;

public class NotFoundPatientException extends RuntimeException{
    public NotFoundPatientException() {
        super("존재하지 않는 환자입니다.");
    }
}
