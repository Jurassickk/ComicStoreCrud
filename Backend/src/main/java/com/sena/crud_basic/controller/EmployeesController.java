package com.sena.crud_basic.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sena.crud_basic.Dto.EmployeesDto;
import com.sena.crud_basic.Dto.ResponseDto;
import com.sena.crud_basic.service.EmployeesService;

@RestController
@RequestMapping("/api/v1/employees")
public class EmployeesController {

    @Autowired
    private EmployeesService employeesService;

    @GetMapping("/")
    public ResponseEntity<Object> getAllEmployees() {
        var listaEmployee = employeesService.getAllEmployees();
        return new ResponseEntity<>(listaEmployee, HttpStatus.OK);  
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getEmployee(@PathVariable int id) {
        var employee = employeesService.findById(id);
        if (!employee.isPresent())
            return new ResponseEntity<>("", HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(employee, HttpStatus.OK);
    }

    @GetMapping("/filter/{filter}")
    public ResponseEntity<Object> getListEmployees(@PathVariable String filter) {
        var EmployeesList = employeesService.searchEmployees(filter);
        return new ResponseEntity<>(EmployeesList, HttpStatus.OK);
    }

    @PostMapping("/anadir")
    public ResponseEntity<Object> addEmployee(@RequestBody EmployeesDto employeesDto) {
        ResponseDto respuesta = employeesService.save(employeesDto);
        return new ResponseEntity<>(respuesta, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> updateEmployee(@PathVariable int id, @RequestBody EmployeesDto employeesDto) {
        ResponseDto respuesta = employeesService.updateEmployees(id, employeesDto);
        return new ResponseEntity<>(respuesta, HttpStatus.OK);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteEmployee(@PathVariable int id) {
        var message= employeesService.deleteEmployees(id);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }
}
