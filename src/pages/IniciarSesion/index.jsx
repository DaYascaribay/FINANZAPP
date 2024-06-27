import { Helmet } from "react-helmet";
import { Img, Heading, Text, Button, Input } from "../../components"; 
import React from "react";

export default function IniciarsesionPage() {
    return (
        <>
            <Helmet>
                <title>Finanzapp</title>
                <meta name="description" content="web site created using create-react-app" /> 
            </Helmet>
            <div className="w-full bg-green-400 shadow-xs">
                <div>
                    <div className="flex items-center justify-center md:flex-col">
                        <div className="relative z-[1] flex w-[40%] flex-col items-center justify-center gap-[50px] rounded-lg bg-white-a700 px-14 py-[60px] shadow-sm md:w-full md:p-5"> 
                            <div className="flex items-center gap-2.5">
                                <img src="images/img_image_1.svg" alt="imagelogo" className="h-[64px] w-[64px]" /> 
                                <Heading size="heading2x1" as="h1" className="! font-cabin !text-gray-700"> 
                                    FINANZAPP
                                </Heading>
                            </div>
                            <div className="mb-1.5 flex w-[76%] flex-col items-center gap-8 md:w-full">
                                <Input
                                    size="md" 
                                    type="email"
                                    name="email"
                                    placeholder={`Email`}
                                    prefix={<img src="images/img_lock.svg" alt="lock" className="h-[20px] w-[20px]" />}
                                    className="mr-2 gap-2 self-stretch rounded-1g md:mr-e sm:pr-5"
                                />
                                <Input
                                    size="md"
                                    type="password"
                                    name="lock_key"
                                    placeholder={`Contraseña`}
                                    prefix={<img src="images/img_lock_key.svg" alt="lock key" className="h-[20px] w-[20px]" />} 
                                    className="mr-2 gap-2 self-stretch rounded-lg md:mr-e sm:pr-5"
                                />
                                <a href="https://www.youtube.com/embed/bvFxkesz71" target="_blank">
                                    <Heading as="h2" className="ml-1.5 self-start !text-green-400 underline md:ml-0"> 
                                        Olvidó su contraseña y/o usuario
                                    </Heading>
                                </a>
                                <a href="https://www.youtube.com/embed/bvFxkesz71" target="_blank">
                                    <Button size="md" shape="round" className="ml-1.5 w-full md:ml-0 sm: px-5"> 
                                        Iniciar Sesión
                                    </Button>
                                </a>
                                <div className="ml-[38px] mr-6 flex flex-wrap justify-center gap-1.5 self-stretch md:mx-8"> 
                                    <Text as="p">¿Todavía no tienes una cuenta?</Text>
                                    <a href="https://www.youtube.com/embed/bvFxkesz71" target="_blank">
                                        <Heading as="h3" className="text-green-400 underline">
                                            Crea una ahora
                                        </Heading>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <Img
                            src="images/img_image_fondo.png"
                            alt="imagefondo"
                            className="h-[900px] w-[54%] object-cover md:w-full"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}