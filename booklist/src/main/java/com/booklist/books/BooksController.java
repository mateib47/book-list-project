package com.booklist.books;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

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
    public String getBooks(@RequestParam("email") String email){
        List<Books []> books = booksService.getBooks(email);
        String JsonObj = "{";
        for(int i=0;i<books.size();i++){
            JsonObj = JsonObj + books.get(i)[0].getBook();
            if(i != books.size()){
                JsonObj+= ",";
            }
        }
        JsonObj += "}";
        return JsonObj;
    }
}
