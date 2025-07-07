package com.sena.crud_basic.repository;

import com.sena.crud_basic.model.Token;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface TokenRepository extends JpaRepository<Token, Long> {

    @Query("SELECT t FROM tokens t WHERE t.expired = FALSE AND t.revoked = FALSE AND t.user.id = :id")
    List<Token> findAllValidTokensByUser(@Param("id") int id);

    @Query("SELECT t FROM tokens t WHERE t.token = :token")
    Optional<Token> findByToken(@Param("token") String token);
}
