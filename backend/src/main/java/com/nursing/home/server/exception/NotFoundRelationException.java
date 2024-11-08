package com.nursing.home.server.exception;

public class NotFoundRelationException extends RuntimeException{
    public NotFoundRelationException() {
        super("존재하지 않는 관계입니다.");
    }
}
