package com.smartshop.product_service.service;

import com.smartshop.product_service.entity.Product;
import com.smartshop.product_service.respository.ProductRepository;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ProductService {

    private final ProductRepository repository;

    public ProductService(ProductRepository repository) {
        this.repository = repository;
    }

    /**
     * Create Product
     * Time Complexity: O(1) - Database insertion is constant time (ignoring index updates).
     * Space Complexity: O(1) - We are storing a single object.
     */
    @CacheEvict(value = "products", allEntries = true)
    public Product createProduct(Product product) {
        return repository.save(product);
    }

    /**
     * Get All Products
     * Time Complexity: O(N) - Where N is the total number of products in the DB.
     * Space Complexity: O(N) - We load N products into memory (Java List).
     * NOTE: In production, we would use Pagination (Pageable) to keep this O(Size) instead of O(N).
     */
    @Cacheable(value = "products", key = "'allProducts'") // <--- NEW ANNOTATION
    public List<Product> getAllProducts() {
        System.out.println("--- FETCHING FROM DATABASE ---"); // Helps visualize the cache miss
        return repository.findAll();
    }
}
