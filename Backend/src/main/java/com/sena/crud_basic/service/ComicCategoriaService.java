package com.sena.crud_basic.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.sena.crud_basic.Dto.ComicCategoryDto;
import com.sena.crud_basic.Dto.ResponseDto;
import com.sena.crud_basic.model.ComicCategoria;
import com.sena.crud_basic.model.Comics;
import com.sena.crud_basic.model.Categories;
import com.sena.crud_basic.repository.IComicCategoria;
import com.sena.crud_basic.repository.IComics;
import com.sena.crud_basic.repository.ICategories;

@Service
public class ComicCategoriaService {

    @Autowired
    private IComicCategoria comicCategoriaRepository;
    
    @Autowired
    private IComics comicsRepository;
    
    @Autowired
    private ICategories categoriesRepository;
    
    public ResponseDto save(ComicCategoryDto comicCategoriaDto) {
        // Verificar que exista el comic
        Optional<Comics> comicOpt = comicsRepository.findById(comicCategoriaDto.getComicId());
        if (!comicOpt.isPresent()) {
            return new ResponseDto(HttpStatus.BAD_REQUEST.toString(), "El cómic especificado no existe");
        }
        
        // Verificar que exista la categoría
        Optional<Categories> categoryOpt = categoriesRepository.findById(comicCategoriaDto.getCategoryId());
        if (!categoryOpt.isPresent()) {
            return new ResponseDto(HttpStatus.BAD_REQUEST.toString(), "La categoría especificada no existe");
        }
        
        // Verificar si ya existe la relación entre el cómic y la categoría
        Optional<ComicCategoria> existingRelationOpt = comicCategoriaRepository.findByComicIdAndCategoryId(
            comicCategoriaDto.getComicId(), 
            comicCategoriaDto.getCategoryId()
        );
        
        if (existingRelationOpt.isPresent()) {
            return new ResponseDto(HttpStatus.BAD_REQUEST.toString(), "La relación entre este cómic y esta categoría ya existe");
        }

        ComicCategoria comicCategoriaRegister = convertToModel(comicCategoriaDto);
        comicCategoriaRepository.save(comicCategoriaRegister);
        return new ResponseDto(HttpStatus.OK.toString(), "Relación cómic-categoría agregada correctamente");
    }

    public ResponseDto updateComicCategoria(int id, ComicCategoryDto comicCategoriaDto) {
        Optional<ComicCategoria> comicCategoriaOpt = findById(id);
        if (!comicCategoriaOpt.isPresent()) {
            return new ResponseDto(HttpStatus.NOT_FOUND.toString(), "La relación cómic-categoría no existe");
        }

        ComicCategoria comicCategoriaRegister = comicCategoriaOpt.get();

        if (comicCategoriaDto.getComicId() != 0) {
            Optional<Comics> comicOpt = comicsRepository.findById(comicCategoriaDto.getComicId());
            if (!comicOpt.isPresent()) {
                return new ResponseDto(HttpStatus.BAD_REQUEST.toString(), "El cómic especificado no existe");
            }
            
            // Si ya existe una relación con el nuevo comic y la misma categoría
            if (comicCategoriaRegister.getCategory().getCategory_id() == comicCategoriaDto.getCategoryId() &&
                comicCategoriaRegister.getComic().getComicId() != comicCategoriaDto.getComicId()) {
                Optional<ComicCategoria> existingRelationOpt = comicCategoriaRepository.findByComicIdAndCategoryId(
                    comicCategoriaDto.getComicId(), 
                    comicCategoriaRegister.getCategory().getCategory_id()
                );
                
                if (existingRelationOpt.isPresent()) {
                    return new ResponseDto(HttpStatus.BAD_REQUEST.toString(), "Ya existe una relación entre el nuevo cómic y esta categoría");
                }
            }
            
            comicCategoriaRegister.setComic(comicOpt.get());
        }

        if (comicCategoriaDto.getCategoryId() != 0) {
            Optional<Categories> categoryOpt = categoriesRepository.findById(comicCategoriaDto.getCategoryId());
            if (!categoryOpt.isPresent()) {
                return new ResponseDto(HttpStatus.BAD_REQUEST.toString(), "La categoría especificada no existe");
            }
            
            // Si ya existe una relación con la nueva categoría y el mismo comic
            if (comicCategoriaRegister.getComic().getComicId() == comicCategoriaDto.getComicId() &&
                comicCategoriaRegister.getCategory().getCategory_id() != comicCategoriaDto.getCategoryId()) {
                Optional<ComicCategoria> existingRelationOpt = comicCategoriaRepository.findByComicIdAndCategoryId(
                    comicCategoriaRegister.getComic().getComicId(), 
                    comicCategoriaDto.getCategoryId()
                );
                
                if (existingRelationOpt.isPresent()) {
                    return new ResponseDto(HttpStatus.BAD_REQUEST.toString(), "Ya existe una relación entre este cómic y la nueva categoría");
                }
            }
            
            comicCategoriaRegister.setCategory(categoryOpt.get());
        }

        comicCategoriaRepository.save(comicCategoriaRegister);
        return new ResponseDto(HttpStatus.OK.toString(), "Relación cómic-categoría actualizada correctamente");
    }

