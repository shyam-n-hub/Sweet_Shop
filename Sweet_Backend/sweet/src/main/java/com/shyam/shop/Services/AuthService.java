package com.shyam.shop.Services;

import com.shyam.shop.Models.Role;
import com.shyam.shop.Models.User;
import com.shyam.shop.Repository.AuthRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    BCryptPasswordEncoder passwordEncoder;
    @Autowired
    AuthRepository repository;
    @Autowired
    private PasswordEncoder encoder;



    @Value("${spring.mongodb.database}")
    private String databaseName;

    @PostConstruct
    public void testDB() {
        System.out.println("=================================");
        System.out.println("Active Database: " + databaseName);

        System.out.println("=================================");
    }
    public List<User> getAllTodos(){
        List<User> users = repository.findAll();
        System.out.println("Retrieved " + users.size() + " User");
        return users;
    }

    public User getByid(String id){
        System.out.println("Fetching user with ID: [" + id + "]");
        return repository.findById(id).orElse(null);
    }

    public User createTodo(User user) {
        // Check if user already exists
        Optional<User> existingUser = repository.findByEmail(user.getEmail());
        if (existingUser.isPresent()) {
            throw new RuntimeException("User with this email already exists");
        }

        // Set default values
        if (user.getRole() == null) {
            user.setRole(Role.USER); // Set default role
        }

        if (user.getEnabled() == null) {
            user.setEnabled(true); // Set default enabled status
        }

        // Encode password
        user.setPassword(encoder.encode(user.getPassword()));

        // Set timestamps
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());

        return repository.save(user);
    }





    public String DeleteTodo(String id){
        try {
            repository.deleteById(id);
            return id + " Deleted";
        }catch (Exception e){
            return "Error: " + e.getMessage();
        }
    }

    public User UpdateTodo(User user){
        System.out.println("Updating user: " + user);
        return repository.save(user);

    }
}
