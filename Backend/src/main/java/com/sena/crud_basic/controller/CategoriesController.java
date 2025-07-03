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

import com.sena.crud_basic.service.CategoriesService;
import com.sena.crud_basic.Dto.CategoriesDto;
import com.sena.crud_basic.Dto.ResponseDto;

@RestController
@RequestMapping("/api/v1/categories")
public class CategoriesController {
    
    @Autowired
    private CategoriesService categoriesService;

    @GetMapping("/")
    public ResponseEntity<Object>getAllCategories(){
        var listaCategories = categoriesService.getAllCategories();
        return new ResponseEntity<>(listaCategories, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object>getCategory(@PathVariable int id){
        var category = categoriesService.findById(id);
        if(!category.isPresent())
            return new ResponseEntity<>("", HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(category, HttpStatus.OK);
    }

    @PostMapping("/anadir")
    public ResponseEntity<Object>addCategory(@RequestBody CategoriesDto categoriesDto){
        System.out.println(categoriesDto);
        ResponseDto respuesta = categoriesService.save(categoriesDto);
        return new ResponseEntity<>(respuesta, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object>updateCategory(@PathVariable int id, @RequestBody CategoriesDto categoriesDto){
        ResponseDto respuesta = categoriesService.updateCategories(id, categoriesDto);
        return new ResponseEntity<>(respuesta, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object>deleteCategory(@PathVariable int id){
        var message = categoriesService.deleteCategories(id);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }
}
