package com.sena.crud_basic.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity(name="employees") //Indica que la clase es una entidad name q es el nombre de la tabla de la base de datos
public class Employees {

    @Id // es una llave primaria de la base de datos
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Indica que la columna es una llave primaria
    @Column(name="employee_id") // Indica el nombre de la columna
    private int employee_id;

    @Column(name="name", length = 50, nullable = false)
    private String name; // Indica el nombre de la columna

    @Column(name="rol", length = 50, nullable = false)
    private String rol; // Indica el nombre de la columna

    @Column(name="status",nullable =false, columnDefinition = "boolean default true ")
    private boolean status;


    //Constructor vacio
    public Employees() {
    }

    public Employees(int employee_id, String name, String rol, boolean status) {
        this.employee_id = employee_id;
        this.name = name;
        this.rol = rol;
        this.status = status;
    }

    public int getEmployee_id() {
        return employee_id;
    }

    public void setEmployee_id(int employee_id) {
        this.employee_id = employee_id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getRol() {
        return rol;
    }

    public void setRol(String rol) {
        this.rol = rol;
    }

    public boolean getStatus() {
        return status;
     }
  
     public void setStatus(boolean status) {
        this.status = status;
     }
}
