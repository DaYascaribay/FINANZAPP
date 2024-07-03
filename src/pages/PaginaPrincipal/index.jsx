import { Helmet } from "react-helmet";
import { Heading, Text, Img, Button } from "../../components";
import Footer from "../../components/Footer";
import PaginaPrincipalContainer from "../../components/PaginaPrincipalContainer"; 
import PaginaPrincipalContainerluis from "../../components/PaginaPrincipalContainerluis"; 
import PaginaPrincipalContainerplan from "../../components/PaginaPrincipalContainerplan"; 
import CrearCuenta from "../CrearCuenta/index"
import React, {Suspense } from "react";

const data = [
    {},
    {
        userimage: "images/img_clock.svg",
        mejorcontrolfin: "Detección de gastos innecesarios", 
        description:
            "La aplicación se encarga de analizar todos los gastos que se realicen, esta misma podrá detectar los gastos que son innecesarios para notificarle al usuario.",
    },
    {
        userimage: "images/img_icono_3.svg",
        mejorcontrolfin: "Mejorar la conciencia financia",
        description:
            "La aplicación se encarga de realizar recomendaciones a los usuarios para evitar gastos innecesarios, crear hábitos de ahorro.",
    },
    {
        userimage: "images/img_icono_4.svg",
        mejorcontrolfin: "Motivación al ahorro",
        description:
            "La aplicación motiva a los usuarios a ahorrar para cuidar su dinero y alcanzar metas financieras. Visualizar los gastos permitei dentificar pequeñas oportunidades de ahorro.",
    },
    {},
    {},
];
const data1 = [
    {},
    {
        userimage: "images/img_image_david.png",
        username: "David Yascaribay",
        userdescription: "Estudiante de Ingeniería en sistemas de la Información",
    },
    {
        userimage: "images/img_image_jefferson.png",
        username: "Jefferson Marcalla",
        userdescription: "Estudiante de Ingeniería en sistemas de la Información",
    },
];

