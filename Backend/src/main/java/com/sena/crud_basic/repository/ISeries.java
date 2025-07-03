package com.sena.crud_basic.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.sena.crud_basic.model.Series;

public interface ISeries extends JpaRepository<Series, Integer> {
    
    @Query("SELECT s FROM series s WHERE s.name LIKE %?1% OR s.description LIKE %?1%")
    List<Series> getListSeriesByNameOrDescription(String filter);
    
    @Query("SELECT s FROM series s ORDER BY s.name ASC")
    List<Series> getListSeriesOrderedByName();
}