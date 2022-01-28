package com.booklist.progress;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

import java.time.LocalDate;
import java.util.List;

@Getter
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class UserProgressRequest {
    private LocalDate date;
    private ProgressBook progressBook;
    private String email;
}
