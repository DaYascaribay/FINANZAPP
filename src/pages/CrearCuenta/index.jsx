import { Helmet } from "react-helmet";
import { Img, Heading, Text, Button, CheckBox, Input } from "../../components"; 
import React from "react";

export default function CrearCuentaPage() {
    return (
        <>
            <Helmet>
                <title>Finanzapp</title>
                <meta name="description" content="Web site created using create-react-app" /> 
            </Helmet>
            <div className="w-full bg-green-400 shadow-xs">
                <div className="flex items-center justify-center md:flex-col">
                    <div className="relative z-[1] flex w-[42%] flex-col items-center gap-10 rounded bg-white-a700 p-2.5 shadow-sm md:w-full md:p-5"> 
                        <div className="mt-4 flex items-center gap-2.5">
                            <Img src="images/img_image_1.svg" alt="imagelogo" className="h-[64px] w-[64px]" />
                                <a href="/PaginaPrincipal">
                                    <Heading size="heading2x1" as="h1" className="! font-cabin !text-gray-700">
                                        FINANZAPP
                                    </Heading>
                                </a>
                        </div>
                        <div className="flex w-[94%] flex-col items-center md:w-full">
                            <div className="flex gap-5 self-stretch sm:flex-col">
                                <div className="flex w-[40%] flex-col items-start justify-center gap-0.5 sm:w-full"> 
                                    <Heading as="h1" className="! text-blue_gray-800">
                                        Nombre
                                    </Heading>
                                    <Input shape="round" name="david" placeholder={`David`} className="mr-2 gap-2 self-stretch rounded-lg md:mr-0 sm:pr-5 border-2 border-gray-300 focus:border-blue-500" /> 
                                </div>
                                <div className="flex flex-1 flex-col items-start justify-center gap-0.5 sm:self-stretch">
                                    <Heading as="h2" className="! text-blue_gray-800">
                                        Apellido 
                                    </Heading>
                                    <Input shape="round" name="yascaribay" placeholder={`Yascaribay`} className="mr-2 gap-2 self-stretch rounded-lg md:mr-0 sm:pr-5 border-2 border-gray-300 focus:border-blue-500" /> 
                                </div>
                            </div>
                            <div className="mt-[30px] flex flex-col items-start justify-center gap-0.5 self-stretch">
                                <Heading as="h3" className="text-blue_gray-800">
                                    Email
                                </Heading>
                                <Input
                                    shape="round"
                                    type="email"
                                    name="email"
                                    placeholder={`ejemplo@gmail.com`}
                                    className="mr-2 gap-2 self-stretch rounded-lg md:mr-0 sm:pr-5 border-2 border-gray-300 focus:border-blue-500"
                                />
                            </div>
                            <div className="mt-[18px] flex flex-col items-start justify-center gap-0.5 self-stretch"> 
                                <Heading as="h4" className="!text-blue_gray-800">
                                    Contraseña
                                </Heading>
                                <Input
                                    shape="round" 
                                    type="password"
                                    name="hide"
                                    placeholder={`Ingresa 8+ caracteres `}
                                    suffix={<Img src="images/img_hide.svg" alt="hide" className="h-[16px] w-[16px]" />} 
                                    className="mr-2 gap-2 self-stretch rounded-lg md:mr-0 sm:pr-5 border-2 border-gray-300 focus:border-blue-500"
                                />
                            </div>
                            <div className="mt-2.5 flex flex-col items-start justify-center gap-0.5 self-stretch"> 
                                <Heading as="h5" className="!text-blue_gray-800">
                                    Confirmar Contraseña
                                </Heading>
                                <Input
                                    size="sm"
                                    shape="round"
                                    name="hide_one"
                                    suffix={<Img src="images/img_hide.svg" alt="hide" className="h-[16px] w-[16px]" />} 
                                    className="mr-2 gap-2 self-stretch rounded-lg md:mr-0 sm:pr-5 border-2 border-gray-300 focus:border-blue-500"
                                />
                            </div>
                            <CheckBox
                                name="aceptotérminosd"
                                label="Acepto Términos de uso & Políticas de Privacidad" 
                                id="aceptotrminosd"
                                className="mt-5 self-start font-cabin text-sm text-gray-900_01"
                            />
                            <br></br>
                            <Button size="md" className="ml-1.8 w-full md:ml-0 bg-green-400 sm:px-5 px-8 py-2 text-lg">
                                Crear Cuenta
                            </Button>
                            <br></br>
                            <div className="mt-3 flex flex-wrap gap-1">
                                <Text as="p">¿Ya tienes una cuenta?</Text>
                                <a href="/IniciarSesion">
                                    <Heading as="h6" className="! text-green-400 underline">
                                        Inicia sesión
                                    </Heading>
                                </a> 
                            </div>
                        </div> 
                    </div>
                    <Img src="images/img_image_fondo.png" alt="imagefondo" className="h-[900px] w-[52%] object-cover md:w-full" /> 
                </div>
            </div>
        </>
    );
}