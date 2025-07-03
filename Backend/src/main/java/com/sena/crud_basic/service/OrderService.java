package com.sena.crud_basic.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.sena.crud_basic.Dto.OrderDto;
import com.sena.crud_basic.Dto.ResponseDto;
import com.sena.crud_basic.model.Order;
import com.sena.crud_basic.model.Suppliers;
import com.sena.crud_basic.model.Comics;
import com.sena.crud_basic.repository.IOrder;
import com.sena.crud_basic.repository.ISuppliers;
import com.sena.crud_basic.repository.IComics;

@Service
public class OrderService {

    @Autowired
    private IOrder orderRepository;
    
    @Autowired
    private ISuppliers suppliersRepository;
    
    @Autowired
    private IComics comicsRepository;
    
    public ResponseDto save(OrderDto orderDto) {
        // Verificar que exista el proveedor
        Optional<Suppliers> supplierOpt = suppliersRepository.findById(orderDto.getSupplierId());
        if (!supplierOpt.isPresent()) {
            return new ResponseDto(HttpStatus.BAD_REQUEST.toString(), "El proveedor especificado no existe");
        }
        
        // Verificar que exista el comic
        Optional<Comics> comicOpt = comicsRepository.findById(orderDto.getComicId());
        if (!comicOpt.isPresent()) {
            return new ResponseDto(HttpStatus.BAD_REQUEST.toString(), "El cómic especificado no existe");
        }

        Order orderRegister = convertToModel(orderDto);
        orderRepository.save(orderRegister);
        return new ResponseDto(HttpStatus.OK.toString(), "Orden agregada correctamente");
    }

    public ResponseDto updateOrder(int id, OrderDto orderDto) {
        Optional<Order> orderOpt = findById(id);
        if (!orderOpt.isPresent()) {
            return new ResponseDto(HttpStatus.NOT_FOUND.toString(), "La orden no existe");
        }

        Order orderRegister = orderOpt.get();

        if (orderDto.getSupplierId() != 0) {
            Optional<Suppliers> supplierOpt = suppliersRepository.findById(orderDto.getSupplierId());
            if (!supplierOpt.isPresent()) {
                return new ResponseDto(HttpStatus.BAD_REQUEST.toString(), "El proveedor especificado no existe");
            }
            orderRegister.setSupplier(supplierOpt.get());
        }

        if (orderDto.getComicId() != 0) {
            Optional<Comics> comicOpt = comicsRepository.findById(orderDto.getComicId());
            if (!comicOpt.isPresent()) {
                return new ResponseDto(HttpStatus.BAD_REQUEST.toString(), "El cómic especificado no existe");
            }
            orderRegister.setComic_id(comicOpt.get());
        }

        orderRepository.save(orderRegister);
        return new ResponseDto(HttpStatus.OK.toString(), "Orden actualizada correctamente");
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }
    
    public List<Order> getOrdersBySupplier(int supplierId) {
        return orderRepository.findBySupplier(supplierId);
    }
    
    public List<Order> getOrdersByComic(int comicId) {
        return orderRepository.findByComicId(comicId);
    }

    public Optional<Order> findById(int id) {
        return orderRepository.findById(id);
    }

    public ResponseDto deleteOrder(int id) {
        Optional<Order> orderOpt = findById(id);
        if (!orderOpt.isPresent()) {
            return new ResponseDto(HttpStatus.NOT_FOUND.toString(), "Orden no existe");
        }
        
        orderRepository.deleteById(id);
        return new ResponseDto(HttpStatus.OK.toString(), "Orden eliminada correctamente");
    }

    public OrderDto convertToDto(Order order) {
        return new OrderDto(
            order.getOrder_id(), // orderId
            order.getSupplier().getSupplier_id(), 
            order.getComic_id().getComicId()
        );
    }
    
    public Order convertToModel(OrderDto orderDto) {
        Order order = new Order();
        
        if (orderDto.getSupplierId() != 0) {
            Suppliers supplier = suppliersRepository.findById(orderDto.getSupplierId()).orElse(null);
            order.setSupplier(supplier);
        }
        
        if (orderDto.getComicId() != 0) {
            Comics comic = comicsRepository.findById(orderDto.getComicId()).orElse(null);
            order.setComic_id(comic);
        }
        
        return order;
    }
}