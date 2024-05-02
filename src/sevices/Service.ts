import axios from "axios";

//Criando a conexão do Front com o Back

const api = axios.create({
    baseURL: "https://blogpessoal-i5fs.onrender.com"
});

//Funções 
export const login = async (url : string, dados : Object, setDados : Function) => {
    const resposta = await api.post(url, dados);
    setDados(resposta.data);
}

export const cadastrarUsuario = async(url: string, dados: Object, setDados: Function) => {
    const resposta = await api.post(url, dados)
    setDados(resposta.data)
  }