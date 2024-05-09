import { Link } from "react-router-dom";
import Postagem from "../../../models/Postagem";

interface CardPostagemProps{
    post: Postagem; 
}

function CardPostagem({post}: CardPostagemProps){

    //Vai receber nossa data do BD 
    let dataDoBanco = new Date(post.data);

    //Removendo 3 horas da data, devido ao horário do Banco
    dataDoBanco.setHours(dataDoBanco.getHours() - 3);

    //Formatando 
    let dataLocal = new Intl.DateTimeFormat(undefined, {
        dateStyle: 'full',
        timeStyle: 'medium',
    }).format(dataDoBanco);

    return (
        //Nosso HTML 
        <div className="border-slate-900 border flex flex-col rounded overflow-hidden justify-between">
            <div>
                <div className="flex w-full bg-cyan-500 py-2 px-4 items-center gap-4">
                    <img src={post.usuario?.foto} className='h-12 rounded-full' alt="usuário"/>
                    <h3 className='text-lg font-bold text-center uppercase '>{post.usuario?.nome}</h3>
                </div>
                <div className='p-4'>
                    <h4 className='text-lg font-semibold uppercase'>{post.titulo}</h4>
                    <p>{post.texto}</p>
                    <p>Tema: {post.tema?.descricao} </p>
                    <p>Data: {dataLocal}</p>
                </div>
            </div>
            <div className="flex">
                <Link to={`/editarPostagem/${post.id}`} className='w-full text-white bg-cyan-400 hover:bg-cyan-800 flex items-center justify-center py-2'>
                    <button>Editar</button>
                </Link>

                <Link to={`/deletarPostagem/${post.id}`} className='text-white bg-red-400 hover:bg-red-700 w-full flex items-center justify-center'>
                    <button>Deletar</button>
                </Link>
            </div>
        </div>
    );
}

export default CardPostagem;
