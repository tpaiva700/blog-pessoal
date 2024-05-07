import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function NavBar(){

    let navigate = useNavigate();

    const { usuario, handleLogout } = useContext(AuthContext);

    function logout(){
        handleLogout()
        alert('Usuário deslogado')
        navigate('/login')
    }

    let navbarComponent;

    return (
        <div className="w-full bg-cyan-950 text-white flex justify-center py-4">
            <div className="container flex justify-between text-lg">
                <div className="text-2x1 font-bold uppercase italic"> Blog Pessoal </div>
                
                <div className="flex gap-4">
                    <Link to='/login' className="hover:underline">Login</Link>
                    <Link to='/home' className="hover:underline">Home</Link>
                    <Link to='/cadastro' className="hover:underline">Cadastro</Link>
                    <Link to='/temas' className="hover:underline">Temas</Link>
                    <Link to='/cadastroTema' className="hover:underline">Cadastrar tema</Link>
                    <div className='hover:underline'>Postagens</div>
                    <div className='hover:underline'>Perfil</div>
                    <Link to='' onClick={logout} className='hover:underline'>Sair</Link>
                </div>
            </div>
        </div>
    );
}

export default NavBar;