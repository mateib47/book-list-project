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

    public Long addBook(BooksRequest booksRequest) {
        Books book = new Books(booksRequest.getRating(),
                booksRequest.getApiId(),
                booksRequest.getAuthor(),
                booksRequest.getBookmark(),
                booksRequest.getGenre(),
                booksRequest.getPages(),
                booksRequest.getQuote(),
                booksRequest.getStatus(),
                booksRequest.getTitle(),
                appUserRepository.findByEmail(booksRequest.getEmail()).get());
        booksRepository.save(book);
        return book.getId();
    }
    public List<Books[]> getBooks(String email){
        return booksRepository.getAllByAppUser(appUserRepository.findByEmail(email).get());
    }

    public String changeBook(BooksRequest booksRequest, Long id) {
        booksRepository.changeBook(id, booksRequest.getRating(),
                booksRequest.getAuthor(),
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

    public String addBookmark(int pages, Long id) {
        booksRepository.addBookmark(pages, id);
        return "added bookmark";
    }
}
