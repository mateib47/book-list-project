package com.booklist.progress;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Embeddable;


@Getter
@Embeddable
@AllArgsConstructor
public class ProgressBook {
    private int bookId;
    private int pages;

    public ProgressBook() {

    }
    public void addPages(int pages){
        this.pages += pages;
    }
}
