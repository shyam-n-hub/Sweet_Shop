package com.shyam.shop.Repository;

import com.shyam.shop.Models.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AuthRepository extends MongoRepository<User,String> {
    Optional<User> findByEmail(String email);
}
