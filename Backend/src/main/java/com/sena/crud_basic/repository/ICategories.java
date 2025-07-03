package com.sena.crud_basic.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.sena.crud_basic.model.Categories;

public interface ICategories extends JpaRepository<Categories, Integer> {

}
