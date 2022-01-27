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
    private int totalPages;
    private LocalDate date;
    private List<ProgressBook> bookList;
    private String email;
}
