package com.sena.crud_basic.Dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class UserLogin {
    public String email;
    public String password;

    public String email() {
    }

    public Object password() {
        return null;
    }
}
