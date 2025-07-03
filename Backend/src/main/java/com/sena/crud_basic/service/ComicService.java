package com.sena.crud_basic.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.http.HttpStatus;

import com.sena.crud_basic.Dto.ComicsDto;
import com.sena.crud_basic.Dto.ResponseDto;
import com.sena.crud_basic.model.Comics;
import com.sena.crud_basic.model.Editorials;
import com.sena.crud_basic.model.Series;
import com.sena.crud_basic.repository.IComics;
import com.sena.crud_basic.repository.IEditorials;
import com.sena.crud_basic.repository.ISeries;
import java.util.Date;

@Service
public class ComicService {

    @Autowired
    private IComics comicsRepository;
    
    @Autowired
    private IEditorials editorialsRepository;
    
    @Autowired
    private ISeries seriesRepository;

    public ResponseDto save(ComicsDto comicsDto) {
        if (comicsDto.getTitle().length() < 1 || comicsDto.getTitle().length() > 100) {
            return new ResponseDto(HttpStatus.BAD_REQUEST.toString(), "El título debe estar entre 1 y 100 caracteres");
        }
        
        if (comicsDto.getPrice() <= 0) {
            return new ResponseDto(HttpStatus.BAD_REQUEST.toString(), "El precio debe ser mayor que 0");
        }
        
        if (comicsDto.getStock() < 0) {
            return new ResponseDto(HttpStatus.BAD_REQUEST.toString(), "El stock no puede ser negativo");
        }
        
        Optional<Editorials> editorialOpt = editorialsRepository.findById(comicsDto.getEditorialId());
        if (!editorialOpt.isPresent()) {
            return new ResponseDto(HttpStatus.BAD_REQUEST.toString(), "La editorial no existe");
        }
        
        Optional<Series> serieOpt = seriesRepository.findById(comicsDto.getSerieId());
        if (!serieOpt.isPresent()) {
            return new ResponseDto(HttpStatus.BAD_REQUEST.toString(), "La serie no existe");
        }

         

        Comics comicsRegister = convertToModel(comicsDto);
        comicsRepository.save(comicsRegister);
        return new ResponseDto(HttpStatus.OK.toString(), "Cómic agregado correctamente");
    }

    public ResponseDto updateComics(int id, ComicsDto comicsDto) {
        Optional<Comics> comicsOpt = findById(id);
        if (!comicsOpt.isPresent()) {
            return new ResponseDto(HttpStatus.NOT_FOUND.toString(), "El cómic no existe");
        }
        
        Optional<Editorials> editorialOpt = editorialsRepository.findById(comicsDto.getEditorialId());
        if (!editorialOpt.isPresent()) {
            return new ResponseDto(HttpStatus.BAD_REQUEST.toString(), "La editorial no existe");
        }
        
        Optional<Series> serieOpt = seriesRepository.findById(comicsDto.getSerieId());
        if (!serieOpt.isPresent()) {
            return new ResponseDto(HttpStatus.BAD_REQUEST.toString(), "La serie no existe");
        }
        
        Comics comic = comicsOpt.get();
        
        if (comicsDto.getTitle() != null) {
            comic.setTitle(comicsDto.getTitle());
        }
        
        
        if (comicsDto.getPrice() > 0) {
            comic.setPrice(comicsDto.getPrice());
        }
        
        if (comicsDto.getStock() >= 0) {
            comic.setStock(comicsDto.getStock());
        }
        
        if (comicsDto.getPublicationDate() != null) {
            comic.setPublicationDate(comicsDto.getPublicationDate());
        }

        if (comicsDto.getImage() != null) {
            comic.setImage(comicsDto.getImage());
            
        }
        
        comic.setEditorials(editorialOpt.get());
        comic.setSerie(serieOpt.get());
        
        comicsRepository.save(comic);
        return new ResponseDto(HttpStatus.OK.toString(), "Cómic actualizado correctamente");
    }

    public List<Comics> getAllComics() {
        return comicsRepository.findAll();
    }

    public Optional<Comics> findById(int id) {
        return comicsRepository.findById(id);
    }

    public List<Comics> getComicsInStock() {
        return comicsRepository.getListComicsInStock();
    }

    public List<Comics> getComicsByPriceRange(double minPrice, double maxPrice) {
        return comicsRepository.getListComicsByPriceRange(minPrice, maxPrice);
    }

    public List<Comics> getComicsByEditorial(int editorialId) {
        return comicsRepository.getListComicsByEditorial(editorialId);
    }

    public List<Comics> getComicsBySerie(int serieId) {
        return comicsRepository.getListComicsBySerie(serieId);
    }

    public List<Comics> getComicsPublishedAfterDate(Date date) {
        return comicsRepository.getListComicsPublishedAfterDate(date);
    }

    public ResponseDto deleteComics(int id) {
        Optional<Comics> comicsOpt = findById(id);
        if (!comicsOpt.isPresent()) {
            return new ResponseDto(HttpStatus.NOT_FOUND.toString(), "El cómic no existe");
        }   
        comicsRepository.deleteById(id);
        return new ResponseDto(HttpStatus.OK.toString(), "Cómic eliminado correctamente");
    }

    public ComicsDto convertToDto(Comics comic) {
        ComicsDto dto = new ComicsDto();
        dto.setComicId(comic.getComicId());
        dto.setTitle(comic.getTitle());
        dto.setPrice(comic.getPrice());
        dto.setStock(comic.getStock());
        dto.setImage(comic.getImage());
        dto.setPublicationDate(new java.sql.Date(comic.getPublicationDate().getTime()));
        dto.setEditorialId(comic.getEditorials().getEditorialId());
        dto.setSerieId(comic.getSerie().getSerieId());
        return dto;
    }
    
    public Comics convertToModel(ComicsDto comicsDto) {
        Comics comic = new Comics();
        comic.setTitle(comicsDto.getTitle());
        comic.setPrice(comicsDto.getPrice());
        comic.setStock(comicsDto.getStock());
        comic.setImage(comicsDto.getImage());
        comic.setPublicationDate(comicsDto.getPublicationDate());
        
        Editorials editorial = editorialsRepository.findById(comicsDto.getEditorialId()).orElse(null);
        Series serie = seriesRepository.findById(comicsDto.getSerieId()).orElse(null);
        
        comic.setEditorials(editorial);
        comic.setSerie(serie);
        
        return comic;
    }
}
