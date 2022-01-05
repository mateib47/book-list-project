package com.booklist.books;

import com.booklist.appuser.AppUser;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "books")
public class Books {
    private String apiId;
    private String author;
    private int bookmark;
    private String genre;
    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY)
    private Long id;
    private int pages;
    private String quote;
    @Enumerated(EnumType.STRING)
    private BookStatus status;
    private String title;


    public Books(String apiId, String author, int bookmark, String genre, int pages, String quote, BookStatus status, String title) {
        this.apiId = apiId;
        this.author = author;
        this.bookmark = bookmark;
        this.genre = genre;
        this.pages = pages;
        this.quote = quote;
        this.status = status;
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public int getBookmark() {
        return bookmark;
    }

    public String getGenre() {
        return genre;
    }

    public int getPages() {
        return pages;
    }

    public String getQuote() {
        return quote;
    }

    public BookStatus getStatus() {
        return status;
    }

    public String getTitle() {
        return title;
    }
}
