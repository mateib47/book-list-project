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
    private int nrPages;
    private Date date;
    @ElementCollection
    private List<Integer> bookList;
    @ManyToOne
    @JoinColumn(
            nullable = false,
            name = "app_user_id"
    )
    private AppUser appUser;

    public UserProgress(int nrPages, Date date, List<Integer> bookList, AppUser appUser) {
        this.nrPages = nrPages;
        this.date = date;
        this.bookList = bookList;
        this.appUser = appUser;
    }

    public int getNrPages() {
        return nrPages;
    }

    public void setNrPages(int nrPages) {
        this.nrPages = nrPages;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public List<Integer> getBookList() {
        return bookList;
    }

    public void setBookList(List<Integer> bookList) {
        this.bookList = bookList;
    }

    public AppUser getAppUser() {
        return appUser;
    }

    public void setAppUser(AppUser appUser) {
        this.appUser = appUser;
    }
}
