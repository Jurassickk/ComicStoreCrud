
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

import com.sena.crud_basic.Dto.SuppliersDto;
import com.sena.crud_basic.Dto.ResponseDto;
import com.sena.crud_basic.service.SuppliersService;

@RestController
@RequestMapping("/api/v1/suppliers")
public class SuppliersController {
    
    @Autowired
    private SuppliersService suppliersService;

    @GetMapping("/")
    public ResponseEntity<Object> getAllSuppliers() {
        var listaSuppliers = suppliersService.getAllSuppliers();
        return new ResponseEntity<>(listaSuppliers, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getSupplier(@PathVariable int id) {
        var supplier = suppliersService.findById(id);
        if (!supplier.isPresent())
            return new ResponseEntity<>("", HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(supplier, HttpStatus.OK);
    }

    @PostMapping("/anadir")
    public ResponseEntity<Object> addSupplier(@RequestBody SuppliersDto suppliersDto) {
        ResponseDto respuesta = suppliersService.save(suppliersDto);
        return new ResponseEntity<>(respuesta, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> updateSupplier(@PathVariable int id, @RequestBody SuppliersDto suppliersDto) {
        ResponseDto respuesta = suppliersService.updateSuppliers(id, suppliersDto);
        return new ResponseEntity<>(respuesta, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteSupplier(@PathVariable int id) {
        var message = suppliersService.deleteSuppliers(id);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }
}