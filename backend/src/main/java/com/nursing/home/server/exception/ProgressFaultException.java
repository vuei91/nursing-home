package com.nursing.home.server.exception;

public class ProgressFaultException extends RuntimeException{
    public ProgressFaultException() {
        super("완료된 신청이므로 더 진행이 불가합니다.");
    }
}
