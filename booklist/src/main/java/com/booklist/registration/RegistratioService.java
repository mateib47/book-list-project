package com.booklist.registration;

import org.springframework.stereotype.Service;

@Service
public class RegistratioService {
    public String register(RegistrationRequest request) {
        return "ok";
    }
}
