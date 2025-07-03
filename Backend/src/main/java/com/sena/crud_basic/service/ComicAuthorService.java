package com.sena.crud_basic.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.sena.crud_basic.Dto.ComicAuthorDto;
import com.sena.crud_basic.Dto.ResponseDto;
import com.sena.crud_basic.model.ComicAuthor;
import com.sena.crud_basic.model.Comics;
import com.sena.crud_basic.model.Author;
import com.sena.crud_basic.repository.IComicAuthor;
import com.sena.crud_basic.repository.IComics;
import com.sena.crud_basic.repository.IAuthors;

@Service
public class ComicAuthorService {

    @Autowired
    private IComicAuthor comicAuthorRepository;
    
    @Autowired
    private IComics comicsRepository;
    
    @Autowired
    private IAuthors authorRepository;
    
    public ResponseDto save(ComicAuthorDto comicAuthorDto) {
        if (comicAuthorDto.getRole().length() < 1 || comicAuthorDto.getRole().length() > 50) {
            return new ResponseDto(HttpStatus.BAD_REQUEST.toString(), "El rol debe estar entre 1 y 50 caracteres");
        }
        
        // Verificar que exista el comic
        Optional<Comics> comicOpt = comicsRepository.findById(comicAuthorDto.getComicId());
        if (!comicOpt.isPresent()) {
            return new ResponseDto(HttpStatus.BAD_REQUEST.toString(), "El cómic especificado no existe");
        }
        
        // Verificar que exista el autor
        Optional<Author> authorOpt = authorRepository.findById(comicAuthorDto.getAuthorId());
        if (!authorOpt.isPresent()) {
            return new ResponseDto(HttpStatus.BAD_REQUEST.toString(), "El autor especificado no existe");
        }

        ComicAuthor comicAuthorRegister = convertToModel(comicAuthorDto);
        comicAuthorRepository.save(comicAuthorRegister);
        return new ResponseDto(HttpStatus.OK.toString(), "Relación cómic-autor agregada correctamente");
    }

    public ResponseDto updateComicAuthor(int id, ComicAuthorDto comicAuthorDto) {
        Optional<ComicAuthor> comicAuthorOpt = findById(id);
        if (!comicAuthorOpt.isPresent()) {
            return new ResponseDto(HttpStatus.NOT_FOUND.toString(), "La relación cómic-autor no existe");
        }

        ComicAuthor comicAuthorRegister = comicAuthorOpt.get();

        if (comicAuthorDto.getComicId() != 0) {
            Optional<Comics> comicOpt = comicsRepository.findById(comicAuthorDto.getComicId());
            if (!comicOpt.isPresent()) {
                return new ResponseDto(HttpStatus.BAD_REQUEST.toString(), "El cómic especificado no existe");
            }
            comicAuthorRegister.setComic(comicOpt.get());
        }

        if (comicAuthorDto.getAuthorId() != 0) {
            Optional<Author> authorOpt = authorRepository.findById(comicAuthorDto.getAuthorId());
            if (!authorOpt.isPresent()) {
                return new ResponseDto(HttpStatus.BAD_REQUEST.toString(), "El autor especificado no existe");
            }
            comicAuthorRegister.setAuthor(authorOpt.get());
        }

        if (comicAuthorDto.getRole() != null) {
            if (comicAuthorDto.getRole().length() < 1 || comicAuthorDto.getRole().length() > 50) {
                return new ResponseDto(HttpStatus.BAD_REQUEST.toString(), "El rol debe estar entre 1 y 50 caracteres");
            }
            comicAuthorRegister.setRole(comicAuthorDto.getRole());
        }

        comicAuthorRepository.save(comicAuthorRegister);
        return new ResponseDto(HttpStatus.OK.toString(), "Relación cómic-autor actualizada correctamente");
    }

    public List<ComicAuthor> getAllComicAuthors() {
        return comicAuthorRepository.findAll();
    }

    public Optional<ComicAuthor> findById(int id) {
        return comicAuthorRepository.findById(id);
    }
    
    public List<ComicAuthor> findByComicId(int comicId) {
        return comicAuthorRepository.findByComicId(comicId);
    }
    
    public List<ComicAuthor> findByAuthorId(int authorId) {
        return comicAuthorRepository.findByAuthorId(authorId);
    }

    public ResponseDto deleteComicAuthor(int id) {
        Optional<ComicAuthor> comicAuthorOpt = findById(id);
        if (!comicAuthorOpt.isPresent()) {
            return new ResponseDto(HttpStatus.NOT_FOUND.toString(), "Relación cómic-autor no existe");
        }
        
        comicAuthorRepository.deleteById(id);
        return new ResponseDto(HttpStatus.OK.toString(), "Relación cómic-autor eliminada correctamente");
    }

    public ComicAuthorDto convertToDto(ComicAuthor comicAuthor) {
        return new ComicAuthorDto(
            comicAuthor.getComic().getComicId(), 
            comicAuthor.getAuthor().getAuthorId(), 
            comicAuthor.getRole()
        );
    }
    
    public ComicAuthor convertToModel(ComicAuthorDto comicAuthorDto) {
        ComicAuthor comicAuthor = new ComicAuthor();
        
        if (comicAuthorDto.getComicId() != 0) {
            Comics comic = comicsRepository.findById(comicAuthorDto.getComicId()).orElse(null);
            comicAuthor.setComic(comic);
        }
        
        if (comicAuthorDto.getAuthorId() != 0) {
            Author author = authorRepository.findById(comicAuthorDto.getAuthorId()).orElse(null);
            comicAuthor.setAuthor(author);
        }
        
        comicAuthor.setRole(comicAuthorDto.getRole());
        return comicAuthor;
    }
}