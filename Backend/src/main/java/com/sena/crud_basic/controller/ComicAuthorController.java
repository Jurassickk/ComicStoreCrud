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

import com.sena.crud_basic.Dto.ComicAuthorDto;
import com.sena.crud_basic.Dto.ResponseDto;
import com.sena.crud_basic.service.ComicAuthorService;

@RestController
@RequestMapping("/api/v1/comic-authors")
public class ComicAuthorController {
    
    @Autowired
    private ComicAuthorService comicAuthorService;

    @GetMapping("/")
    public ResponseEntity<Object> getAllComicAuthors() {
        var listaComicAuthors = comicAuthorService.getAllComicAuthors();
        return new ResponseEntity<>(listaComicAuthors, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getComicAuthor(@PathVariable int id) {
        var comicAuthor = comicAuthorService.findById(id);
        if (!comicAuthor.isPresent())
            return new ResponseEntity<>("", HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(comicAuthor, HttpStatus.OK);
    }
    
    @GetMapping("/comic/{comicId}")
    public ResponseEntity<Object> getComicAuthorsByComic(@PathVariable int comicId) {
        var comicAuthors = comicAuthorService.findByComicId(comicId);
        return new ResponseEntity<>(comicAuthors, HttpStatus.OK);
    }
    
    @GetMapping("/author/{authorId}")
    public ResponseEntity<Object> getComicAuthorsByAuthor(@PathVariable int authorId) {
        var comicAuthors = comicAuthorService.findByAuthorId(authorId);
        return new ResponseEntity<>(comicAuthors, HttpStatus.OK);
    }

    @PostMapping("/anadir")
    public ResponseEntity<Object> addComicAuthor(@RequestBody ComicAuthorDto comicAuthorDto) {
        ResponseDto respuesta = comicAuthorService.save(comicAuthorDto);
        return new ResponseEntity<>(respuesta, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> updateComicAuthor(@PathVariable int id, @RequestBody ComicAuthorDto comicAuthorDto) {
        ResponseDto respuesta = comicAuthorService.updateComicAuthor(id, comicAuthorDto);
        return new ResponseEntity<>(respuesta, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteComicAuthor(@PathVariable int id) {
        var message = comicAuthorService.deleteComicAuthor(id);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }
}