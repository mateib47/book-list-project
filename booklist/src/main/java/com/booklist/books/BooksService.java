package com.booklist.books;

import com.booklist.appuser.AppUserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class BooksService {
    private BooksRepository booksRepository;
    private AppUserRepository appUserRepository;

    public String addBook(BooksRequest booksRequest) {
        Books book = new Books(booksRequest.getApiId(),
                booksRequest.getAuthor(),
                booksRequest.getBookmark(),
                booksRequest.getGenre(),
                booksRequest.getPages(),
                booksRequest.getQuote(),
                booksRequest.getStatus(),
                booksRequest.getTitle(),
                appUserRepository.findByEmail(booksRequest.getEmail()).get());
        booksRepository.save(book);
        return "added book";
    }
    public List<Books[]> getBooks(String email){
        return booksRepository.getAllByAppUser(appUserRepository.findByEmail(email).get());
    }

    public String changeBook(BooksRequest booksRequest, Long id) {
        booksRepository.changeBook(id, booksRequest.getAuthor(),
                booksRequest.getBookmark(),
                booksRequest.getGenre(),
                booksRequest.getPages(),
                booksRequest.getQuote(),
                booksRequest.getStatus(),
                booksRequest.getTitle());
        return "changed book";
    }

    public Books getBook(Long id) {
        return booksRepository.findById(id).get();
    }

    public String deleteBook(Long id) {
        booksRepository.deleteById(id);
        return "deleted book";
    }
}
