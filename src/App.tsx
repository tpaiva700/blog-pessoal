import Home from './paginas/home/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import Login from './paginas/Login/Login';
import Footer from './components/Footer/Footer';
import NavBar from './components/NavBar/NavBar';
import Cadastro from './paginas/Cadastro/Cadastro';
import { AuthProvider } from './context/AuthContext';
import ListaTemas from './components/Temas/ListaTemas/ListaTemas';
import FormularioTema from './components/Temas/FormularioTema/FormulatioTema';
import DeletarTemas from './components/Temas/DeletarTemas/DeletarTemas';
import ListaPostagem from './components/Postagens/ListaPostagem/ListaPostagem';
import FormularioPostagem from './components/Postagens/FormularioPostagem/FormularioPostagem';
import DeletarPostagem from './components/Postagens/DeletarPostagem/DeletarPostagem';
import Perfil from './paginas/Perfil/Perfil';


function App() {
  return (
    <>
    <AuthProvider>
      <BrowserRouter>
        <NavBar />
          <div className='min-h [80vh]'>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/login' element={<Login />} />
            <Route path='/cadastro' element={<Cadastro />} />
            <Route path='/home' element={<Home />} />
            <Route path='/temas' element={<ListaTemas />} />
            <Route path="/cadastroTema" element={<FormularioTema />} />
            <Route path="/editarTema/:id" element={<FormularioTema />} />
            <Route path="/deletarTema/:id" element={<DeletarTemas />} />
            <Route path="/postagens" element={<ListaPostagem />} />
            <Route path="/cadastroPostagem" element={<FormularioPostagem />} />
            <Route path="/editarPostagem/:id" element={<FormularioPostagem />} />
            <Route path="/deletarPostagem/:id" element={<DeletarPostagem />} />
            <Route path="/perfil" element={<Perfil />} />
          </Routes>
          </div>
          <Footer />
      </BrowserRouter>  
    </AuthProvider>
    </>
  );
}

export default App; 