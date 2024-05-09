

import 'reactjs-popup/dist/index.css';
import Popup from 'reactjs-popup';

import './ModalPostagem.css'
import FormularioPostagem from '../FormularioPostagem/FormularioPostagem';

function ModalPostagem() {
    return (
        <>
            <Popup  // É a Janela que se abre ao clicarmos no Botão para exibir o Formulário
                trigger={   // É um gatilho (botão) que sempre pressionado abre o Modal/PopUp/Janela
                    // É o botão que é clicado e abre o Modal
                    <button className='border rounded px-4 hover:bg-white hover:text-cyan-950'>
                        Nova postagem
                    </button>
                } modal>
                <div>
                    {/* Conteúdo do Modal, no caso o Formulario de Postagem */}
                    <FormularioPostagem />
                </div>
            </Popup>
        </>
    );
}

export default ModalPostagem;