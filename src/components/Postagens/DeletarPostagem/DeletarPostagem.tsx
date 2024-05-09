import { RotatingLines } from "react-loader-spinner"
import { buscar, deletar } from "../../../sevices/Service"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../../context/AuthContext"
import { useNavigate, useParams } from "react-router-dom"
import Postagem from "../../../models/Postagem"

function DeletarPostagem() {

    // Variavel de Estado de Carregamento
    const [isLoading, setIsLoading] = useState<boolean>(false)

    // Variavel de Estado de Postagem - Registra um Objeto da Model Postagem. Usada para armazena os dados que foram digitados nos inputs do formulario
    const [postagem, setPostagem] = useState<Postagem>({} as Postagem)  

    
    const navigate = useNavigate()

    
    const { id } = useParams<{ id: string }>()  

    // Pega as informações que queremos do nosso Contexto através do hook useContexto
    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    // Buscar uma Postagem em Especifico
    async function buscarPorId(id: string) {
        try {
            await buscar(`/postagens/${id}`, setPostagem, { 
                headers: {
                    'Authorization': token                 
                }
            })
        } catch (error: any) {
            if (error.toString().includes('403')) {                 
                alert('O token expirou, favor logar novamente')    
                handleLogout()                                      
            }
        }
    }
    useEffect(() => {
        if (token === '') {
            alert('Você precisa estar logado')
            navigate('/login')
        }
    }, [token])

    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id)     
        }
    }, [id])

    function retornar() {
        navigate("/postagens")
    }

    // Função assincrona que vai deletar a Postagem
    async function deletarPostagem() {
        setIsLoading(true)

        try {
            await deletar(`/postagens/${id}`, { 
                headers: {
                    'Authorization': token      
                }
            })

            alert('Postagem apagada com sucesso')

        } catch (error) {
            alert('Erro ao apagar a Postagem')
        }

        setIsLoading(false)
        retornar()
    }
    return (
        <div className='container w-1/3 mx-auto'>
            <h1 className='text-4xl text-center my-4'>Deletar postagem</h1>

            <p className='text-center font-semibold mb-4'>Você tem certeza de que deseja apagar a postagem a seguir?</p>

            <div className='border flex flex-col rounded-2xl overflow-hidden justify-between'>
                <header className='py-2 px-6 bg-cyan-700 text-white font-bold text-2xl'>Postagem</header>
                <div className="p-4">
                    <p className='text-xl h-full'>{postagem.titulo}</p>
                    <p>{postagem.texto}</p>
                </div>
                <div className="flex">
                    <button className='text-slate-100 bg-red-400 hover:bg-red-600 w-full py-2' onClick={retornar}>Não</button>
                    <button className='w-full text-slate-100 bg-indigo-400 hover:bg-indigo-600 flex items-center justify-center' onClick={deletarPostagem}>

                        {isLoading ?
                            <RotatingLines
                                strokeColor="white"
                                strokeWidth="5"
                                animationDuration="0.75"
                                width="24"
                                visible={true}
                            /> :
                            <span>Sim</span>
                        }

                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeletarPostagem