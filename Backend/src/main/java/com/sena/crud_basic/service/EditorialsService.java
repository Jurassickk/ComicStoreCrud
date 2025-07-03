package com.sena.crud_basic.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;

import com.sena.crud_basic.Dto.EditorialsDto;
import com.sena.crud_basic.Dto.ResponseDto;
import com.sena.crud_basic.model.Editorials;
import com.sena.crud_basic.repository.IEditorials;

@Service
public class EditorialsService {

    @Autowired
    private IEditorials editorialsRepository;

    public ResponseDto save(EditorialsDto editorialsDto) {
        if (editorialsDto.getName().length() < 1 || editorialsDto.getName().length() > 50) {
            return new ResponseDto(HttpStatus.BAD_REQUEST.toString(), "El nombre debe estar entre 1 y 50 caracteres");
        }

        Editorials editorialsRegister = convertToModel(editorialsDto);
        editorialsRepository.save(editorialsRegister);
        return new ResponseDto(HttpStatus.OK.toString(), "Editorial agregada correctamente");
    }

    public ResponseDto updateEditoriales(int id, EditorialsDto editorialsDto) {
        Optional<Editorials> editorialesOpt = findById(id);
        if (!editorialesOpt.isPresent()) {
            return new ResponseDto(HttpStatus.NOT_FOUND.toString(), "La editorial no existe");
        }
        
        Editorials editorial = editorialesOpt.get();
        
        if (editorialsDto.getName() != null) {
            editorial.setName(editorialsDto.getName());
        }
        
        if (editorialsDto.getCountry() != null) {
            editorial.setCountry(editorialsDto.getCountry());
        }
        
        editorialsRepository.save(editorial);
        return new ResponseDto(HttpStatus.OK.toString(), "Editorial actualizada correctamente");
    }

    public List<Editorials> getAllEditoriales() {
        return editorialsRepository.findAll();
    }

    public Optional<Editorials> findById(int id) {
        return editorialsRepository.findById(id);
    }
    
    public List<Editorials> getEditorialsOrderedByName() {
        return editorialsRepository.getListEditorialesOrderedByName();
    }

    public List<Editorials> getEditorialsByName(String filter) {
        return editorialsRepository.getListEditorialesByName(filter);
    }

    public List<Editorials> getEditorialsByCountry(String country) {
        return editorialsRepository.getListEditorialesByCountry(country);
    }

    public ResponseDto deleteEditoriales(int id) {
        Optional<Editorials> editorialesOpt = findById(id);
        if (!editorialesOpt.isPresent()) {
            return new ResponseDto(HttpStatus.NOT_FOUND.toString(), "La editorial no existe");
        }   
        editorialsRepository.deleteById(id);
        return new ResponseDto(HttpStatus.OK.toString(), "Editorial eliminada correctamente");
    }

    public EditorialsDto convertToDto(Editorials editorial) {
        EditorialsDto dto = new EditorialsDto();
        dto.setEditorialId(editorial.getEditorialId());
        dto.setName(editorial.getName());
        dto.setCountry(editorial.getCountry());
        return dto;
    }
    
    public Editorials convertToModel(EditorialsDto editorialsDto) {
        Editorials editorial = new Editorials();
        editorial.setName(editorialsDto.getName());
        editorial.setCountry(editorialsDto.getCountry());
        return editorial;
    }
}
