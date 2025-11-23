package com.smartshop.order_service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TransactionDetails {
    private String orderId;
    private String currency;
    private Integer amount;
    private String key; // We send the Key ID back to frontend so it knows which account to use

    // Constructor to match the Service return
    public TransactionDetails(String orderId, String key, String currency, Integer amount) {
        this.orderId = orderId;
        this.key = key;
        this.currency = currency;
        this.amount = amount;
    }
}
