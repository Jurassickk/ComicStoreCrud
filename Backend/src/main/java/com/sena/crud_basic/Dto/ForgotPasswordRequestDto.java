package com.sena.crud_basic.Dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Data
public class ForgotPasswordRequestDto {

    private String email;
}
