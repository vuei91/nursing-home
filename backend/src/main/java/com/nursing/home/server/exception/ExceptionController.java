package com.nursing.home.server.exception;

import com.nursing.home.server.common.ApiResponse;
import org.springframework.core.annotation.Order;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
@Order(2)
@RestControllerAdvice
public class ExceptionController {

    @ExceptionHandler({NotFoundMemberException.class, NotFoundPatientException.class, NotFoundHospitalException.class, NotFoundEnrollException.class})
    public ApiResponse<String> NotFoundException(Exception e) {
        e.printStackTrace();
        return ApiResponse.fail(e.getMessage());
    }

    @ExceptionHandler({ProgressFaultException.class, ProgressCancelException.class})
    public ApiResponse<String> ProgressException(Exception e) {
        e.printStackTrace();
        return ApiResponse.fail(e.getMessage());
    }

    @ExceptionHandler({Exception.class})
    public ApiResponse<String> ResponseException (Exception e) {
        e.printStackTrace();
        return ApiResponse.error(e.getMessage());
    }
}
