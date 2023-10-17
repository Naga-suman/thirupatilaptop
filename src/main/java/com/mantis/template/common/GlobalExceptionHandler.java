package com.mantis.template.common;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.concurrent.ExecutionException;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(value = Exception.class)
    public ResponseEntity<GenericResponse> globalExceptionHandler(Exception ex){
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(GenericResponse.builder().status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                .message("Internal Server Error").build());
    }

    @ExceptionHandler(value = ExecutionException.class)
    public ResponseEntity<GenericResponse> firebaseExecutionExceptionHandler(InterruptedException ex){
        ex.printStackTrace();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(GenericResponse.builder().status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                .message("Internal Server Error").build());
    }
    @ExceptionHandler(value = InterruptedException.class)
    public ResponseEntity<GenericResponse> firebaseInterruptedExceptionHandler(InterruptedException ex){
        ex.printStackTrace();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(GenericResponse.builder().status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                .message("Internal Server Error").build());
    }
}
