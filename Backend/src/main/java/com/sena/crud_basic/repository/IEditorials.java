package com.sena.crud_basic.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

import com.sena.crud_basic.model.Editorials;

public interface IEditorials extends JpaRepository<Editorials, Integer> {

    @Query("SELECT e FROM editorials e WHERE e.name LIKE %?1%")
    List<Editorials> getListEditorialesByName(String filter);
    
    @Query("SELECT e FROM editorials e WHERE e.country = ?1")
    List<Editorials> getListEditorialesByCountry(String country);
    
    @Query("SELECT e FROM editorials e ORDER BY e.name ASC")
    List<Editorials> getListEditorialesOrderedByName();

}
