import { LinkedinLogo } from "@phosphor-icons/react";
import { GithubLogo } from "@phosphor-icons/react/dist/ssr";
import React from "react";

function Footer() {

    return (
        <>
            <div className="flex justify-center bg-cyan-950 text-white">
                <div className="container flex flex-col items-center py-4">
                    <p className="text-xl font-bold">Blog Pessoal Thaís | Copyright: </p>
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

export default Footer;