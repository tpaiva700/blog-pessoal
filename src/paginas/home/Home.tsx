import React from "react";
import homeLogo from '../../assets/home.png'
import './Home.css';
import ListaPostagem from "../../components/Postagens/ListaPostagem/ListaPostagem";
import ModalPostagem from "../../components/Postagens/ModalPostagem/ModalPostagem";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <>
            <div className="bg-cyan-950 flex justify-center">
                <div className="container grid grid-cols-2 text-white">
                    <div className="flex flex-col gap-4 items-center justify-center py-4">
                        <h2 className="text-5x1 font-bold italic">Olá!</h2>
                        <p className="text-x1">Expresse aqui seus pensamentos e opniões!</p>

                        <div className="flex justify-around gap-4">
                            <ModalPostagem />
                            <button className="rounded bg-white text-blue-600 py-2 px-4">
                                <Link to="/postagens">Ver Postagens</Link>
                            </button>
                        </div>

                    </div>
                    
                    <div className="flex-grow justify-center">
                        <img src={homeLogo} alt="" className="w-2/3" />
                    </div>
                </div>
            </div>
            <ListaPostagem />
        </>
    )
}

export default Home;