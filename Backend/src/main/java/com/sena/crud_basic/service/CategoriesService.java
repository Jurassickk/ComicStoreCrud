package com.sena.crud_basic.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.http.HttpStatus;

import com.sena.crud_basic.Dto.CategoriesDto;
import com.sena.crud_basic.Dto.ResponseDto;
import com.sena.crud_basic.model.Categories;
import com.sena.crud_basic.repository.ICategories;

@Service
public class CategoriesService {

    @Autowired
    private ICategories categoriesRepository;
    
    public ResponseDto save(CategoriesDto categoriesDto) {
        if (categoriesDto.getName().length() < 1 || categoriesDto.getName().length() > 50) {
            return new ResponseDto(HttpStatus.BAD_REQUEST.toString(), "El nombre debe estar entre 1 y 50 caracteres");
        }

        Categories categoriesRegister = convertToModel(categoriesDto);
        categoriesRepository.save(categoriesRegister);
        return new ResponseDto(HttpStatus.OK.toString(), "Categoría agregada correctamente");
    }

    public ResponseDto updateCategories(int id, CategoriesDto categoriesDto) {
        Optional<Categories> categoriesOpt = findById(id);
        if (!categoriesOpt.isPresent()) {
            return new ResponseDto(HttpStatus.NOT_FOUND.toString(), "La categoría no existe");
        }

        Categories categoriesRegister = categoriesOpt.get();

        if (categoriesDto.getName() != null) {
            if (categoriesDto.getName().length() < 1 || categoriesDto.getName().length() > 50) {
                return new ResponseDto(HttpStatus.BAD_REQUEST.toString(), "El nombre debe estar entre 1 y 50 caracteres");
            }
            categoriesRegister.setName(categoriesDto.getName());
        }

        categoriesRepository.save(categoriesRegister);
        return new ResponseDto(HttpStatus.OK.toString(), "Categoría actualizada correctamente");
    }

    public List<Categories> getAllCategories() {
        return categoriesRepository.findAll();
    }

    public Optional<Categories> findById(int id) {
        return categoriesRepository.findById(id);
    }

    public ResponseDto deleteCategories(int id) {
        Optional<Categories> categoriesOpt = findById(id);
        if (!categoriesOpt.isPresent()) {
            return new ResponseDto(HttpStatus.NOT_FOUND.toString(), "Categoría no existe");
        }
        
        categoriesRepository.deleteById(id);
        return new ResponseDto(HttpStatus.OK.toString(), "Categoría eliminada correctamente");
    }

    public CategoriesDto convertToDto(Categories categories) {
        return new CategoriesDto(categories.getName());
    }
    
    public Categories convertToModel(CategoriesDto categoriesDto) {
        return new Categories(categoriesDto.getName());
    }
}