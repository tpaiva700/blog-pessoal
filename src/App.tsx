import Home from './paginas/home/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import Login from './paginas/Login/Login';
import Footer from './components/Footer/Footer';
import NavBar from './components/NavBar/NavBar';


function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
          <div className='min-h [80vh]'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/home' element={<Home />} />
          </Routes>
          </div>
          <Footer />
      </BrowserRouter>  
    </>
  );
}

export default App; 