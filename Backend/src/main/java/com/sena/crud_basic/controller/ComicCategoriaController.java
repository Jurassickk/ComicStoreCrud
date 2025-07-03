package com.sena.crud_basic.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sena.crud_basic.Dto.ComicCategoryDto;
import com.sena.crud_basic.Dto.ResponseDto;
import com.sena.crud_basic.service.ComicCategoriaService;

@RestController
@RequestMapping("/api/v1/comic-categorias")
public class ComicCategoriaController {
    
    @Autowired
    private ComicCategoriaService comicCategoriaService;

    @GetMapping("/")
    public ResponseEntity<Object> getAllComicCategorias() {
        var listaComicCategorias = comicCategoriaService.getAllComicCategorias();
        return new ResponseEntity<>(listaComicCategorias, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getComicCategoria(@PathVariable int id) {
        var comicCategoria = comicCategoriaService.findById(id);
        if (!comicCategoria.isPresent())
            return new ResponseEntity<>("", HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(comicCategoria, HttpStatus.OK);
    }
    
    @GetMapping("/comic/{comicId}")
    public ResponseEntity<Object> getComicCategoriasByComic(@PathVariable int comicId) {
        var comicCategorias = comicCategoriaService.findByComicId(comicId);
        return new ResponseEntity<>(comicCategorias, HttpStatus.OK);
    }
    
    @GetMapping("/category/{categoryId}")
    public ResponseEntity<Object> getComicCategoriasByCategory(@PathVariable int categoryId) {
        var comicCategorias = comicCategoriaService.findByCategoryId(categoryId);
        return new ResponseEntity<>(comicCategorias, HttpStatus.OK);
    }

    @PostMapping("/anadir")
    public ResponseEntity<Object> addComicCategoria(@RequestBody ComicCategoryDto comicCategoriaDto) {
        ResponseDto respuesta = comicCategoriaService.save(comicCategoriaDto);
        return new ResponseEntity<>(respuesta, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> updateComicCategoria(@PathVariable int id, @RequestBody ComicCategoryDto comicCategoriaDto) {
        ResponseDto respuesta = comicCategoriaService.updateComicCategoria(id, comicCategoriaDto);
        return new ResponseEntity<>(respuesta, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteComicCategoria(@PathVariable int id) {
        var message = comicCategoriaService.deleteComicCategoria(id);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }
    
    @DeleteMapping("/comic/{comicId}/category/{categoryId}")
    public ResponseEntity<Object> deleteComicCategoriaByComicAndCategory(@PathVariable int comicId, @PathVariable int categoryId) {
        var message = comicCategoriaService.deleteByComicAndCategory(comicId, categoryId);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }
}