package com.sena.crud_basic.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.sena.crud_basic.model.ComicAuthor;

public interface IComicAuthor extends JpaRepository<ComicAuthor, Integer> {

    @Query("SELECT ca FROM comicAuthor ca WHERE ca.comics.comicId = :comicId")
    List<ComicAuthor> findByComicId(@Param("comicId") int comicId);

    @Query("SELECT ca FROM comicAuthor ca WHERE ca.author.id = :authorId")
    List<ComicAuthor> findByAuthorId(@Param("authorId") int authorId);
}
