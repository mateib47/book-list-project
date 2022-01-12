package com.booklist.progress;

import com.booklist.appuser.AppUserRepository;
import com.booklist.books.Books;
import com.booklist.books.BooksRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserProgressService {
    private AppUserRepository appUserRepository;
    private UserProgressRepository userProgressRepository;

    public String addUserProgress(UserProgressRequest request) {
        UserProgress userProgress = new UserProgress(request.getNrPages(),
                request.getDate(),
                request.getBookList(),
                appUserRepository.findByEmail(request.getEmail()).get());
        userProgressRepository.save(userProgress);
        return "success";
    }
    public List<UserProgress[]> getUserProgress(String email){
        return userProgressRepository.getAllByAppUser(appUserRepository.findByEmail(email).get());
    }
}
