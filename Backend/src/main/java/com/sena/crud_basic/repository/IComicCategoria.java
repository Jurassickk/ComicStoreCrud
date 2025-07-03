package com.sena.crud_basic.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.sena.crud_basic.model.ComicCategoria;

public interface IComicCategoria extends JpaRepository<ComicCategoria, Integer> {

    @Query("SELECT cc FROM ComicCategoria cc WHERE cc.comic.comicId = :comicId AND cc.category.categoryId = :categoryId")
    Optional<ComicCategoria> findByComicIdAndCategoryId(@Param("comicId") int comicId,
            @Param("categoryId") int categoryId);

    @Query("SELECT c FROM ComicCategoria c WHERE c.comic.comicId = :comicId")
    List<ComicCategoria> findByComicId(@Param("comicId") int comicId);

    @Query("SELECT c FROM ComicCategoria c WHERE c.category.categoryId = :categoryId")
    List<ComicCategoria> findByCategoryId(@Param("categoryId") int categoryId);
}