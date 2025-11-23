package com.smartshop.identity_service.service;


import com.smartshop.identity_service.entity.UserCredential;
import com.smartshop.identity_service.repository.UserCredentialRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserCredentialRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    public AuthService(UserCredentialRepository repository, PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService=jwtService;
    }

    /**
     * Registers a new user, ensuring the password is hashed first.
     * Time Complexity: O(N) (due to BCrypt hashing)
     * Space Complexity: O(1)
     */
    public String saveUser(UserCredential credential) {
        // Hash the plain-text password before saving to the database
        credential.setPassword(passwordEncoder.encode(credential.getPassword()));
        repository.save(credential);
        return "User added successfully";
    }
    public String generateToken(String username) {
        return jwtService.generateToken(username);
    }
    public void validateToken(String token) {
        jwtService.validateToken(token);
    }
    // JWT logic methods (generateToken, validateToken) will go here later
}
