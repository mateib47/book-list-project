package com.booklist.progress;

import com.booklist.appuser.AppUserRepository;
import com.booklist.books.Books;
import com.booklist.books.BooksRequest;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class UserProgressService {
    private AppUserRepository appUserRepository;
    private UserProgressRepository userProgressRepository;

    public String addUserProgress(UserProgressRequest request) {
        UserProgress userProgress = new UserProgress(request.getTotalPages(),
                request.getDate(),
                request.getBookList(),
                appUserRepository.findByEmail(request.getEmail()).get().getId());
        userProgressRepository.save(userProgress);
        return "success";
    }
    public List<UserProgress> getUserProgress(String email){
        return userProgressRepository.getAllByAppUserId(appUserRepository.findByEmail(email).get().getId());
    }
}
