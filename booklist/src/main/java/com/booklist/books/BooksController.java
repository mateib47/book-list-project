package com.booklist.books;

import com.booklist.registration.RegistrationRequest;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping(path = "api/v1/books")
@AllArgsConstructor
public class BooksController {
    private final BooksService booksService;

    @PostMapping
    public String addBook(@RequestBody BooksRequest booksRequest){
        return booksService.addBook(booksRequest);
    }
}
