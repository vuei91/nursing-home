package com.nursing.home.server.exception;

public class NotFoundHospitalException extends RuntimeException{
    public NotFoundHospitalException() {
        super("존재하지 않는 요양(병)원입니다.");
    }

}
