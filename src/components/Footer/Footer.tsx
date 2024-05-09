import { LinkedinLogo } from "@phosphor-icons/react";
import { GithubLogo } from "@phosphor-icons/react/dist/ssr";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function Footer() {

    const { usuario } = useContext(AuthContext);

    let footerComponent; 

    let data = new Date().getFullYear();

    if(usuario.token !== '') {
        footerComponent = (
        <>
            <div className="flex justify-center bg-cyan-950 text-white absolute bottom-0 w-full">
                <div className="container flex flex-col items-center py-4">
                    <p className="text-xl font-bold">Blog Pessoal Thaís | Copyright: {data} </p>
                    <p className="text-lg">Redes sociais</p>
                    <div className="flex gap-2">
                        <LinkedinLogo size={48} weight="bold" />
                        <GithubLogo size={48} weight="bold" />
                    </div>
                </div>
            </div>
        </>
        )
    }

    return (
        <>
           {footerComponent} 
        </>
    )
}

export default Footer;