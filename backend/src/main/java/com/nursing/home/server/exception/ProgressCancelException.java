package com.nursing.home.server.exception;

public class ProgressCancelException extends RuntimeException{
    public ProgressCancelException() {
        super("취소된 신청입니다.");
    }
}
