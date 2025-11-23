package com.smartshop.notification_service;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.kafka.annotation.KafkaListener;

@SpringBootApplication
@EnableDiscoveryClient
// @Slf4j  <-- REMOVED THIS
public class NotificationServiceApplication {

    // --- ADDED THIS MANUALLY ---
    private static final Logger log = LoggerFactory.getLogger(NotificationServiceApplication.class);

    public static void main(String[] args) {
        SpringApplication.run(NotificationServiceApplication.class, args);
    }

    @KafkaListener(topics = "notificationTopic", groupId = "notificationId")
    public void handleNotification(String orderNumber) {
        // Now 'log' will work perfectly
        log.info("------------------------------------------");
        log.info("RECEIVED NOTIFICATION FOR ORDER - {}", orderNumber);
        log.info("SENDING EMAIL TO USER...");
        log.info("------------------------------------------");
    }
}