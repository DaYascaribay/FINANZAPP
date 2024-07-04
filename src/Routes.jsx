import React from "react"
import { useRoutes } from "react-router-dom"; import Home from "pages/Home";
import NotFound from "pages/NotFound";
import PaginaPrincipal from "pages/PaginaPrincipal"; 
import IniciarSesion from "pages/IniciarSesion"; 
import ObservarGastos from "pages/ObservarGastos"; 
import RegistrarGastos from "pages/RegistrarGastos"; 
import Recomendaciones from "pages/Recomendaciones"; 
import CrearCuenta from "pages/CrearCuenta";
import ResumenMensual from "pages/ResumenMensual";
import OlvidasteContrasena from "pages/OlvidasteContrasena";

const ProjectRoutes = () => { 
    let element = useRoutes([
        { path: "/", element: <PaginaPrincipal /> },
        { path: "*", element: <NotFound /> },
        {
            path: "paginaprincipal",
            element: <PaginaPrincipal />,
        },
        {
            path: "iniciarsesion",
            element: <IniciarSesion />,
        },
        {
            path: "observargastos",
            element: <ObservarGastos />,
        },
        {
            path: "registrargastos",
            element: <RegistrarGastos />,
        },
        {
            path: "recomendaciones",
            element: <Recomendaciones />,
        },
        {
            path: "crearcuenta",
            element: <CrearCuenta />,
        },
        {
            path: "resumenmensual",
            element: <ResumenMensual />,
        },
        {
            path: "olvidastecontrasena",
            element: <OlvidasteContrasena />,
        },
    ]);

    return element;
};
export default ProjectRoutes;