import { Helmet } from "react-helmet";
import { Button, Text, Input, Heading, Img } from "../../components"; 
import React from "react";

export default function OlvidasteContrasenaPage() {
    return (
        <>
            <Helmet>
                <title>Finanzapp</title>
                <meta name="description" content="web site created using create-react-app" /> 
            </Helmet>
                <div className="relative h-[900px] w-full bg-green-400 shadow-xs">
                <Img
                    src="images/img_image_fondo_900x818.png"
                    alt="imagefondo"
                    className="absolute bottom-e right-[1.00px] top-e my-auto h-[900px] w-[56%] object-cover"
                />
                <div className="absolute bottom-0 left-0 right- top-e m-auto flex h-max w-full max-w-[904px] justify-center rounded-md bg-white-a700 p-3.5 shadow-lg md:p-5"> 
                    <div className="mb-1 flex w-full flex-col items-start">
                        <Heading size="heading3x1" as="h1" className="ml-1.5 !font-poppins md:ml-0"> 
                            Ingresa tu correo
                        </Heading>
                        <Input
                            size="lg"
                            shape="round"
                            type="email"
                            name="email"
                            placeholder={`ejemplo@gmail.com`}
                            className="mt-1 self-stretch sm:pr-5"
                        />
                        <Text size="textmd" as="p" className="relative z-[2] ml-1.5 mt-[18px] md:ml-e"> 
                            Enviaremos tu contraseña al correo registrado
                        </Text>
                        <div className="flex justify-end self-stretch">
                            <a href="https://www.youtube.com/embed/bvFxk@sz71" target="_blank">
                                <div className="relative z-[1] flex rounded p-2">
                                    <Text as="p" className="text-gray-500">
                                        Cancelar
                                    </Text>
                                </div>
                            </a>
                            <Button size="sm" className="min-w-[64px] rounded">
                                Enviar
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
