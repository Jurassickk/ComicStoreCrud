package com.sena.crud_basic.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.sena.crud_basic.model.Order;

public interface IOrder extends JpaRepository<Order, Integer> {

    @Query("SELECT o FROM Order o WHERE o.supplier.id = :supplierId")
    List<Order> findBySupplier(@Param("supplierId") int supplierId);

    @Query("SELECT o FROM Order o WHERE o.comic_id = :comicId")
    List<Order> findByComicId(@Param("comicId") int comicId);
}
