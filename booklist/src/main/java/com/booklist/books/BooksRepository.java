package com.booklist.books;

import com.booklist.appuser.AppUser;
import net.minidev.json.JSONArray;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BooksRepository extends JpaRepository<Books, Long> {
    Optional<Books> findById(Long id);
    List<Books[]> getAllByAppUser(AppUser appUser);

}
