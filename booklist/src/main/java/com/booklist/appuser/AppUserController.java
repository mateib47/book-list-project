package com.booklist.appuser;


import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "api/v1/appUser")
@AllArgsConstructor
public class AppUserController {
    private final AppUserService appUserService;
    private final AppUserRepository appUserRepository;

    @GetMapping(path = "firstName")
    public String firstName(@RequestParam("email") String email){
        System.out.println(email);
        String name = appUserRepository.findByEmail(email).get().getName();
        System.out.println(name);
        return name;
    }
}