    public List<ComicCategoria> getAllComicCategorias() {
        return comicCategoriaRepository.findAll();
    }

    public Optional<ComicCategoria> findById(int id) {
        return comicCategoriaRepository.findById(id);
    }
    
    public List<ComicCategoria> findByComicId(int comicId) {
        return comicCategoriaRepository.findByComicId(comicId);
    }
    
    public List<ComicCategoria> findByCategoryId(int categoryId) {
        return comicCategoriaRepository.findByCategoryId(categoryId);
    }

    public ResponseDto deleteComicCategoria(int id) {
        Optional<ComicCategoria> comicCategoriaOpt = findById(id);
        if (!comicCategoriaOpt.isPresent()) {
            return new ResponseDto(HttpStatus.NOT_FOUND.toString(), "Relación cómic-categoría no existe");
        }
        
        comicCategoriaRepository.deleteById(id);
        return new ResponseDto(HttpStatus.OK.toString(), "Relación cómic-categoría eliminada correctamente");
    }
    
    public ResponseDto deleteByComicAndCategory(int comicId, int categoryId) {
        Optional<ComicCategoria> comicCategoriaOpt = comicCategoriaRepository.findByComicIdAndCategoryId(comicId, categoryId);
        if (!comicCategoriaOpt.isPresent()) {
            return new ResponseDto(HttpStatus.NOT_FOUND.toString(), "No existe relación entre el cómic y la categoría especificados");
        }
        
        comicCategoriaRepository.deleteById(comicCategoriaOpt.get().getId());
        return new ResponseDto(HttpStatus.OK.toString(), "Relación cómic-categoría eliminada correctamente");
    }

    public ComicCategoryDto convertToDto(ComicCategoria comicCategoria) {
        return new ComicCategoryDto(
            comicCategoria.getComic().getComicId(), 
            comicCategoria.getCategory().getCategory_id()
        );
    }
    
    public ComicCategoria convertToModel(ComicCategoryDto comicCategoriaDto) {
        ComicCategoria comicCategoria = new ComicCategoria();
        
        if (comicCategoriaDto.getComicId() != 0) {
            Comics comic = comicsRepository.findById(comicCategoriaDto.getComicId()).orElse(null);
            comicCategoria.setComic(comic);
        }
        
        if (comicCategoriaDto.getCategoryId() != 0) {
            Categories category = categoriesRepository.findById(comicCategoriaDto.getCategoryId()).orElse(null);
            comicCategoria.setCategory(category);
        }
        
        return comicCategoria;
    }
}