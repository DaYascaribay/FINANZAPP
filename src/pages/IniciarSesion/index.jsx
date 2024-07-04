import React, { useState } from 'react';
import axios from 'axios';
import { Helmet } from "react-helmet";
import { Img, Heading, Text, Button, Input } from "../../components";
import { useNavigate } from 'react-router-dom';

export default function IniciarsesionPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/IniciarSesion', { email, password });
            // Redireccionar a la página "/ObservarGastos"
            navigate('/ObservarGastos');
            setMessage('Credenciales correctas');
        } catch (error) {
            setMessage('Error al iniciar sesión. Inténtalo de nuevo.');
        }
    };

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
                                    <a href="/PaginaPrincipal">
                                        <Heading size="heading2x1" as="h1" className="! font-cabin !text-gray-700">
                                            FINANZAPP
                                        </Heading>
                                    </a>
                            </div>
                            <div className="mb-1.5 flex w-[76%] flex-col items-center gap-8 md:w-full">
                                <form onSubmit={handleLogin}>
                                    <Input
                                        size="md"
                                        type="email"
                                        name="email"
                                        placeholder={`Email`}
                                        prefix={<img src="images/img_lock.svg" alt="lock" className="h-[20px] w-[20px]" />}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="mr-2 gap-2 self-stretch rounded-lg md:mr-0 sm:pr-5 border-2 border-gray-300 focus:border-blue-500"
                                    />
                                    <br></br>
                                    <Input
                                        size="md"
                                        type="password"
                                        name="lock_key"
                                        placeholder={`Contraseña`}
                                        prefix={<img src="images/img_lock_key.svg" alt="lock key" className="h-[20px] w-[20px]" />}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="mr-2 gap-2 self-stretch rounded-lg md:mr-0 sm:pr-5 border-2 border-gray-300 focus:border-blue-500"
                                    />
                                    <br></br>
                                    <Button size="md" shape="round" className="ml-1.8 w-full md:ml-0 bg-green-400 sm:px-5 px-8 py-2 text-lg" type="submit">
                                        Iniciar Sesión
                                    </Button>
                                </form>
                                {message && <p>{message}</p>}
                                <a href="/OlvidasteContrasena">
                                    <Heading as="h2" className="ml-1.5 self-start text-green-400 underline md:ml-0">
                                        Olvidó su contraseña y/o usuario
                                    </Heading>
                                </a>
                                <div className="ml-[38px] mr-6 flex flex-wrap justify-center gap-1.5 self-stretch md:mx-8">
                                    <Text as="p">¿Todavía no tienes una cuenta?</Text>
                                    <a href="/CrearCuenta">
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
