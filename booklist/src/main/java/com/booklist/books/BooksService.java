package com.booklist.books;

import com.booklist.appuser.AppUserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

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
                booksRequest.getTitle());
        booksRepository.save(book);
        return "success";
    }
}
