import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { toastAlerta } from "../../utils/toastAlerta";

function NavBar(){

    let navigate = useNavigate();

    const { usuario, handleLogout } = useContext(AuthContext);

    function logout(){
        handleLogout()
        toastAlerta('Usuário deslogado', 'sucesso');
        navigate('/login')
    }

    let navbarComponent;

    if(usuario.token !== ""){
        navbarComponent = (
            <div className="w-full bg-cyan-950 text-white flex justify-center py-4">
            <div className="container flex justify-between text-lg">
                <div className="text-2x1 font-bold uppercase italic"> Blog Pessoal </div>
                
                <div className="flex gap-4">
                    <Link to='/home' className="hover:underline">Home</Link>
                    <Link to='/temas' className="hover:underline">Temas</Link>
                    <Link to='/cadastroTema' className="hover:underline">Cadastrar tema</Link>
                    <Link to='/postagens' className="hover:underline">Postagens</Link>
                    <Link to='/perfil' className='hover:underline'>Perfil</Link>
                    <Link to='' onClick={logout} className='hover:underline'>Sair</Link>
                </div>
            </div>
        </div>
        )
    } else {
        navbarComponent = (
            <div className='w-full bg-cyan-950 text-white flex justify-center py-4'>
                <div className="container flex justify-between text-lg">
                    <Link to='' className='text-2xl font-bold uppercase'>Blog Pessoal</Link>

                    <div className='flex gap-4'>
                        <Link to='/cadastro'>Cadastre-se</Link>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            {navbarComponent}
        </>
    );
}

export default NavBar;