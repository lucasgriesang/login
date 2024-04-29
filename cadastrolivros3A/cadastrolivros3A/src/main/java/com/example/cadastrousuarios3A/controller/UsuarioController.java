package com.example.cadastrousuarios3A.controller;

import com.example.cadastrousuarios3A.model.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import org.springframework.http.ResponseEntity;
import com.example.cadastrousuarios3A.repository.UsuarioRepository;

@CrossOrigin(origins = "http://localhost:5173") // Endereço do front
@RestController
@RequestMapping("/usuarios") // Alterado o endpoint para /usuarios
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @GetMapping
    public List<Usuario> listarUsuarios() { // Alterado o nome do método para listarUsuarios
        return usuarioRepository.findAll();
    }

    @PostMapping
    public Usuario criarUsuario(@RequestBody Usuario usuario) { // Alterado o nome do método para criarUsuario
        return usuarioRepository.save(usuario);
    }

    @PostMapping("/login")
    public Boolean login(@RequestBody Usuario usuario) {
        List<Usuario> usuarios = usuarioRepository.findAll();
        for (Usuario u : usuarios) {
            if (u.getNome().equals(usuario.getNome())
                    && u.getSenha().equals(usuario.getSenha())) {
                return true;
            }
        }
        return false;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletarUsuario(@PathVariable Long id) { // Alterado o nome do método para deletarUsuario
        if (usuarioRepository.existsById(id)) {
            usuarioRepository.deleteById(id);
            return ResponseEntity.ok("Usuário deletado com sucesso.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Usuario> atualizarUsuario(@PathVariable(name = "id") Long id, @RequestBody Usuario usuarioAtualizado) { // Alterado o nome do método para atualizarUsuario
        if (usuarioRepository.existsById(id)) {
            Usuario usuario = usuarioRepository.findById(id).get();
            usuario.setNome(usuarioAtualizado.getNome());
            usuario.setEmail(usuarioAtualizado.getEmail());
            usuario.setSenha(usuarioAtualizado.getSenha());
            usuario.setDataNascimento(usuarioAtualizado.getDataNascimento());

            Usuario usuarioAtualizadoBD = usuarioRepository.save(usuario);
            return ResponseEntity.ok(usuarioAtualizadoBD);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
