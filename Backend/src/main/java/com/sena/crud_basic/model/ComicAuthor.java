package com.sena.crud_basic.model;

import jakarta.persistence.*;

@Entity(name = "comicAuthor")
public class ComicAuthor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private int id;

    @ManyToOne
    @JoinColumn(name = "comic_id")
    private Comics comics;

    @ManyToOne
    @JoinColumn(name = "author_id")
    private Author author;

    @Column(name = "role", length = 50, nullable = false)
    private String role;

    public ComicAuthor() {
    }

    public ComicAuthor(int id, Comics comics, Author author, String role) {
        this.id = id;
        this.comics = comics;
        this.author = author;
        this.role = role;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Comics getComic() {
        return comics;
    }

    public void setComic(Comics comic) {
        this.comics = comic;
    }

    public Author getAuthor() {
        return author;
    }

    public void setAuthor(Author author) {
        this.author = author;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}

