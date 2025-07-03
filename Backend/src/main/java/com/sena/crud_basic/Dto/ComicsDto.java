package com.sena.crud_basic.Dto;

import java.sql.Date;

public class ComicsDto {

    private int comicId;
    private String title;
    private double price;
    private int stock;
    private String image;
    private Date publicationDate;
    private int editorialId;
    private int serieId;

    public ComicsDto() {
    }

    public ComicsDto(String title,  double price, int stock, String image, Date publicationDate, int editorialId, int serieId) {
        this.title = title;
        this.price = price;
        this.stock = stock;
        this.image = image;
        this.publicationDate = publicationDate;
        this.editorialId = editorialId;
        this.serieId = serieId;
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

    public int getEditorialId() {
        return editorialId;
    }

    public void setEditorialId(int editorialId) {
        this.editorialId = editorialId;
    }

    public int getSerieId() {
        return serieId;
    }

    public void setSerieId(int serieId) {
        this.serieId = serieId;
    }
}
