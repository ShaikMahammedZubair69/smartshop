package com.smartshop.order_service.controller;

import com.smartshop.order_service.dto.OrderRequest;
import com.smartshop.order_service.dto.TransactionDetails;
import com.smartshop.order_service.entity.Order;
import com.smartshop.order_service.service.OrderService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/order")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }
//
//    @PostMapping
//    @ResponseStatus(HttpStatus.CREATED)
//    public String placeOrder(@RequestBody OrderRequest orderRequest) {
//        return orderService.placeOrder(orderRequest);
//    }


    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public String placeOrder(@RequestBody OrderRequest orderRequest,
                             @RequestHeader("loggedInUser") String userId) { // <--- READ HEADER
        return orderService.placeOrder(orderRequest, userId);
    }
    @GetMapping("/user/{userId}")
    public List<Order> getUserOrders(@PathVariable String userId) {
        return orderService.getOrdersByUser(userId);
    }


    // ... existing imports

    @GetMapping("/createTransaction/{amount}")
    public TransactionDetails createTransaction(@PathVariable Double amount) {
        return orderService.createTransaction(amount);
    }
}