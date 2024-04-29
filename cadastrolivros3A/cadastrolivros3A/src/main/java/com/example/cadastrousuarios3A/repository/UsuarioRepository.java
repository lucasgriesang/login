package com.example.cadastrousuarios3A.repository;


import com.example.cadastrousuarios3A.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;


public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
}
