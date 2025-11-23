package com.smartshop.identity_service.repository;



import com.smartshop.identity_service.entity.UserCredential;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserCredentialRepository extends JpaRepository<UserCredential, Integer> {
    // We will need this to look up a user by email for login later
    Optional<UserCredential> findByEmail(String email);
    Optional<UserCredential> findByName(String name);
}
