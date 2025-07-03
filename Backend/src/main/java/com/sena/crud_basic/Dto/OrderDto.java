package com.sena.crud_basic.Dto;

public class OrderDto {

    private int orderId;
    private int supplierId;
    private int comicId;

    public OrderDto() {
    }

    public OrderDto(int orderId, int supplierId, int comicId) {
        this.orderId = orderId;
        this.supplierId = supplierId;
        this.comicId = comicId;
    }

    public int getOrderId() {
        return orderId;
    }

    public void setOrderId(int orderId) {
        this.orderId = orderId;
    }

    public int getSupplierId() {
        return supplierId;
    }

    public void setSupplierId(int supplierId) {
        this.supplierId = supplierId;
    }

    public int getComicId() {
        return comicId;
    }

    public void setComicId(int comicId) {
        this.comicId = comicId;
    }   
}
