package com.booklist.appuser;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
@Transactional(readOnly = true)
public interface AppUserRepository extends JpaRepository<AppUser, Long> {
    Optional<AppUser> findByEmail(String email);
    Optional<AppUser> findById(Long id);
    void deleteByEmail(String email);


    @Transactional
    @Modifying
    @Query("UPDATE AppUser a "+
            "SET a.name = :newName WHERE a.email = :email")
    int changeName(String newName, String email);

    @Transactional
    @Modifying
    @Query("UPDATE AppUser a "+
            "SET a.enabled = TRUE WHERE a.email = ?1")
    int enableAppUser(String email);
}
