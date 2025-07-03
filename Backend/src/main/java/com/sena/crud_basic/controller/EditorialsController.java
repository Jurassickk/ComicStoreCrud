package com.sena.crud_basic.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sena.crud_basic.service.EditorialsService;
import com.sena.crud_basic.Dto.EditorialsDto;
import com.sena.crud_basic.Dto.ResponseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/v1/editorials")
public class EditorialsController {

    @Autowired
    private EditorialsService editorialsService;

    @GetMapping("/")
    public ResponseEntity<Object> getAllEditorials() {
        var listaEditorials = editorialsService.getAllEditoriales();
        return new ResponseEntity<>(listaEditorials, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getEditorial(@PathVariable int id) {
        var editorial = editorialsService.findById(id);
        if (!editorial.isPresent())
            return new ResponseEntity<>("", HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(editorial, HttpStatus.OK);
    }

    @PostMapping("/anadir")
    public ResponseEntity<Object> addEditorial(@RequestBody EditorialsDto editorialsDto) {
        ResponseDto respuesta = editorialsService.save(editorialsDto);
        return new ResponseEntity<>(respuesta, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> updateEditorial(@PathVariable int id, @RequestBody EditorialsDto editorialsDto) {
        ResponseDto respuesta = editorialsService.updateEditoriales(id, editorialsDto);
        return new ResponseEntity<>(respuesta, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteEditorial(@PathVariable int id) {
        var message = editorialsService.deleteEditoriales(id);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @GetMapping("/filter/{filter}")
    public ResponseEntity<Object> getEditorialsByName(@PathVariable String filter) {
        var editorials = editorialsService.getEditorialsByName(filter);
        return new ResponseEntity<>(editorials, HttpStatus.OK);
    }

    @GetMapping("/ordered")
    public ResponseEntity<Object> getEditorialsOrderedByName() {
        var editorialsOrdered = editorialsService.getEditorialsOrderedByName();
        return new ResponseEntity<>(editorialsOrdered, HttpStatus.OK);
    }

    @GetMapping("/country/{country}")
    public ResponseEntity<Object> getEditorialsByCountry(@PathVariable String country) {
        var editorials = editorialsService.getEditorialsByCountry(country);
        return new ResponseEntity<>(editorials, HttpStatus.OK);
    }


}
