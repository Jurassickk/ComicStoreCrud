package com.sena.crud_basic.service;

import com.sena.crud_basic.Dto.ResponseDto;
import com.sena.crud_basic.Dto.UserDto;
import com.sena.crud_basic.model.User;
import com.sena.crud_basic.repository.UserRespository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {

    private final UserRespository userRespository;

    public List<User> getAllUser(){
        log.debug("Obteniendo todos los usuarios");
        return userRespository.findAll();
    }

    public UserDto getUserById(int id){
        Optional<User> userOptional = userRespository.findById(id);
        return userOptional.map(this::convertToDto).orElse(null);
    }
    public ResponseDto createUser(UserDto userDto) {
        try {

            User user = new User();
            user.setName(userDto.getName());
            user.setEmail(userDto.getEmail());
            user.setPassword(userDto.getPassword());

            userRespository.save(user);
            log.info("Usuario creado exitosamente con ID: {}", user.getId());

            return new ResponseDto("SUCCESS", "Usuario creado exitosamente");

        } catch (Exception e) {
            log.error("Error al crear usuario: {}", e.getMessage(), e);
            return new ResponseDto("ERROR", "Error interno del servidor");
        }
    }

    public ResponseDto updateUser(UserDto userDto) {
        try {
            log.info("Actualizando usuario con ID: {}", userDto.getId());

            Optional<User> userOptional = userRespository.findById(userDto.getId());
            if (userOptional.isEmpty()) {
                return new ResponseDto("ERROR", "Usuario no encontrado");
            }

            User existingUser = userOptional.get(); // Obtener el usuario existente

            // Validar email si se esta cambiando
            if (!existingUser.getEmail().equals(userDto.getEmail())) {
                Optional<User> emailOptional = userRespository.findByEmail(userDto.getEmail());
                if (emailOptional.isPresent()) {
                    return new ResponseDto("ERROR", "El correo electrónico ya está en uso");
                }
            }

            // Actualizar campos
            existingUser.setName(userDto.getName());
            existingUser.setEmail(userDto.getEmail());

            // Actualizar contraseña si se proporciona
            if (userDto.getPassword() != null && !userDto.getPassword().trim().isEmpty()) {
                existingUser.setPassword(userDto.getPassword());
            }

            userRespository.save(existingUser);
            log.info("Usuario actualizado exitosamente con ID: {}", existingUser.getId());

            return new ResponseDto("SUCCESS", "Usuario actualizado exitosamente");

        } catch (Exception e) {
            log.error("Error al actualizar usuario: {}", e.getMessage(), e);
            return new ResponseDto("ERROR", "Error interno del servidor");
        }
    }

    public ResponseDto deleteUser(int id) {
        try {

            if (!userRespository.existsById(id)) {
                return new ResponseDto("ERROR", "Usuario no encontrado");
            }

            userRespository.deleteById(id);
            log.info("Usuario eliminado exitosamente con ID: {}", id);
            return new ResponseDto("SUCCESS", "Usuario eliminado exitosamente");

        } catch (Exception e) {
            log.error("Error al eliminar usuario: {}", e.getMessage(), e);
            return new ResponseDto("ERROR", "Error interno del servidor");
        }
    }


    private UserDto convertToDto(User user) {
        UserDto dto = new UserDto();
        dto.setId((int) user.getId());
        dto.setName(user.getName());
        dto.setEmail(user.getEmail());
        dto.setPassword(user.getPassword()); // Incluye password por ahora
        return dto;
    }
}
