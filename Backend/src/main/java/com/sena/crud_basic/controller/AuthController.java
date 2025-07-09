package com.sena.crud_basic.controller;

import com.sena.crud_basic.Dto.*;
import com.sena.crud_basic.model.PasswordResetToken;
import com.sena.crud_basic.model.User;
import com.sena.crud_basic.repository.PasswordResetTokenRepository;
import com.sena.crud_basic.repository.UserRespository;
import com.sena.crud_basic.service.AuthService;
import com.sena.crud_basic.Dto.TokenResponse;
import com.sena.crud_basic.service.EmailService;
import com.sena.crud_basic.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final UserService userService;
    private final PasswordResetTokenRepository passwordResetTokenRepository;
    private final EmailService emailService;
    private final UserRespository userRespository;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<TokenResponse> register(@RequestBody UserRegister user) {
        var res = authService.register(user);
        return ResponseEntity.ok(res);
    }

    @PostMapping("/login")
    public ResponseEntity<TokenResponse> login(@RequestBody UserLogin user) {
        TokenResponse res = authService.login(user);
        return ResponseEntity.ok(res);
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestBody ForgotPasswordRequestDto request) {
        Optional<User> optionalUser = userService.findByEmail(request.getEmail());
        if (optionalUser.isEmpty()) {
            return ResponseEntity.badRequest().body("No existe un usuario con ese correo");
        }

        User user = optionalUser.get();
        String token = UUID.randomUUID().toString();

        PasswordResetToken resetToken = new PasswordResetToken();
        resetToken.setToken(token);
        resetToken.setUser(user);
        resetToken.setExpirationDate(LocalDateTime.now().plusMinutes(15)); // 15 minutos
        passwordResetTokenRepository.save(resetToken);

        emailService.sendPasswordResetEmail(user.getEmail(), token);

        return ResponseEntity.ok("Correo de recuperación enviado");
    }

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody ResetPasswordRequest request) {
        Optional<PasswordResetToken> optionalToken = passwordResetTokenRepository.findByToken(request.getToken());
        if (optionalToken.isEmpty()) {
            return ResponseEntity.badRequest().body("Token inválido");
        }

        PasswordResetToken resetToken = optionalToken.get();
        if (resetToken.getExpirationDate().isBefore(LocalDateTime.now())) {
            return ResponseEntity.badRequest().body("Token expirado");
        }

        User user = resetToken.getUser();
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRespository.save(user);

        passwordResetTokenRepository.delete(resetToken);

        return ResponseEntity.ok("Contraseña actualizada correctamente");
    }

    @PutMapping("/change-password")
    public ResponseEntity<String> changePassword(
            @RequestBody ChangePasswordRequest request,
            @AuthenticationPrincipal User user // permite acceder directamente al usuario autenticado
    ) {
        // Verifica contraseña actual
        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
            return ResponseEntity.badRequest().body("Contraseña actual incorrecta");
        }

        // Actualiza la nueva contraseña
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRespository.save(user);

        return ResponseEntity.ok("Contraseña actualizada correctamente");
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
