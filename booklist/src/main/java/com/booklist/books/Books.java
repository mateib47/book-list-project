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
public class Books {
    private int rating;
    private String apiId;
    private String author;
    private int bookmark;
    private String genre;
    @SequenceGenerator(name = "book_sequence",
            sequenceName = "book_sequence",
            allocationSize = 1)
    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "book_sequence")
    private Long id;
    private int pages;
    private String quote;
    @Enumerated(EnumType.STRING)
    private BookStatus status;
    private String title;
    private Boolean deleted = false;

    @ManyToOne
    @JoinColumn(
            nullable = false,
            name = "app_user_id"
    )
    private AppUser appUser;

    public Books(int rating, String apiId, String author, int bookmark, String genre, int pages, String quote, BookStatus status, String title, AppUser appUser) {
        this.rating = rating;
        this.apiId = apiId;
        this.author = author;
        this.bookmark = bookmark;
        this.genre = genre;
        this.pages = pages;
        this.quote = quote;
        this.status = status;
        this.title = title;
        this.appUser = appUser;
    }
    public String getBook(){
        String json = "{";
        json = json + "\"apiId\":" + '"' + this.apiId+ "\",";
        json = json + "\"rating\":" + '"' + this.rating+ "\",";
        json = json + "\"id\":" + '"' + this.id+ "\",";
        json = json + "\"author\":"+ '"' + this.author+ "\",";
        json = json + "\"bookmark\":"+ '"' + this.bookmark+ "\",";
        json = json + "\"genre\":"+ '"' + this.genre+ "\",";
        json = json + "\"pages\":"+ '"' + this.pages+ "\",";
        json = json + "\"quote\":"+ '"' + this.quote+ "\",";
        json = json + "\"status\":"+ '"' + this.status+ "\",";
        json = json + "\"deleted\":"+ '"' + this.deleted+ "\",";
        json = json + "\"title\":"+ '"' + this.title+ '"';
        json+="}";
        return json;
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

    public int getRating() {
        return rating;
    }


    public Boolean isDeleted() {return deleted;}
}
