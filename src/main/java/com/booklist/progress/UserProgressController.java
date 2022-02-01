package com.booklist.progress;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping(path = "api/v1/progress")
@AllArgsConstructor
public class UserProgressController {
    private UserProgressService userProgressService;

    @PostMapping(path = "add")
    public String addUserProgress(@RequestBody UserProgressRequest userProgressRequest){
        return userProgressService.addUserProgress(userProgressRequest);
    }

    @GetMapping(path = "get")
    public List<UserProgress> getProgress(@RequestParam("email") String email) {
        List<UserProgress> userProgressAll = userProgressService.getUserProgress(email);
        return userProgressAll;
    }
    @GetMapping(path = "get-day")
    public UserProgress getProgressDay(@RequestParam("id") Long id) {
        return userProgressService.getUserProgressById(id);
    }
}
