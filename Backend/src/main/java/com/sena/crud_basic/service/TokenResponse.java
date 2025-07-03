package com.sena.crud_basic.service;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TokenResponse {
    public TokenResponse(String accessToken, String refreshToken) {
    }
}
