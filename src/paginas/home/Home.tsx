import React from "react";
import './Home.css';

const Home = () => {
    return (
        <>
            <div className="bg-cyan-950 flex justify-center">
                <div className="container grid grid-cols-2 text-white">
                    <div className="flex flex-col gap-4 items-center justify-center py-4">
                        <h2 className="text-5x1 font-bold italic">Olá!</h2>
                        <p className="text-x1">Expresse aqui seus pensamentos e opniões!</p>

                        <div className="flex justify-around gap-4">
                            <button className="rounded bg-white text-blue-600 py-2 px-4">Ver Postagens</button>
                        </div>

                    </div>
                    <div className="flex justify-center">
                        <img src=""></img>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;