package com.booklist.progress;

import com.booklist.books.Books;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

import java.util.Date;
import java.util.List;

@Getter
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class UserProgressRequest {
    private int totalPages;
    private Date date;
    private List<ProgressBook> bookList;
    private String email;
}
