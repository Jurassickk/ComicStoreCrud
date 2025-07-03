package com.sena.crud_basic.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.sena.crud_basic.Dto.SuppliersDto;
import com.sena.crud_basic.Dto.ResponseDto;
import com.sena.crud_basic.model.Suppliers;
import com.sena.crud_basic.repository.ISuppliers;

@Service
public class SuppliersService {

    @Autowired
    private ISuppliers suppliersRepository;
    
    public ResponseDto save(SuppliersDto suppliersDto) {
        if (suppliersDto.getName().length() < 1 || suppliersDto.getName().length() > 100) {
            return new ResponseDto(HttpStatus.BAD_REQUEST.toString(), "El nombre del proveedor debe estar entre 1 y 100 caracteres");
        }

        Suppliers suppliersRegister = convertToModel(suppliersDto);
        suppliersRepository.save(suppliersRegister);
        return new ResponseDto(HttpStatus.OK.toString(), "Proveedor agregado correctamente");
    }

    public ResponseDto updateSuppliers(int id, SuppliersDto suppliersDto) {
        Optional<Suppliers> suppliersOpt = findById(id);
        if (!suppliersOpt.isPresent()) {
            return new ResponseDto(HttpStatus.NOT_FOUND.toString(), "El proveedor no existe");
        }

        Suppliers suppliersRegister = suppliersOpt.get();

        if (suppliersDto.getName() != null) {
            if (suppliersDto.getName().length() < 1 || suppliersDto.getName().length() > 100) {
                return new ResponseDto(HttpStatus.BAD_REQUEST.toString(), "El nombre del proveedor debe estar entre 1 y 100 caracteres");
            }
            suppliersRegister.setName(suppliersDto.getName());
        }

        suppliersRepository.save(suppliersRegister);
        return new ResponseDto(HttpStatus.OK.toString(), "Proveedor actualizado correctamente");
    }

    public List<Suppliers> getAllSuppliers() {
        return suppliersRepository.findAll();
    }

    public Optional<Suppliers> findById(int id) {
        return suppliersRepository.findById(id);
    }

    public ResponseDto deleteSuppliers(int id) {
        Optional<Suppliers> suppliersOpt = findById(id);
        if (!suppliersOpt.isPresent()) {
            return new ResponseDto(HttpStatus.NOT_FOUND.toString(), "Proveedor no existe");
        }
        
        suppliersRepository.deleteById(id);
        return new ResponseDto(HttpStatus.OK.toString(), "Proveedor eliminado correctamente");
    }

    public SuppliersDto convertToDto(Suppliers suppliers) {
        return new SuppliersDto(suppliers.getName( ));
    }
    
    public Suppliers convertToModel(SuppliersDto suppliersDto) {
        Suppliers supplier = new Suppliers();
        supplier.setName(suppliersDto.getName());
        return supplier;
    }
}