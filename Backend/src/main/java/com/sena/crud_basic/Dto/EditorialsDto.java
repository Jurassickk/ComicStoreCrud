package com.sena.crud_basic.Dto;

public class EditorialsDto {

    private int editorialId;
    private String name;
    private String country;

    public EditorialsDto() {
    }

    public EditorialsDto(String name, String country) {
        this.name = name;
        this.country = country;
    }

    public int getEditorialId() {
        return editorialId;
    }

    public void setEditorialId(int editorialId) {
        this.editorialId = editorialId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }
}
