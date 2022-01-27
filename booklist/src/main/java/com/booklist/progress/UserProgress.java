package com.booklist.progress;

import com.booklist.appuser.AppUser;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class UserProgress {
    @SequenceGenerator(name = "progress_sequence",
            sequenceName = "progress_sequence",
            allocationSize = 1)
    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "progress_sequence")
    private Long id;
    private int totalPages;

    private LocalDate date;
    @ElementCollection
    private List<ProgressBook> bookList;
    private Long appUserId;

    public UserProgress(int totalPages, LocalDate date, List<ProgressBook> bookList, Long appUserId) {
        this.totalPages = totalPages;
        this.date = date;
        this.bookList = bookList;
        this.appUserId = appUserId;
    }

    public int getNrPages() {
        return totalPages;
    }

    public void setNrPages(int nrPages) {
        this.totalPages = nrPages;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public List<ProgressBook> getBookList() {
        return bookList;
    }

    public void setBookList(List<ProgressBook> bookList) {
        this.bookList = bookList;
    }

    public Long getAppUser() {
        return appUserId;
    }

    public void setAppUser(Long appUserId) {
        this.appUserId = appUserId;
    }
}
