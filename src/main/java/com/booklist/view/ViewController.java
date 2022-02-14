package com.booklist.view;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Controller
@RequestMapping(path = "api/v1/view")
@AllArgsConstructor
public class ViewController {
    private final ViewService viewService;

    @GetMapping
    public String viewBookList(@RequestParam("user") String email){
        return "person-booklist";
    }

}
