package com.sena.crud_basic.model;

import jakarta.persistence.*;
import java.sql.Date;

@Entity(name = "comics")
public class Comics {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comic_id")
    private int comicId;

    @Column(name = "title", length = 100, nullable = false)
    private String title;
    
    @Column(name = "price", nullable = false)
    private double price;
    
    @Column(name = "stock", nullable = false)
    private int stock;
    
    @Column(name = "publication_date")
    private Date publicationDate;

    @Column(name = "image", length = 255, nullable = false)
    private String image;
    
    @ManyToOne
    @JoinColumn(name = "editorial_id")
    private Editorials editorials;
    
    @ManyToOne
    @JoinColumn(name = "serie_id")
    private Series serie;
    
    public Comics() {
    }

    public Comics(String title, double price, int stock, String image, Date publicationDate, Editorials editorials, Series serie) {
        this.title = title;
        this.price = price;
        this.stock = stock;
        this.image = image;
        this.publicationDate = publicationDate;
        this.editorials = editorials;
        this.serie = serie;
    }

    public int getComicId() {
        return comicId;
    }

    public void setComicId(int comicId) {
        this.comicId = comicId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public int getStock() {
        return stock;
    }

    public void setStock(int stock) {
        this.stock = stock;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Date getPublicationDate() {
        return publicationDate;
    }

    public void setPublicationDate(Date publicationDate) {
        this.publicationDate = publicationDate;
    }

    public Editorials getEditorials() {
        return editorials;
    }

    public void setEditorials(Editorials editorials) {
        this.editorials = editorials;
    }

    public Series getSerie() {
        return serie;
    }

    public void setSerie(Series serie) {
        this.serie = serie;
    }
}