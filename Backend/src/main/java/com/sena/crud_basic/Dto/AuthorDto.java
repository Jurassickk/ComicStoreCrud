package com.sena.crud_basic.Dto;

public class AuthorDto {

    private int authorId;
    private String name;
    private String nationality;

    public AuthorDto() {
    }

    public AuthorDto(String name, String nationality) {
        this.name = name;
        this.nationality = nationality;
    }

    public int getAuthorId() {
        return authorId;
    }

    public void setAuthorId(int authorId) {
        this.authorId = authorId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getNationality() {
        return nationality;
    }

    public void setNationality(String nationality) {
        this.nationality = nationality;
    }
}
