package com.booklist.exceptions;

public class EmailNotFoundException extends RuntimeException  {
    public EmailNotFoundException(String errorMessage) {
        super(errorMessage);
    }
}
