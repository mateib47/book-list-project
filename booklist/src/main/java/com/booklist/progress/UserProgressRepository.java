package com.booklist.progress;

import com.booklist.appuser.AppUser;
import com.booklist.books.Books;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserProgressRepository extends JpaRepository<UserProgress, Long> {
    Optional<UserProgress> findById(Long id);
    List<UserProgress[]> getAllByAppUser(AppUser appUser);
}
