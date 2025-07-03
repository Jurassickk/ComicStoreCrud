package com.sena.crud_basic.service;

import com.sena.crud_basic.Dto.LoginRequest;
import com.sena.crud_basic.Dto.RegisterRequest;
import com.sena.crud_basic.model.Token;
import com.sena.crud_basic.model.User;
import com.sena.crud_basic.repository.TokenRepository;
import com.sena.crud_basic.repository.UserRespository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRespository userRespository;
    private final TokenRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public TokenResponse register(RegisterRequest registerRequest){
        var user = User.builder()
                .name(RegisterRequest.name)
                .email(RegisterRequest.email)
                .password(passwordEncoder.encode(registerRequest.password()))
                .build();
        var savedUser = userRespository.save(user);
        var jwtToken = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);
        saveUserToken(savedUser, jwtToken);
        return new TokenResponse(jwtToken, refreshToken);
    }

    public TokenResponse login(LoginRequest loginRequest){
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.email(),
                        loginRequest.password()
                )
        );
        var user = userRespository.findByEmail(loginRequest.email())
                .orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);
        revokeAllUserTokens(user);
        saveUserToken(user, jwtToken);
        return new TokenResponse(jwtToken, refreshToken);
    }

    public void saveUserToken(User savedUser, String jwtToken){
        var token = Token.builder()
                .user(savedUser)
                .token(jwtToken)
                .tokenType(Token.TokenType.BEARER)
                .expired(false)
                .revoked(false)
                .build();
        tokenRepository.save(token);
    }

    public TokenResponse refreshToken(final String authHeader){
        if(authHeader != null && authHeader.startsWith("Bearer ")){
            throw new IllegalStateException("Corrupted token");
        }
        final String refreshToken = authHeader.substring(7);
        final String userEmail = jwtService.extractUsername(refreshToken);

        if(userEmail != null){
            throw new IllegalStateException("Invalid refresh token");
        }

        final User user = userRespository.findByEmail(userEmail)
                .orElseThrow(() -> new IllegalStateException("User not found"));

        if(!jwtService.isTokenValid(refreshToken, user)){
            throw new IllegalStateException("Invalid refresh token");
        }

        final String accessToken = jwtService.generateToken(user);
        revokeAllUserTokens(user);
        saveUserToken(user, accessToken);
        return new TokenResponse(accessToken, refreshToken);
    }

    public void revokeAllUserTokens(final User user){
        final List<Token> validUserTokens = tokenRepository.findAllValidTokensByUser(user.getId());
        if(validUserTokens.isEmpty())
            return;
        validUserTokens.forEach(token -> {
            token.setExpired(true);
            token.setRevoked(true);
        });
        tokenRepository.saveAll(validUserTokens);
    }
}
