package com.sena.crud_basic.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;


@Entity (name = "ComicCategoria")
public class ComicCategoria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private int id;

    @ManyToOne
    @JoinColumn(name = "comic_id", nullable = false)
    private Comics comic;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Categories category;

    public ComicCategoria() {
    }

    public ComicCategoria(int id, Comics comic, Categories category) {
        this.id = id;
        this.comic = comic;
        this.category = category;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Comics getComic() {
        return comic;
    }

    public void setComic(Comics comic) {
        this.comic = comic;
    }

    public Categories getCategory() {
        return category;
    }

    public void setCategory(Categories category) {
        this.category = category;
    }

}
