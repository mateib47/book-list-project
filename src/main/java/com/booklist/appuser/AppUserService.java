package com.booklist.appuser;

import com.booklist.exceptions.EmailNotFoundException;
import com.booklist.registration.token.ConfirmationToken;
import com.booklist.registration.token.ConfirmationTokenRepository;
import com.booklist.registration.token.ConfirmationTokenService;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
@AllArgsConstructor
public class AppUserService implements UserDetailsService {

    private final static String USER_NOT_FOUND_MSG = "User with email %s not found";
    private final AppUserRepository appUserRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final ConfirmationTokenService confirmationTokenService;
    private final ConfirmationTokenRepository confirmationTokenRepository;

    @Override
    public UserDetails loadUserByUsername(String email)
            throws UsernameNotFoundException {
        return appUserRepository.findByEmail(email)
                .orElseThrow(() ->
                        new UsernameNotFoundException(String.format(USER_NOT_FOUND_MSG, email)));
    }

    public String signUpUser(AppUser appUser) {
        boolean userExists = appUserRepository.findByEmail(appUser.getEmail()).isPresent();
        if(userExists){
            boolean userConfirmed = appUserRepository.findByEmail(appUser.getEmail()).get().getEnabled();
            if(!userConfirmed){
                confirmationTokenRepository.deleteById(appUserRepository.findByEmail(appUser.getEmail()).get().getId());
                appUserRepository.deleteByEmail(appUser.getEmail());
            }else{
                throw new IllegalStateException("Email already taken");
            }
        }
        String encodedPassword = bCryptPasswordEncoder.encode(appUser.getPassword());
        appUser.setPassword(encodedPassword);
        appUserRepository.save(appUser);
        String token = UUID.randomUUID().toString();
        ConfirmationToken confirmationToken = new ConfirmationToken(
            token,
            LocalDateTime.now(),
            LocalDateTime.now().plusMinutes(15),
            appUser
        );
        confirmationTokenService.saveConfirmationToken(confirmationToken);
        //email
        return token;
    }
    public int enableAppUser(String email) {
        return appUserRepository.enableAppUser(email);
    }

    public String getName(String email){
        return findAppUser(email).getName();
    }
    public AppUser findAppUser(String email){
        Optional<AppUser> appUser = appUserRepository.findByEmail(email);
        if (appUser.isPresent()){
            return appUser.get();
        }else{
            throw new EmailNotFoundException("Email "+ email +" not found");
        }
    }
    public String changeName(AppUserRequest appUserRequest){
        appUserRepository.changeName(appUserRequest.getName(), appUserRequest.getEmail());
        return "success";
    }

    public String deleteAccount(String email) {
        appUserRepository.deleteByEmail(email);
        return "account deleted";
    }
}
