package com.booklist.progress;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserProgressRepository extends JpaRepository<UserProgress, Long> {
    Optional<UserProgress> findById(Long id);
    Optional<UserProgress> findByDateAndAppUserId(LocalDate date, Long appUserId);
    List<UserProgress> getAllByAppUserId(Long appUserId);
    void deleteById(Long id);
//    @Transactional
//    @Modifying
//    @Query("update UserProgress up set up.totalPages = up.totalPages + :nrPages  where up.id = :id")
//    int updateUserProgress(@Param("id") Long id, @Param("pages") int nrPages);

}
