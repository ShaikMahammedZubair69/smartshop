# 🛒 SmartShop - Microservices E-Commerce Platform

SmartShop is a full‑stack, distributed e‑commerce platform built using **Microservices Architecture** to ensure scalability, high availability, and fault tolerance. The system supports secure authentication, event‑driven communication, high‑speed caching, and real‑time payment processing.

---

## 🏗️ Architecture

SmartShop is composed of independently deployable microservices that communicate via:

* **Synchronous REST APIs** (through API Gateway)
* **Asynchronous messaging** via **Apache Kafka**

### 📌 High-Level Data Flow

1. **React Client** sends requests to the API Gateway.
2. **Gateway** validates JWT tokens and routes requests to respective services.
3. **Product Service** uses **Redis caching** for O(1) read operations.
4. **Order Service** handles order placement and emits **Order Placed** events to Kafka.
5. **Notification Service** listens to Kafka events to simulate email alerts.

---

## 🛠️ Tech Stack

### 🚀 Backend

* **Java 17+**, **Spring Boot 3.x**
* **Netflix Eureka** (Service Discovery)
* **Spring Cloud Gateway** (Routing + JWT Validation)
* **Spring Security, JWT, BCrypt**
* **Apache Kafka, Zookeeper**
* **Redis Caching**
* **MySQL with Hibernate/JPA**

### 🎨 Frontend

* **React.js (Vite)**
* **Redux Toolkit**
* **Bootstrap 5 + Custom CSS**
* **Axios**
* **Razorpay SDK** for Payments

### ⚙️ DevOps & Tools

* **Docker** (Kafka, Zookeeper, Redis)
* **Postman** for API Testing
* **Maven** for Build Automation

---

## 📦 Microservices Overview

| Service Name             | Port | Description                        | Key Tech                 |
| ------------------------ | ---- | ---------------------------------- | ------------------------ |
| **Discovery Service**    | 8761 | Eureka Service Registry            | Netflix Eureka           |
| **API Gateway**          | 8080 | Routing, CORS, Auth                | Spring Cloud Gateway     |
| **Identity Service**     | 8081 | User Auth, Login, Token issuing    | Spring Security, JWT     |
| **Product Service**      | 8082 | Product Catalog, Caching           | Redis                    |
| **Order Service**        | 8083 | Order placing, Payment init        | Kafka Producer, Razorpay |
| **Notification Service** | 8084 | Kafka Consumer, Logs notifications | Kafka                    |

---

## ✨ Key Features

### 1. 🔐 Advanced Security

* Stateless **JWT Authentication**
* Gateway-level validation using custom filters
* Password encryption with **BCrypt**

### 2. ⚡ High Performance

* **Redis caching** via `@Cacheable`
* **Cache Eviction** using `@CacheEvict` to maintain data consistency

### 3. 📡 Event‑Driven Architecture

* Order Service sends events to Kafka without waiting for notifications
* If Notification Service is offline, the order still processes normally

### 4. 💳 Real-Time Payments

* Full Razorpay integration
* Backend ➝ Frontend ➝ Backend payment verification flow

### 5. 🖥️ User & Admin Dashboards

* Admin panel to add products + image URLs
* Users can track their entire order history

---

## 🚀 Setup & Installation

### ✅ Prerequisites

* Java 17 or 21
* Node.js & npm
* Docker Desktop
* MySQL Workbench

### **Step 1: Start Infrastructure (Docker)**

Run inside project root:

```bash
docker-compose up -d
```

### **Step 2: Database Setup**

Run in MySQL:

```sql
CREATE DATABASE smartshop_products;
CREATE DATABASE smartshop_orders;
CREATE DATABASE smartshop_users;
```

### **Step 3: Start Backend Services**

Run in this order:

1. DiscoveryServiceApplication
2. ApiGatewayApplication
3. IdentityServiceApplication
4. ProductServiceApplication
5. OrderServiceApplication
6. NotificationServiceApplication

### **Step 4: Start Frontend**

```bash
cd smartshop-client
npm install
npm run dev
```

Open: **[http://localhost:5173](http://localhost:5173)**

---

## 🧪 How to Test

1. **Register/Login** through UI
2. **Admin Panel** → `/admin` → Add product with image URL
3. **Browse Products** (loaded via Redis + Cloud URLs)
4. **Add to Cart** → Checkout → “Pay with Razorpay”
5. Use Razorpay Test Mode (Netbanking → SBI → Success)
6. After payment:

   * Order appears in **My Orders**
   * Notification Service logs: `RECEIVED NOTIFICATION FOR ORDER...`

---

## 🔮 Future Improvements

* **Resilience4j Circuit Breakers**
* **Zipkin Distributed Tracing**
* **Kubernetes Deployment & Auto‑Scaling**

---

## 👤 Author

Built by **Shaik Mahammed Zubair** as a Full‑Stack Microservices Project.
