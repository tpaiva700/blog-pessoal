import { useContext, useEffect, useState } from "react";
import Postagem from "../../../models/Postagem";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { buscar } from "../../../sevices/Service";
import { Dna } from "react-loader-spinner";
import CardPostagem from "../CardPostagem/CardPostagem";
import { toastAlerta } from "../../../utils/toastAlerta";

function ListaPostagem(){
    //Criamos uma Var de Estado - Registra um Array que possuí os objetos da model Postagem
    //Armazena os dados que foram trazidos pela Service
    const[postagens, setPostagens] = useState<Postagem[]>([]);

    //Recebe o Hook useNavigate, para direcionar o User
    const navigate = useNavigate();

    const {usuario, handleLogout} = useContext(AuthContext);
    const token = usuario.token;

    //Verifica se o User tá logado
    useEffect(() => {
        if (token === ''){
            toastAlerta('Você precisa estar logado', 'info');
            navigate('/');
        }
    }, [token]);

    //Função para buscar as postagens 
    async function buscarPostagem() {
        try{
            await buscar('/postagens', setPostagens, {
                headers: {
                    Authorization: token,
                },
            })
        } catch (error: any){
            if(error.toString().includes('403')){
                toastAlerta('O token expirou, favor logar novamente', 'info');
                handleLogout();
            }
        }
    }

    //Função para carregar as postagens em Tela
    useEffect(() => {
        buscarPostagem()
    }, [postagens.length])

    return(
        <>
            {postagens.length === 0 && (
                <Dna
                    visible={true}
                    height="200"
                    width="200"
                    ariaLabel="dna-loading"
                    wrapperStyle={{}}
                    wrapperClass="dna-wrapper mx-auto"
                />
            )}

            <div className='container mx-auto my-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {postagens.map((postagem) => (
                    <CardPostagem key={postagem.id} post={postagem} />
                ))}
            </div>
        </>
    );

}

export default ListaPostagem;