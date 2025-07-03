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

import com.sena.crud_basic.Dto.AuthorDto;
import com.sena.crud_basic.service.AuthorsService;


@RestController
@RequestMapping("/api/v1/authors")
public class AuthorController {

    @Autowired
    private AuthorsService authorService;

    @GetMapping("/{id}")
    public ResponseEntity<Object> getAuthor(@PathVariable int id) {
        var author = authorService.findById(id);
        if (!author.isPresent())
            return new ResponseEntity<>("", HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(author, HttpStatus.OK);
    }

    @GetMapping("/")
    public ResponseEntity<Object> getAllAuthors() {
        var authors = authorService.getAllAuthors();
        return new ResponseEntity<>(authors, HttpStatus.OK);
    }

    @GetMapping("/nationality/{nationality}")
    public ResponseEntity<Object> getAuthorsByNationality(@PathVariable String nationality) {
        var authors = authorService.getAuthorsByNationality(nationality);
        return new ResponseEntity<>(authors, HttpStatus.OK);
    }
    
    @PostMapping("/anadir")
    public ResponseEntity<Object> saveAuthor(@RequestBody AuthorDto authorDto) {
        var message = authorService.save(authorDto);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> updateAuthor(@PathVariable int id, @RequestBody AuthorDto authorDto) {
        var message = authorService.updateAuthor(id, authorDto);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteAuthor(@PathVariable int id) {
        var message = authorService.deleteAuthor(id);
        return new ResponseEntity<>(message, HttpStatus.OK);        
    }
   
}
