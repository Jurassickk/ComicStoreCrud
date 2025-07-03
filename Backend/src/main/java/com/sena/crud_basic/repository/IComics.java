package com.sena.crud_basic.repository;

import java.util.List;
import java.util.Date;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.sena.crud_basic.model.Comics;

public interface IComics extends JpaRepository<Comics, Integer> {
    
    @Query("SELECT c FROM comics c WHERE c.stock > 0")
    List<Comics> getListComicsInStock();
    
    @Query("SELECT c FROM comics c WHERE c.price BETWEEN ?1 AND ?2")
    List<Comics> getListComicsByPriceRange(double minPrice, double maxPrice);
    
    @Query("SELECT c FROM comics c WHERE c.editorials.editorialId = ?1")
    List<Comics> getListComicsByEditorial(int editorialId);
    
    @Query("SELECT c FROM comics c WHERE c.serie.serieId = ?1")
    List<Comics> getListComicsBySerie(int serieId);
    
    @Query("SELECT c FROM comics c WHERE c.publicationDate >= ?1")
    List<Comics> getListComicsPublishedAfterDate(Date date);
}