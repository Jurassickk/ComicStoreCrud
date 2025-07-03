package com.sena.crud_basic.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.GeneratedValue;

import jakarta.persistence.GenerationType;

@Entity (name = "Order")
public class Order {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id")
    private int order_id;

    @OneToOne
    @JoinColumn(name = "supplier_id", nullable = false)
    private Suppliers supplier;

    @OneToOne
    @JoinColumn(name = "comic_id", nullable = false)
    private Comics comic_id;
    
    public Order() {
    }

    public Order(int order_id, Suppliers supplier, Comics comic_id) {
        this.order_id = order_id;
        this.supplier = supplier;
        this.comic_id = comic_id;
    }

    public int getOrder_id() {
        return order_id;
    }

    public void setOrder_id(int order_id) {
        this.order_id = order_id;
    }

    public Suppliers getSupplier() {
        return supplier;
    }

    public void setSupplier(Suppliers supplier) {
        this.supplier = supplier;
    }

    public Comics getComic_id() {
        return comic_id;
    }

    public void setComic_id(Comics comic_id) {
        this.comic_id = comic_id;
    }   
    

}
