package com.booklist.progress;

import com.booklist.appuser.AppUser;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
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

    private Date date;
    @ElementCollection
    private List<ProgressBook> bookList;
    @ManyToOne
    @JoinColumn(
            nullable = false,
            name = "app_user_id"
    )
    private AppUser appUser;

    public UserProgress(int totalPages, Date date, List<ProgressBook> bookList, AppUser appUser) {
        this.totalPages = totalPages;
        this.date = date;
        this.bookList = bookList;
        this.appUser = appUser;
    }

    public int getNrPages() {
        return totalPages;
    }

    public void setNrPages(int nrPages) {
        this.totalPages = nrPages;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public List<ProgressBook> getBookList() {
        return bookList;
    }

    public void setBookList(List<ProgressBook> bookList) {
        this.bookList = bookList;
    }

    public AppUser getAppUser() {
        return appUser;
    }

    public void setAppUser(AppUser appUser) {
        this.appUser = appUser;
    }
}
