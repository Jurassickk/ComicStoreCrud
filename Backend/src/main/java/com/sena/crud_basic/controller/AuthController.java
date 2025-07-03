package com.sena.crud_basic.controller;


import com.sena.crud_basic.Dto.*;
import com.sena.crud_basic.model.User;
import com.sena.crud_basic.service.AuthService;
import com.sena.crud_basic.service.TokenResponse;
import com.sena.crud_basic.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<TokenResponse> register(@RequestBody UserRegister user) {
        System.out.print("Security Filter Chain <UNK>");
        var res = authService.register(user);
        return ResponseEntity.ok(res);
    }

    @PostMapping("/login")
    public ResponseEntity<TokenResponse> login(@RequestBody UserLogin user) {
        TokenResponse res = authService.login(user);
        return ResponseEntity.ok(res);
    }

    @GetMapping
    public List<User> getAllUser() {
        return userService.getAllUser();
    }

    @PutMapping
    public ResponseDto updateUser(@RequestBody UserDto userDto) {
        return userService.updateUser(userDto);
    }

    @DeleteMapping("/{id}")
    public ResponseDto deleteUser(@PathVariable int id) {
        return userService.deleteUser(id);
    }

}
