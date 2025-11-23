package com.smartshop.order_service.service;

import com.smartshop.order_service.dto.OrderLineItemsDto;
import com.smartshop.order_service.dto.OrderRequest;
import com.smartshop.order_service.dto.TransactionDetails;
import com.smartshop.order_service.entity.Order;
import com.smartshop.order_service.entity.OrderLineItems;
import com.smartshop.order_service.repository.OrderRepository;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;


import com.razorpay.RazorpayClient; // Import this
import com.razorpay.RazorpayException; // Import this
import org.json.JSONObject;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final KafkaTemplate<String, String> kafkaTemplate;

    private String keyId = "rzp_test_Rj6HAew7TW6RHm";
    private String keySecret = "ykkd1pTXypau7yWbAC6WDRCb";

    public OrderService(OrderRepository orderRepository, KafkaTemplate<String, String> kafkaTemplate) {
        this.orderRepository = orderRepository;
        this.kafkaTemplate = kafkaTemplate;
    }

//    public String placeOrder(OrderRequest orderRequest) {
//        Order order = new Order();
//        order.setOrderNumber(UUID.randomUUID().toString());
//
//        List<OrderLineItems> orderLineItems = orderRequest.getOrderLineItemsDtoList()
//                .stream()
//                .map(this::mapToDto)
//                .collect(Collectors.toList());
//
//        order.setOrderLineItemsList(orderLineItems);
//
//        // 1. Save Order to DB
//        orderRepository.save(order);
//
//        // 2. Send Message to Kafka
//        kafkaTemplate.send("notificationTopic", order.getOrderNumber());
//
//        return "Order Placed Successfully";
//    }
    // In OrderService.java
    public String placeOrder(OrderRequest orderRequest, String userId) { // <--- ADD userId param
        Order order = new Order();
        order.setOrderNumber(UUID.randomUUID().toString());
        order.setUserId(userId); // <--- SAVE IT!

        // ... rest of the mapping and saving code ...
        List<OrderLineItems> orderLineItems = orderRequest.getOrderLineItemsDtoList()
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
        order.setOrderLineItemsList(orderLineItems);

        orderRepository.save(order);
        kafkaTemplate.send("notificationTopic", order.getOrderNumber());

        return "Order Placed Successfully";
    }

    // --- ADD THIS NEW METHOD TO FETCH HISTORY ---
    public List<Order> getOrdersByUser(String userId) {
        return orderRepository.findByUserId(userId);
    }

    private OrderLineItems mapToDto(OrderLineItemsDto orderLineItemsDto) {
        OrderLineItems orderLineItems = new OrderLineItems();
        orderLineItems.setPrice(orderLineItemsDto.getPrice());
        orderLineItems.setQuantity(orderLineItemsDto.getQuantity());
        orderLineItems.setSkuCode(orderLineItemsDto.getSkuCode());
        return orderLineItems;
    }
    public TransactionDetails createTransaction(Double amount) {
        try {
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("amount", (amount * 100)); // Amount in Paise (100 INR = 10000 paise)
            jsonObject.put("currency", "INR");

            RazorpayClient razorpayClient = new RazorpayClient(keyId, keySecret);

            // Call Razorpay to create the order
            com.razorpay.Order order = razorpayClient.orders.create(jsonObject);

            // Prepare response for Frontend
            return new TransactionDetails(order.get("id"), keyId, "INR", (int)(amount * 100));

        } catch (RazorpayException e) {
            throw new RuntimeException(e.getMessage());
        }
    }
}
