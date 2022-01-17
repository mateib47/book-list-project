package com.booklist.books;

import com.booklist.appuser.AppUser;
import net.minidev.json.JSONArray;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import java.util.List;
import java.util.Optional;

@Repository
public interface BooksRepository extends JpaRepository<Books, Long> {
    Optional<Books> findById(Long id);
    List<Books[]> getAllByAppUser(AppUser appUser);

    @Transactional
    @Modifying
    @Query("update Books b set b.deleted = true where b.id = :id")
    void deleteById(Long id);

    @Transactional
    @Modifying
    @Query("update Books b set b.author = :author, b.bookmark= :bookmark, b.genre= :genre," +
            "b.pages= :pages, b.quote= :quote, b.status= :status, b.title= :title where b.id = :id")
    int changeBook(@Param("id") Long id, @Param("author") String author,
                     @Param("bookmark") int bookmark, @Param("genre") String genre,
                     @Param("pages") int pages, @Param("quote") String quote,
                     @Param("status") BookStatus status, @Param("title") String title);
}
