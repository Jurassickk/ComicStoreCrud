package com.sena.crud_basic.Dto;

public class SuppliersDto {

    private int supplierId;
    private String name;

    public SuppliersDto() {
    }

    public SuppliersDto(String name) {
        this.name = name;
    }

    public int getSupplierId() {
        return supplierId;
    }

    public void setSupplierId(int supplierId) {
        this.supplierId = supplierId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

}
