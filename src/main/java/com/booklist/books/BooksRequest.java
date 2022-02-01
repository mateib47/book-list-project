package com.booklist.books;

import com.booklist.appuser.AppUser;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

import javax.persistence.*;

@Getter
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class BooksRequest {
    private int rating;
    private String apiId;
    private String author;
    private int bookmark;
    private String genre;
    private int pages;
    private String quote;
    @Enumerated(EnumType.STRING)
    private BookStatus status;
    private String title;
    private String email;
}
