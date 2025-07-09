package com.sena.crud_basic.service;

import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    public void sendPasswordResetEmail(String toEmail, String token) {
        String subject = "🔐 Recuperación de contraseña - CRUD App";
        String resetLink = "http://localhost:8080/auth/reset-password?token=" + token;

        String body = String.format(
                "Hola,\n\n" +
                        "Hemos recibido una solicitud para restablecer la contraseña de tu cuenta.\n\n" +
                        "Puedes restablecerla haciendo clic en el siguiente enlace:\n%s\n\n" +
                        "Este enlace expirará en 15 minutos por motivos de seguridad.\n\n" +
                        "Si tú no realizaste esta solicitud, puedes ignorar este mensaje.\n\n" +
                        "Saludos,\n" +
                        "El equipo de CRUD App", resetLink
        );

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject(subject);
        message.setText(body);
        message.setFrom("no-reply@crudapp.com");

        mailSender.send(message);
    }

}
