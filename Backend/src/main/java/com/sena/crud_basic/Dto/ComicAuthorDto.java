package com.sena.crud_basic.Dto;

public class ComicAuthorDto {

    private int comicId;
    private int authorId;
    private String role;

    public ComicAuthorDto() {
    }

    public ComicAuthorDto(int comicId, int authorId, String role) {
        this.comicId = comicId;
        this.authorId = authorId;
        this.role = role;
    }

    public int getComicId() {
        return comicId;
    }

    public void setComicId(int comicId) {
        this.comicId = comicId;
    }

    public int getAuthorId() {
        return authorId;
    }

    public void setAuthorId(int authorId) {
        this.authorId = authorId;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
