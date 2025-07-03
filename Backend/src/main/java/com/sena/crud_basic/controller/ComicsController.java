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

import com.sena.crud_basic.Dto.ComicsDto;
import com.sena.crud_basic.Dto.ResponseDto;
import com.sena.crud_basic.service.ComicService;

import java.util.Date;

@RestController
@RequestMapping("/api/v1/comics")
public class ComicsController {
    
    @Autowired
    private ComicService comicService;

    @GetMapping("/")
    public ResponseEntity<Object> getAllComics() {
        var listaComics = comicService.getAllComics();
        return new ResponseEntity<>(listaComics, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getComic(@PathVariable int id) {
        var comic = comicService.findById(id);
        if (!comic.isPresent())
            return new ResponseEntity<>("", HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(comic, HttpStatus.OK);
    }

    @GetMapping("/stock")
    public ResponseEntity<Object> getComicsInStock() {
        var comicsInStock = comicService.getComicsInStock();
        return new ResponseEntity<>(comicsInStock, HttpStatus.OK);
    }

    @GetMapping("/price-range/{min}/{max}")
    public ResponseEntity<Object> getComicsByPriceRange(@PathVariable double min, @PathVariable double max) {
        var comicsByPrice = comicService.getComicsByPriceRange(min, max);
        return new ResponseEntity<>(comicsByPrice, HttpStatus.OK);
    }

    @GetMapping("/editorial/{editorialId}")
    public ResponseEntity<Object> getComicsByEditorial(@PathVariable int editorialId) {
        var comicsByEditorial = comicService.getComicsByEditorial(editorialId);
        return new ResponseEntity<>(comicsByEditorial, HttpStatus.OK);
    }

    @GetMapping("/serie/{serieId}")
    public ResponseEntity<Object> getComicsBySerie(@PathVariable int serieId) {
        var comicsBySerie = comicService.getComicsBySerie(serieId);
        return new ResponseEntity<>(comicsBySerie, HttpStatus.OK);
    }

    @GetMapping("/published-after/{date}")
    public ResponseEntity<Object> getComicsPublishedAfterDate(@PathVariable Date date) {
        var comicsAfterDate = comicService.getComicsPublishedAfterDate(date);
        return new ResponseEntity<>(comicsAfterDate, HttpStatus.OK);
    }

    @PostMapping("/anadir")
    public ResponseEntity<Object> addComic(@RequestBody ComicsDto comicsDto) {
        ResponseDto respuesta = comicService.save(comicsDto);
        return new ResponseEntity<>(respuesta, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> updateComic(@PathVariable int id, @RequestBody ComicsDto comicsDto) {
        ResponseDto respuesta = comicService.updateComics(id, comicsDto);
        return new ResponseEntity<>(respuesta, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteComic(@PathVariable int id) {
        var message = comicService.deleteComics(id);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }
}