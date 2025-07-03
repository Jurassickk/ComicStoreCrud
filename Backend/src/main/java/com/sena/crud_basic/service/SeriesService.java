package com.sena.crud_basic.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.http.HttpStatus;

import com.sena.crud_basic.Dto.SeriesDto;
import com.sena.crud_basic.Dto.ResponseDto;
import com.sena.crud_basic.model.Series;
import com.sena.crud_basic.repository.ISeries;

@Service
public class SeriesService {

    @Autowired
    private ISeries seriesRepository;

    public ResponseDto save(SeriesDto seriesDto) {
        if (seriesDto.getName().length() < 1 || seriesDto.getName().length() > 100) {
            return new ResponseDto(HttpStatus.BAD_REQUEST.toString(), "El nombre debe estar entre 1 y 100 caracteres");
        }

        Series seriesRegister = convertToModel(seriesDto);
        seriesRepository.save(seriesRegister);
        return new ResponseDto(HttpStatus.OK.toString(), "Serie agregada correctamente");
    }

    public ResponseDto updateSeries(int id, SeriesDto seriesDto) {
        Optional<Series> seriesOpt = findById(id);
        if (!seriesOpt.isPresent()) {
            return new ResponseDto(HttpStatus.NOT_FOUND.toString(), "La serie no existe");
        }
        
        Series serie = seriesOpt.get();
        
        if (seriesDto.getName() != null) {
            serie.setName(seriesDto.getName());
        }
        
        if (seriesDto.getDescription() != null) {
            serie.setDescription(seriesDto.getDescription());
        }
        
        seriesRepository.save(serie);
        return new ResponseDto(HttpStatus.OK.toString(), "Serie actualizada correctamente");
    }

    public List<Series> getAllSeries() {
        return seriesRepository.findAll();
    }

    public Optional<Series> findById(int id) {
        return seriesRepository.findById(id);
    }

    public List<Series> getSeriesByNameOrDescription(String filter) {
        return seriesRepository.getListSeriesByNameOrDescription(filter);
    }

    public List<Series> getSeriesOrderedByName() {
        return seriesRepository.getListSeriesOrderedByName();
    }

    public ResponseDto deleteSeries(int id) {
        Optional<Series> seriesOpt = findById(id);
        if (!seriesOpt.isPresent()) {
            return new ResponseDto(HttpStatus.NOT_FOUND.toString(), "La serie no existe");
        }   
        seriesRepository.deleteById(id);
        return new ResponseDto(HttpStatus.OK.toString(), "Serie eliminada correctamente");
    }

    public SeriesDto convertToDto(Series serie) {
        SeriesDto dto = new SeriesDto();
        dto.setSerieId(serie.getSerieId());
        dto.setName(serie.getName());
        dto.setDescription(serie.getDescription());
        return dto;
    }
    
    public Series convertToModel(SeriesDto seriesDto) {
        Series serie = new Series();
        serie.setName(seriesDto.getName());
        serie.setDescription(seriesDto.getDescription());
        return serie;
    }
}