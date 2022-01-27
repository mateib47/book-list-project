package com.booklist.progress;

import com.booklist.appuser.AppUserRepository;
import com.booklist.books.Books;
import com.booklist.books.BooksRequest;
import lombok.AllArgsConstructor;
import org.apache.catalina.User;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class UserProgressService {
    private AppUserRepository appUserRepository;
    private UserProgressRepository userProgressRepository;

    public String addUserProgress(UserProgressRequest request) {
        Optional<UserProgress> existingUP = userProgressRepository.findByDate(request.getDate());
        if(existingUP.isPresent()){
            userProgressRepository.deleteById(existingUP.get().getId());
            List<ProgressBook> bookList = new ArrayList<ProgressBook>(request.getBookList());
            bookList.add(existingUP.get().getBookList().get(0)); //todo fix LazyInitializationException
            UserProgress userProgress = new UserProgress(
                    request.getTotalPages()+existingUP.get().getTotalPages(),
                    request.getDate(), bookList,
                    appUserRepository.findByEmail(request.getEmail()).get().getId());
            userProgressRepository.save(userProgress);
            return "user progress updated";
        }else{
            UserProgress userProgress = new UserProgress(request.getTotalPages(),
                    request.getDate(),
                    request.getBookList(),
                    appUserRepository.findByEmail(request.getEmail()).get().getId());
            userProgressRepository.save(userProgress);
            return "new user progress added";
        }

    }
    public List<UserProgress> getUserProgress(String email){
        return userProgressRepository.getAllByAppUserId(appUserRepository.findByEmail(email).get().getId());
    }
}
