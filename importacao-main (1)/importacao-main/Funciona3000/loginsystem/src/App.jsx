// Importa o módulo React do pacote react
import React from 'react';
// Importa módulos específicos do pacote react-router-dom
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Importa o componente Home da pasta 'pages'
import Login from './pages/login';
// Importa o componente Sobre da pasta 'pages'
import Cadastro from './pages/cadastro';
// Define a função do componente principal App
import Home from './pages/home';
// Define a função do componente principal App
function App() {
  // Retorna a estrutura de roteamento usando o BrowserRouter
  return (
    <Router>
      {/* Define as rotas usando o componente Routes */}
      <Routes>
        <Route path="/" element={<Login />} />        
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}
// Exporta o componente App como padrão
export default App;