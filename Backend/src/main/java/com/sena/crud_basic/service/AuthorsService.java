package com.sena.crud_basic.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.sena.crud_basic.Dto.AuthorDto;
import com.sena.crud_basic.Dto.ResponseDto;
import com.sena.crud_basic.model.Author;
import com.sena.crud_basic.repository.IAuthors;
import java.util.List;
import java.util.Optional;

@Service
public class AuthorsService {

    @Autowired
    private IAuthors authorsRepository;

    public ResponseDto save(AuthorDto authorsDto) {
        if (authorsDto.getName().length() < 1 || authorsDto.getName().length() > 50) {
            return new ResponseDto(HttpStatus.BAD_REQUEST.toString(), "The first name must be between 1 and 50 characters");
        }

        Author authorToSave = convertToModel(authorsDto);
        authorsRepository.save(authorToSave);
        return new ResponseDto(HttpStatus.OK.toString(), "Author added successfully");
    }

    public ResponseDto updateAuthor(int id, AuthorDto authorsDto) {
        Optional<Author> optionalAuthor = findById(id);
        if (!optionalAuthor.isPresent()) {
            return new ResponseDto(HttpStatus.NOT_FOUND.toString(), "Author not found");
        }

        Author author = optionalAuthor.get();

        if (authorsDto.getName() != null) {
            author.setName(authorsDto.getName());
        }

        if (authorsDto.getNationality() != null) {
            author.setNationality(authorsDto.getNationality());
        }

        authorsRepository.save(author);
        return new ResponseDto(HttpStatus.OK.toString(), "Author updated successfully");
    }

    public List<Author> getAllAuthors() {
        return authorsRepository.findAll();
    }

    public List<Author> getAuthorsByNationality(String nationality) {
        return authorsRepository.getListAuthorsByNationality(nationality);
    }


    public Optional<Author> findById(int id) {
        return authorsRepository.findById(id);
    }

    public ResponseDto deleteAuthor(int id) {
        Optional<Author> optionalAuthor = findById(id);
        if (!optionalAuthor.isPresent()) {
            return new ResponseDto(HttpStatus.NOT_FOUND.toString(), "Author not found");
        }
        authorsRepository.deleteById(id);
        return new ResponseDto(HttpStatus.OK.toString(), "Author deleted successfully");
    }

    public AuthorDto convertToDto(Author author) {
        AuthorDto dto = new AuthorDto();
        dto.setAuthorId(author.getAuthorId());
        dto.setName(author.getName());
        dto.setNationality(author.getNationality());
        return dto;
    }

    public Author convertToModel(AuthorDto authorsDto) {
        Author author = new Author();
        author.setName(authorsDto.getName());
        author.setNationality(authorsDto.getNationality());
        return author;
    }
}
