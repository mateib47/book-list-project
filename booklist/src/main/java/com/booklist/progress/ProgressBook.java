package com.booklist.progress;

import com.booklist.books.Books;
import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.persistence.Embeddable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Getter
@AllArgsConstructor
@Embeddable
public class ProgressBook {
    private int bookId;
    private int pages;

    public ProgressBook() {

    }
}
