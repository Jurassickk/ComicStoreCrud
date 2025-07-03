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

import com.sena.crud_basic.Dto.OrderDto;
import com.sena.crud_basic.Dto.ResponseDto;
import com.sena.crud_basic.service.OrderService;

@RestController
@RequestMapping("/api/v1/orders")
public class OrderController {
    
    @Autowired
    private OrderService orderService;

    @GetMapping("/")
    public ResponseEntity<Object> getAllOrders() {
        var order = orderService.getAllOrders();
        return new ResponseEntity<>(order, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getOrder(@PathVariable int id) {
        var order = orderService.findById(id);
        if (!order.isPresent())
            return new ResponseEntity<>("", HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(order, HttpStatus.OK);
    }
    
    @GetMapping("/supplier/{supplierId}")
    public ResponseEntity<Object> getOrdersBySupplier(@PathVariable int supplierId) {
        var orders = orderService.getOrdersBySupplier(supplierId);
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }
    
    @GetMapping("/comic/{comicId}")
    public ResponseEntity<Object> getOrdersByComic(@PathVariable int comicId) {
        var orders = orderService.getOrdersByComic(comicId);
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    @PostMapping("/anadir")
    public ResponseEntity<Object> addOrder(@RequestBody OrderDto orderDto) {
        ResponseDto respuesta = orderService.save(orderDto);
        return new ResponseEntity<>(respuesta, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> updateOrder(@PathVariable int id, @RequestBody OrderDto orderDto) {
        ResponseDto respuesta = orderService.updateOrder(id, orderDto);
        return new ResponseEntity<>(respuesta, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteOrder(@PathVariable int id) {
        var message = orderService.deleteOrder(id);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }
}