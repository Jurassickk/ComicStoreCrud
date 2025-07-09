package com.sena.crud_basic.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class ResetPasswordRequest {

    private String token;
    private String newPassword;

}
