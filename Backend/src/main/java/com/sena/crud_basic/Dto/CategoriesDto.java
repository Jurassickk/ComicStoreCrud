package com.sena.crud_basic.Dto;

public class CategoriesDto {

    private int categoryId;
    private String name;

    public CategoriesDto() {
    }

    public CategoriesDto(String name) {
        this.name = name;
    }

    public int getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(int categoryId) {
        this.categoryId = categoryId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

}
