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
        List<Books[]> books = booksService.getBooks(email);
        String Json = "[";
        for(int i=0;i<books.size();i++){
            Books book = books.get(i)[0];
            if(!book.getDeleted()){
                Json = Json + book.getBook();
                if(i != books.size() - 1){
                    Json+= ",";
                }
            }
        }
        Json += "]";
        return Json;
    }
    @GetMapping(path = "get-book")
    public Books getBook(@RequestParam("id") Long id){
        Books book = booksService.getBook(id);
        return book;
    }
    @PutMapping(path = "delete-book")
    public String deleteBook(@RequestParam("id") Long id){
        return booksService.deleteBook(id);
    }
    @PutMapping(path = "change")
    public String changeBook(@RequestBody BooksRequest booksRequest, @RequestParam("id") Long id){
        return booksService.changeBook(booksRequest, id);
    }
}
