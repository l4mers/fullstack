package com.restservice.holidays.auth;

import com.restservice.holidays.config.JwtService;
import com.restservice.holidays.models.user.Role;
import com.restservice.holidays.models.user.User;
import com.restservice.holidays.models.user.UserInfo;
import com.restservice.holidays.models.user.UserMedia;
import com.restservice.holidays.repositories.UserRepository;
import com.restservice.holidays.responses.user.UserLoginResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    public AuthenticationResponse register(RegisterRequest request) {
        User user = repository.save(User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .info(UserInfo.builder()
                        .firstName(request.getFirstname())
                        .lastName(request.getLastname())
                        .birthDate(request.getBirthDate())
                        .build())
                .media(UserMedia.builder()
                        .avatar("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")
                        .background("https://images.unsplash.com/photo-1464802686167-b939a6910659?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1150&q=80")
                        .build())
                .build());

        return AuthenticationResponse.builder()
                .user(UserLoginResponse.builder()
                        .id(user.getId())
                        .name(user.getInfo().getFirstName() + " " + user.getInfo().getLastName())
                        .birthDay(user.getInfo().getBirthDate())
                        .build())
                .token(jwtService.generateToken(User.builder()
                        .email(user.getEmail())
                        .password(passwordEncoder.encode(user.getPassword()))
                        .build()))
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var user = repository.findByEmail(request.getEmail())
                .orElseThrow();
        return AuthenticationResponse.builder()
                .user(UserLoginResponse.builder()
                        .id(user.getId())
                        .name(user.getInfo().getFirstName() + " " + user.getInfo().getLastName())
                        .birthDay(user.getInfo().getBirthDate())
                        .build())
                .token(jwtService.generateToken(User.builder()
                        .email(user.getEmail())
                        .password(passwordEncoder.encode(user.getPassword()))
                        .build()))
                .build();
    }
}
