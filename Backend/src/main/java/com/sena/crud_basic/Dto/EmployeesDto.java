package com.sena.crud_basic.Dto;

public class EmployeesDto {

    private int employeeId;
    private String name;
    private String rol;
    private boolean status;

    public EmployeesDto() {
    }

    public EmployeesDto(String name, String rol, boolean status) {
        this.name = name;
        this.rol = rol;
        this.status = status;
    }

    public int getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(int employeeId) {
        this.employeeId = employeeId;
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
