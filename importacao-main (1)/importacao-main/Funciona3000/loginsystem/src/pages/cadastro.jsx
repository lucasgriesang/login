
import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
function Cadastro() {
  const [usuarios, setusuarios] = useState([]);
const [novousuario, setNovousuario] = useState({
  nome: '',
  email: '',
  senha: '',
  datanacimento: '',
 
});

useEffect(() => {
  fetchUsuario();
}, []);

//get
const fetchUsuario = async () => {
  try {
    const response = await axios.get('http://localhost:8090/usuarios');
    setusuarios(response.data);
  } catch (error) {
    console.error('Erro ao buscar usuarios:', error); 
  }
};

//Atualização dos inputs
const handleInputChange = (event) => {
  const { name, value } = event.target;
  setNovousuario((prevusuario) => ({
    ...prevusuario,
    [name]: value
    
  }));


};
//Post 
const handleSubmit = async (event) => {
  event.preventDefault();
  try {
    await axios.post('http://localhost:8090/usuarios', novousuario);
    fetchUsuario();
    setNovousuario({
      nome: '',
      email: '',
      senha: '',
      datanacimento: '',
    });
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
  }
};
//Delete
const handleDelete = async (id) => {
  try {
    await axios.delete(`http://localhost:8090/usuarios/${id}`);
    fetchUsuario();
  } catch (error) {

    console.error('Erro ao excluir usuário:', error);
  }
};
//Put
const handleUpdate = async (id, usuarioAtualizado) => {
  try {
    await axios.put(`http://localhost:8090/usuarios/${id}`, usuarioAtualizado);
    fetchUsuario();
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
  }
};
const irPara= useNavigate();
const handleClick = () => {
    // Navegar para a página Home ao clicar em algum botão
    irPara('/');
  };
//Renderização
return (
  <div>
    {/* Cabeçalho */}
    <h1>Gerenciamento de usuário</h1>

    {/* Formulário de adição de veículo */}
    <form onSubmit={handleSubmit}>
      {/* Campo para o nome */}
      <input
        type="text"
        name="nome"
        placeholder="nome"
        value={novousuario.nome}
        onChange={handleInputChange}
      />
      {/* Campo para a montadora */}
      <input
        type="text"
        name="email"
        placeholder="email"
        value={novousuario.email}
        onChange={handleInputChange}
      />
      {/* Campo para o modelo */}
      <input
        type="text"
        name="senha"
        placeholder="senha"
        value={novousuario.senha}
        onChange={handleInputChange}
      />
      {/* Campo para o ano */}
      <input
        type="text"
        name="datanacimento"
        placeholder="datanacimento"
        value={novousuario.datanacimento}
        onChange={handleInputChange}
      />
      {/* Botão de envio do formulário */}
      <button type="submit">Adicionar usuário</button>
      <button onClick={handleClick}>Ir para Home</button>
    </form>

    {/* Lista de veículos */}
    <ul>
      {/* Mapeamento dos veículos */}
      {usuarios.map((usuario) => (
        <li key={usuario.id}>
          {/* Exibição dos detalhes do veículo */}
          {usuario.nome} - {usuario.email} - {usuario.senha} - {usuario.datanacimento}
          
          {/* Botão de exclusão */}
          <button onClick={() => handleDelete(usuario.id)}>Excluir</button>
          
          {/* Botão de atualização */}
          <button
            onClick={() =>
              handleUpdate(usuario.id, {
                ...usuario,
              nome: novousuario.nome !== "" ? novousuario.nome : usuario.nome, // Exemplo de atualização
              email: novousuario.email !== "" ? novousuario.email : usuario.email, // Exemplo de atualização
              senha: novousuario.senha !== "" ? novousuario.senha : usuario.senha, // Exemplo de atualização
              datanacimento: novousuario.datanacimento !== "" ? novousuario.datanacimento : usuario.datanacimento, // Exemplo de atualização
              })
            }
          >
            Atualizar
          </button>
        </li>
      ))}
    </ul>
  </div>
);


}
export default Cadastro;