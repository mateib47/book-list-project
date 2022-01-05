package com.booklist.books;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;


@RestController
@RequestMapping(path = "api/v1/books")
@AllArgsConstructor
public class BooksController {
    private final BooksService booksService;

    @PostMapping(path = "add")
    public String addBook(@RequestBody BooksRequest booksRequest){
        return booksService.addBook(booksRequest);
    }

    @GetMapping(path = "get")
    public List<Object []> getBooks(@RequestParam("email") String email){
        System.out.println(Arrays.toString(booksService.getBooks(email).toArray()));
        return booksService.getBooks(email);
    }
}
