package com.sena.crud_basic.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sena.crud_basic.model.Suppliers;

public interface ISuppliers extends JpaRepository<Suppliers, Integer> {

}
