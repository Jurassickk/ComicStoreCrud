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

import com.sena.crud_basic.Dto.SeriesDto;
import com.sena.crud_basic.Dto.ResponseDto;
import com.sena.crud_basic.service.SeriesService;

@RestController
@RequestMapping("/api/v1/series")
public class SeriesController {
    
    @Autowired
    private SeriesService seriesService;

    @GetMapping("/")
    public ResponseEntity<Object> getAllSeries() {
        var listaSeries = seriesService.getAllSeries();
        return new ResponseEntity<>(listaSeries, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getSeries(@PathVariable int id) {
        var series = seriesService.findById(id);
        if (!series.isPresent())
            return new ResponseEntity<>("", HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(series, HttpStatus.OK);
    }

    @GetMapping("/filter/{filter}")
    public ResponseEntity<Object> getSeriesByNameOrDescription(@PathVariable String filter) {
        var seriesList = seriesService.getSeriesByNameOrDescription(filter);
        return new ResponseEntity<>(seriesList, HttpStatus.OK);
    }

    @GetMapping("/ordered")
    public ResponseEntity<Object> getSeriesOrderedByName() {
        var seriesOrdered = seriesService.getSeriesOrderedByName();
        return new ResponseEntity<>(seriesOrdered, HttpStatus.OK);
    }

    @PostMapping("/anadir")
    public ResponseEntity<Object> addSeries(@RequestBody SeriesDto seriesDto) {
        ResponseDto respuesta = seriesService.save(seriesDto);
        return new ResponseEntity<>(respuesta, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> updateSeries(@PathVariable int id, @RequestBody SeriesDto seriesDto) {
        ResponseDto respuesta = seriesService.updateSeries(id, seriesDto);
        return new ResponseEntity<>(respuesta, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteSeries(@PathVariable int id) {
        var message = seriesService.deleteSeries(id);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }
}