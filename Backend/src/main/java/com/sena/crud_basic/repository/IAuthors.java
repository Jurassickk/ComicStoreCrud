package com.sena.crud_basic.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

import com.sena.crud_basic.model.Author;
public interface IAuthors extends JpaRepository<Author, Integer> {
    
    @Query("SELECT a FROM Author a WHERE a.nationality = ?1")
    List<Author> getListAuthorsByNationality(String nationality);

}
