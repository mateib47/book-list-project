package com.booklist.progress;

import com.booklist.appuser.AppUserRepository;
import com.booklist.books.Books;
import com.booklist.books.BooksRequest;
import lombok.AllArgsConstructor;
import org.apache.catalina.User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class UserProgressService {
    private AppUserRepository appUserRepository;
    private UserProgressRepository userProgressRepository;

    @Transactional
    public String addUserProgress(UserProgressRequest request) {
        Optional<UserProgress> existingUP = userProgressRepository
                .findByDateAndAppUserId(request.getDate(), appUserRepository.findByEmail(request.getEmail()).get().getId());
        List<ProgressBook> bookList;
        if(existingUP.isPresent()){
            userProgressRepository.deleteById(existingUP.get().getId());
            bookList = new ArrayList<ProgressBook>(existingUP.get().getBookList());
            boolean existing = false;
            for(int i = 0; i < bookList.size(); i++)
            {
                if(bookList.get(i).getBookId() == request.getProgressBook().getBookId()){
                    bookList.get(i).addPages(request.getProgressBook().getPages());
                    existing = true;
                    break;
                }
            }
            if(!existing){
                bookList.add(request.getProgressBook());
            }
            UserProgress userProgress = new UserProgress(
                    request.getProgressBook().getPages()+existingUP.get().getTotalPages(),
                    request.getDate(), bookList,
                    appUserRepository.findByEmail(request.getEmail()).get().getId());
            userProgressRepository.save(userProgress);
            return "user progress updated";
        }else{
            bookList = new ArrayList<>();
            bookList.add(request.getProgressBook());
            UserProgress userProgress = new UserProgress(request.getProgressBook().getPages(),
                    request.getDate(),
                    bookList,
                    appUserRepository.findByEmail(request.getEmail()).get().getId());
            userProgressRepository.save(userProgress);
            return "new user progress added";
        }

    }
    public List<UserProgress> getUserProgress(String email){
        return userProgressRepository.getAllByAppUserId(appUserRepository.findByEmail(email).get().getId());
    }
    public UserProgress getUserProgressDay(LocalDate date, String email){
        Optional<UserProgress> userProgress =
                userProgressRepository.findByDateAndAppUserId
                (date, appUserRepository.findByEmail(email).get().getId());
        if(userProgress.isPresent()){
            return userProgress.get();
        }else{
            return null;
        }
    }
    public UserProgress getUserProgressById(Long id){
        Optional<UserProgress> userProgress = userProgressRepository.findById(id);
        if(userProgress.isPresent()){
            return userProgress.get();
        }else{
            System.out.println("User progress not found");//maybe throw exception
            return null;
        }
    }
}
