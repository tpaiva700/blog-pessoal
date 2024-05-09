import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import Tema from "../../../models/Tema";
import Postagem from "../../../models/Postagem";
import { atualizar, buscar, cadastrar } from "../../../sevices/Service";
import { RotatingLines } from "react-loader-spinner";

function FormularioPostagem() {
    
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const navigate = useNavigate();

    //Pegando os parametros que vem na url 
    const { id } = useParams<{id: string}>();

    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

    //Armazena todos os temas que estão no Back
    const [temas, setTemas] = useState<Tema[]>([]);

    //Armazena o tema escolhido dentro do select
    const [tema, setTema] = useState<Tema>({
        id: 0,
        descricao: '',
    })

    //Armazenar os dados que foram digitados no formulário 
    const [postagem, setPostagem] = useState<Postagem>({
        id: 0,
        titulo: '',
        texto: '',
        data: '',
        tema: null,
        usuario: null, 
    });

    //Buscar postagem especifica 
    async function buscarPostagemPorId( id: string) {
        await buscar(`/temas/${id}`, setTema, {
            headers: {
                Authorization: token,
            },
        });
    }
    
    //Buscar Tema especifico 
    async function buscarTemaPorId(id: string) {
        await buscar(`/temas/${id}`, setTema, {
            headers: {
                Authorization: token,
            },
        });
    }

    //Buscar todos os Temas
    async function buscarTemas() {
        await buscar('/temas', setTemas, {
            headers: {
                Authorization: token,
            },
        });
    }

    //Validação do Token
    useEffect(() => {
        if (token === '') {
            alert('Você precisa estar logado');
            navigate('/');
        }
    }, [token]);

    //Verifica se o ID é diferente de indefined, para atualizar a Postagem
    useEffect(() => {

        buscarTemas()

            if (id !== undefined) {
                buscarPostagemPorId(id)
            }

    }, [id])

    //Atualiza a postagem com o tema escolhido pelo usuário
    useEffect(() => {
        setPostagem({
            ...postagem,
            tema: tema,
        })
    }, [tema])

    //Captura o que foi digitado, através da mudança de um input
    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setPostagem({                           // Atualiza o objeto/estado Postagem com os dados digitados no input
            ...postagem,                        // O spread operator (...) espalha os atributos do objeto para facilitar a atualização
            [e.target.name]: e.target.value,    // O lado esquerdo, representa qual input chamou essa função e qual atributo do Objeto Postagem que será acessado, a parte direita pega o valor digitado
            tema: tema,                         
            usuario: usuario,                   
        });
    }

    function retornar() {
        navigate('/postagens');
    }

    //Função assincrona : cadastrar ou editar uma postagem 
    async function gerarNovaPostagem(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()  // Através do parametro E que representa um os eventos do Formulario, impedimos que o Form recarregue a página ao tentar enviar os dados
        setIsLoading(true)  // Muda o estado para verdadeiro, indicando que existe uma requisição sendo processada no back

        if (id != undefined) {  // Se o ID é diferente de undefined, quer dizer que estamos fazendo uma atualização
            try {

                await atualizar(`/postagens`, postagem, setPostagem, {
                    headers: {
                        Authorization: token,
                    },
                })

                alert('Postagem atualizada com sucesso');
                retornar()

            } catch (error: any) {

                if (error.toString().includes('403')) {
                    alert('O token expirou, favor logar novamente')
                    handleLogout()

                } else {

                    alert('Erro ao atualizar a Postagem');
                }
            }
        } else {    // Essa parte referesse ao Cadastro de uma Postagem

            try {

                await cadastrar(`/postagens`, postagem, setPostagem, {
                    headers: {
                        Authorization: token,
                    },
                });

                alert('Postagem cadastrada com sucesso');
                retornar();

            } catch (error: any) {

                if (error.toString().includes('403')) {
                    alert('O token expirou, favor logar novamente')
                    handleLogout()

                } else {

                    alert('Erro ao cadastrar a Postagem');
                }

            }
        }

        setIsLoading(false) // Muda o estado para falso, indicando a requisição já terminou de ser processada
    }

    const carregandoTema = tema.descricao === '';   // Essa constante indica se um tema foi ou não escolhido


    return (
        <div className="container flex flex-col mx-auto items-center">
            <h1 className="text-4xl text-center my-8">{id !== undefined ? 'Editar Postagem' : 'Cadastrar Postagem'}</h1>

            <form onSubmit={gerarNovaPostagem} className="flex flex-col w-1/2 gap-4">
                <div className="flex flex-col gap-2">
                    <label htmlFor="titulo">Titulo da postagem</label>
                    <input
                        value={postagem.titulo}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        type="text"
                        placeholder="Titulo"
                        name="titulo"
                        required
                        className="border-2 border-slate-700 rounded p-2"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="titulo">Texto da postagem</label>
                    <input
                        value={postagem.texto}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        type="text"
                        placeholder="Texto"
                        name="texto"
                        required
                        className="border-2 border-slate-700 rounded p-2"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <p>Tema da postagem</p>

                    {/* Ao clicarmos em um tema, a função buscarTemaPorId() é chamada com o ID do Tema escolhido, para que seus dados sejam buscados e depois vinculados a postagem */}
                    <select name="tema" id="tema" className='border p-2 border-slate-800 rounded' onChange={(e) => buscarTemaPorId(e.currentTarget.value)}>
                        <option value="" selected disabled>Selecione um tema</option>

                        {/* Dentro do Select, percorremos o ARRAY de Temas, carregados com os Temas do Back End, usando o MAP e para cada um criamos uma tag OPTION para exibí-los */}
                        {temas.map((tema) => (
                            <>
                                <option value={tema.id} >{tema.descricao}</option>
                            </>
                        ))}

                    </select>

                </div>

                <button
                    disabled={carregandoTema}   // Se nenhum tema for escolhido, desabilite o botão
                    type='submit' className='rounded disabled:bg-slate-200 bg-indigo-400 hover:bg-indigo-800 text-white font-bold w-1/2 mx-auto py-2 flex justify-center'>

                    {/* Se carregandoTema for true e isLoding também, isso indica que há um processo sendo feito, então mostre o componente de Carregamento */}
                    {carregandoTema || isLoading ?

                        <RotatingLines
                            strokeColor="white"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="24"
                            visible={true}
                        />

                        // Senão, verifique se existe um ID, se houver coloque o texto Editar, se não coloque o texto Cadastrar 
                        : id !== undefined ? 'Editar' : 'Cadastrar'}

                </button>
            </form>
        </div>
    );

}

export default FormularioPostagem;