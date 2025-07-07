package com.sena.crud_basic.service;

import com.sena.crud_basic.Dto.TokenResponse;
import com.sena.crud_basic.Dto.UserLogin;
import com.sena.crud_basic.Dto.UserRegister;
import com.sena.crud_basic.model.Token;
import com.sena.crud_basic.model.User;
import com.sena.crud_basic.repository.TokenRepository;
import com.sena.crud_basic.repository.UserRespository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRespository userRespository;
    private final TokenRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public TokenResponse register(UserRegister userRegister){
        User user = convertToModel(userRegister);
        userRespository.save(user);
        var token = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);
        saveUserToken(user, token);
        return new TokenResponse(token, refreshToken);
    }

    public TokenResponse login(UserLogin userLogin){
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        userLogin.getEmail(),
                        userLogin.getPassword()
                )
        );
        Optional<User> optionalUser = userRespository.findByEmail(userLogin.getEmail());
        if(optionalUser.isEmpty()) throw new UsernameNotFoundException("Invalid email or password");
        User user = optionalUser.get();
        String token = jwtService.generateToken(user);
        String refreshToken = jwtService.generateRefreshToken(user);
        revokeAllUserToken(user);
        saveUserToken(user, token);
        return new TokenResponse(token, refreshToken);
    }

    public void revokeAllUserToken(User  user){
        List<Token> validUserTokens = tokenRepository.findAllValidTokensByUser((int) user.getId());
        if (validUserTokens.isEmpty()) throw new UsernameNotFoundException("Invalid email or password");
        for (Token token : validUserTokens) {
            token.setExpired(true);
            token.setRevoked(true);
        }
        tokenRepository.saveAll(validUserTokens);
    }

    public TokenResponse refreshToken(String authHeader){
        if (authHeader == null || !authHeader.startsWith("Bearer ")) throw new IllegalArgumentException("Invalid bearer header");

        String refreshToken = authHeader.substring(7);
        String userEmail = jwtService.extractUsername(refreshToken);

        if (userEmail == null) throw new UsernameNotFoundException("Invalid email refresh token");

        Optional<User> optionalUser = userRespository.findByEmail(userEmail);
        if (optionalUser.isEmpty()) throw new UsernameNotFoundException("Invalid email refresh token");
        User user = optionalUser.get();

        if (!jwtService.isTokenValid(refreshToken, user)) throw new IllegalArgumentException("Invalid refresh token");

        String accessToken = jwtService.generateToken(user);
        revokeAllUserToken(user);
        saveUserToken(user, accessToken);
        return new TokenResponse(accessToken, refreshToken);
    }

    private void saveUserToken(User user, String jwtToken){
        Token token = Token.builder()
                .user(user)
                .token(jwtToken)
                .expired(false)
                .revoked(false)
                .build();

        tokenRepository.save(token);
    }

    public User convertToModel(UserRegister userRegister){
        return User.builder()
                .name(userRegister.getName())
                .email(userRegister.getEmail())
                .password(passwordEncoder.encode(userRegister.getPassword()))
                .build();
    }
}
