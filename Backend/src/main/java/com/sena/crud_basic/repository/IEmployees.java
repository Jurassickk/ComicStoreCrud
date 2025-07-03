
package com.sena.crud_basic.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.sena.crud_basic.model.Employees;

public interface IEmployees extends JpaRepository<Employees, Integer> {

    @Query("SELECT u FROM employees u WHERE u.status != false")
    List<Employees> getListEmployeesActive();

    @Query("SELECT u FROM employees u WHERE u.name LIKE %?1%")
    List<Employees> getListEmployees(String filter);
    
}
