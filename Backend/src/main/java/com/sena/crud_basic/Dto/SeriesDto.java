package com.sena.crud_basic.Dto;

public class SeriesDto {

    private int serieId;
    private String name;
    private String description;

    public SeriesDto() {
    }

    public SeriesDto(String name, String description) {
        this.name = name;
        this.description = description;
    }

    public int getSerieId() {
        return serieId;
    }

    public void setSerieId(int serieId) {
        this.serieId = serieId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
