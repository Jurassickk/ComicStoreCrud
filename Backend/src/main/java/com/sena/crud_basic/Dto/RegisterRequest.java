package com.sena.crud_basic.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest{

    public static String name;
    public static String email;
    public String password;
}
