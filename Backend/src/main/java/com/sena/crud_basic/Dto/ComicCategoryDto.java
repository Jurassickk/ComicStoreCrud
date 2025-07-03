package com.sena.crud_basic.Dto;

public class ComicCategoryDto {

    private int comicId;
    private int categoryId;

    public ComicCategoryDto() {
    }

    public ComicCategoryDto(int comicId, int categoryId) {
        this.comicId = comicId;
        this.categoryId = categoryId;
    }

    public int getComicId() {
        return comicId;
    }

    public void setComicId(int comicId) {
        this.comicId = comicId;
    }

    public int getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(int categoryId) {
        this.categoryId = categoryId;
    }
    
}
