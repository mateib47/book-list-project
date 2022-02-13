package com.booklist.view;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "api/v1/view")
@AllArgsConstructor
public class ViewController {
    private final ViewService viewService;

    @GetMapping
    public String viewBookList(@RequestParam("email") String email){
        return viewService.viewBookList(email);
    }

}
