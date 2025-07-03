package com.sena.crud_basic.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.sena.crud_basic.Dto.EmployeesDto;
import com.sena.crud_basic.Dto.ResponseDto;
import com.sena.crud_basic.model.Employees;
import com.sena.crud_basic.repository.IEmployees;

@Service
public class EmployeesService {

    @Autowired
    private IEmployees employeesRepository;
    
    public ResponseDto save(EmployeesDto employeesDto) {
        if (employeesDto.getName().length() < 1 || employeesDto.getName().length() > 50) {
            return new ResponseDto(HttpStatus.BAD_REQUEST.toString(), "El nombre debe estar entre 1 y 50 caracteres");
        }
        
        if (employeesDto.getRol().length() < 1 || employeesDto.getRol().length() > 50) {
            return new ResponseDto(HttpStatus.BAD_REQUEST.toString(), "El rol debe estar entre 1 y 50 caracteres");
        }

        Employees employeesRegister = convertToModel(employeesDto);
        employeesRepository.save(employeesRegister);
        return new ResponseDto(HttpStatus.OK.toString(), "Empleado agregado correctamente");
    }

    public ResponseDto updateEmployees(int id, EmployeesDto employeesDto) {
        Optional<Employees> employeesOpt = findById(id);
        if (!employeesOpt.isPresent()) {
            return new ResponseDto(HttpStatus.NOT_FOUND.toString(), "El empleado no existe");
        }

        Employees employeesRegister = employeesOpt.get();

        if (employeesDto.getName() != null) {
            if (employeesDto.getName().length() < 1 || employeesDto.getName().length() > 50) {
                return new ResponseDto(HttpStatus.BAD_REQUEST.toString(), "El nombre debe estar entre 1 y 50 caracteres");
            }
            employeesRegister.setName(employeesDto.getName());
        }

        if (employeesDto.getRol() != null) {
            if (employeesDto.getRol().length() < 1 || employeesDto.getRol().length() > 50) {
                return new ResponseDto(HttpStatus.BAD_REQUEST.toString(), "El rol debe estar entre 1 y 50 caracteres");
            }
            employeesRegister.setRol(employeesDto.getRol());
        }

        employeesRegister.setStatus(employeesDto.getStatus());

        employeesRepository.save(employeesRegister);
        return new ResponseDto(HttpStatus.OK.toString(), "Empleado actualizado correctamente");
    }

    public List<Employees> getAllEmployees() {
        return employeesRepository.findAll();
    }
    
    public List<Employees> getActiveEmployees() {
        return employeesRepository.getListEmployeesActive();
    }
    
    public List<Employees> searchEmployees(String filter) {
        return employeesRepository.getListEmployees(filter);
    }

    public Optional<Employees> findById(int id) {
        return employeesRepository.findById(id);
    }

    public ResponseDto deleteEmployees(int id) {
        Optional<Employees> employeesOpt = findById(id);
        if (!employeesOpt.isPresent()) {
            return new ResponseDto(HttpStatus.NOT_FOUND.toString(), "Empleado no existe");
        }
        
        // Soft delete - set status to false instead of deleting
        Employees employee = employeesOpt.get();
        employee.setStatus(false);
        employeesRepository.save(employee);
        
        return new ResponseDto(HttpStatus.OK.toString(), "Empleado desactivado correctamente");
    }
    
    public ResponseDto hardDeleteEmployees(int id) {
        if (!findById(id).isPresent()) {
            return new ResponseDto(HttpStatus.NOT_FOUND.toString(), "Empleado no existe");
        }
        employeesRepository.deleteById(id);
        return new ResponseDto(HttpStatus.OK.toString(), "Empleado eliminado permanentemente");
    }

    public EmployeesDto convertToDto(Employees employees) {
        return new EmployeesDto(employees.getName(), employees.getRol(), employees.getStatus());
    }
    
    public Employees convertToModel(EmployeesDto employeesDto) {
        Employees employee = new Employees();
        employee.setName(employeesDto.getName());
        employee.setRol(employeesDto.getRol());
        employee.setStatus(employeesDto.getStatus());
        return employee;
    }
}