package com.smartshop.product_service.respository;

import com.smartshop.product_service.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    // Empty for now. Standard CRUD methods are inherited.
}