export default function PaginaPrincipalPage() {
    return (
        <>
            <Helmet>
                <title>Finanzapp</title>
                <meta name="description" content="web site created using create-react-app" /> 
            </Helmet>
            <div className="w-full bg-white-a700 shadow-xs">
                <header className="flex items-start justify-center bg-green-400 px-10 shadow-sm sm:px-5">
                    <div className="mb-3 flex w-[92%] flex-col items-start gap-2 md:w-full">
                        <div className="ml-[248px] h-[4px] w-[10%] rounded-t1-[1px] rounded-tr-[1px] bg-white-a700 md:ml-0" /> 
                            <div className="flex items-center justify-between gap-5 self-stretch md:flex-col">
                                <div className="flex items-center gap-2.5">
                                    <a href="#">
                                        <img src="images/img_image_1.svg" alt="imageone" className="h-[46px] w-[46px]" />
                                    </a>
                                    <img src="images/img_header_logo.png" alt="headerlogo" className="h-[30px] w-[126px] object-contain" /> 
                                </div>
                                <ul className="flex flex-wrap gap-20 md:gap-5">
                                    <li>
                                        <a href="#">
                                            <Heading as="p" className="! font-cabin !text-white-a700">
                                                Inicio
                                            </Heading>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="cursor-pointer">
                                            <Heading as="p" className="! font-cabin !text-black-900 hover:!text-white-a700">
                                                Características
                                            </Heading>
                                        </a> 
                                    </li>
                                    <li>
                                        <a href="#" className="cursor-pointer">
                                            <Heading as="p" className="! font-cabin !text-black-900 hover:!text-white-a700"> 
                                                Premium
                                            </Heading>
                                        </a> 
                                    </li> 
                                    <li>
                                        <a href="#" className="cursor-pointer">
                                            <Heading as="p" className="! font-cabin !text-black-900 hover:!text-white-a700"> 
                                                Nuesto Equipo
                                            </Heading>
                                        </a> 
                                    </li> 
                                    <li>
                                        <a href="#" className="cursor-pointer">
                                            <Heading as="p" className="! font-cabin !text-black-900 hover:!text-white-a700">
                                                Acerca de
                                            </Heading>
                                        </a> 
                                    </li>
                                </ul>
                                <div className="flex gap-6">
                                    <a href="/CrearCuenta"> 
                                        <Button size="sm" className="min-w-[182px] rounded font-cabin"> 
                                            Crear cuenta{" "} 
                                        </Button>
                                    </a>
                                    <a href="https://www.youtube.com/embed/bvFxkesz71" target="_blank"> 
                                        <Button size="sm" className="min-w-[98px] rounded font-cabin"> 
                                            Iniciar sesión
                                        </Button>
                                    </a>
                                </div> 
                            </div>
                        </div>
                    </header>
                    <div className="mt-[76px] flex flex-col items-center gap-[108px] md:gap-[81px] sm:gap-[54px]"> 
                        <div className="container-xs px-14 md:p-5 md:px-5">
                            <div className="flex flex-col gap-[108px] md:gap-[81px] sm:gap-[54px]">
                                <div className="mr-1.5 flex items-center justify-between gap-5 md:mr-0 md:flex-col"> 
                                    <Img
                                        src="images/img_image_inicio.png"
                                        alt="imageinicio"
                                        className="h-[394px] w-[42%] rounded-[196px] object-cover md:w-full"
                                    />
                                    <div className="flex w-[50%] flex-col gap-3 md:w-full">
                                        <Heading size="heading5x1" as="h1" className="! font-cabin leading-[78px] !text-green-400"> 
                                            Cuida la economía de tu bolsillo
                                        </Heading>
                                        <Text size="textmd" as="p" className="! font-cabin leading-[26px]">
                                            Gestione sus gastos de la manera más eficiente, una solución perfecta para asegurar su economía. 
                                        </Text>
                                    </div>
                                </div>
                                <div>
                                <div className="flex flex-col items-center gap-14 sm:gap-7">
                                    <Heading size="heading4x1" as="h2" className="! font-cabin !text-blue_gray-980_02">
                                        FINANZAPP
                                    </Heading>
                                    <div className="grid grid-cols-3 justify-center gap-7 gap-y-6 self-stretch md:grid-cols-2 sm:grid-cols-1"> 
                                        <Suspense fallback={<div>Loading feed...</div>}>
                                            {data.map((d, index) => (
                                            <PaginaPrincipalContainer {...d} key={"paginaprincipal" + index} />
                                            ))} 
                                        </Suspense>
                                    </div>
                                </div> 
                            </div> 
                        </div> 
                    </div>
                    <div className="self-stretch">
                        <div className="flex justify-center rounded bg-white-a700 py-[76px] md:py-5">
                            <div className="container-xs mt-2.5 flex justify-center px-14 md:p-5 md:px-5">
                                <div className="flex w-[60%] flex-col items-center gap-[76px] md:w-full md:gap-[57px] sm:gap-[38px]"> 
                                    <Heading size="heading4x1" as="h2" className="! font-cabin">
                                        Hazte Premium
                                    </Heading>
                                    <div className="flex gap-12 self-stretch md:flex-col">
                                        <Suspense fallback={<div>Loading feed...</div>}>
                                            {[...Array(2)].map((d, index) => (
                                                <PaginaPrincipalContainerplan 
                                                    key={"listplangratis" + index}
                                                    className="items-start border border-solid border-gray-300 bg-white-a700 md:w-full sm:p-5"
                                                />
                                            ))}
                                        </Suspense>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>  
                            <div className="flex justify-center rounded bg-white-a700 py-[50px] md:py-5">
                                <div className="container-xs mb-2 flex items-start justify-between gap-5 px-[62px] md:flex-col md:p-5 md:px-5"> 
                                    <Heading
                                        size="heading4x1"
                                        as="h3"
                                        className="ml-3 mt-[120px] w-[18%] !font-cabin leading-[68px] !text-blue_gray-980_01 md:ml-0 md:w-full md:p-5"
                                    >
                                        Nuestro equipo
                                    </Heading>
                                    <div className="ml-24 flex w-[82%] gap-6 self-center md:ml-0 md:w-full md:flex-col">
                                        <Suspense fallback={<div>Loading feed...</div>}>
                                            {data1.map((d, index) => (
                                                <PaginaPrincipalContainerluis {...d} key={"listluisloor" + index} />
                                            ))}
                                        </Suspense>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
}          