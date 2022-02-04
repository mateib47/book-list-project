package com.booklist.appuser;


import com.booklist.exceptions.EmailNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.security.auth.login.AccountNotFoundException;
import java.util.Optional;

@RestController
@RequestMapping(path = "api/v1/appUser")
@AllArgsConstructor
public class AppUserController {
    private final AppUserService appUserService;

    @GetMapping(path = "firstName")
    public String firstName(@RequestParam("email") String email){
        return appUserService.getName(email);
    }
    @PutMapping(path = "change-name")
    public String changeName(@RequestBody AppUserRequest appUserRequest){
        return appUserService.changeName(appUserRequest);
    }
}
