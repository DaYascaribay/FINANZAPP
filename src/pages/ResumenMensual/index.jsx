import { Helmet } from "react-helmet";
import { Heading, Text, Button } from "../../components"; 
import Header from "../../components/Header";
import { ReactTable } from "../../components/ReactTable"; 
import { createColumnHelper } from "@tanstack/react-table"; 
import React from "react";
import { CircularProgressbar } from "react-circular-progressbar"; 
import "react-circular-progressbar/dist/styles.css";

const table1Data = [
    {
        registro: "1",
        nombre: "Bus",
        valor: "$0.35", 
        fecha: "2/6/2024",
        tipode: "Gasto",
        tipodegasto: "Transporte público"
    },
    { registro: "2", nombre: "Cuaderno", valor: "$7.50", fecha: "2/6/2024", tipode: "Gasto", tipodegasto: "Estudio" },
    {
        registro: "3",
        nombre: "Bus",
        valor: "$0.35",
        fecha: "2/6/2024",
        tipode: "Gasto",
        tipodegasto: "Transporte público ",
    },
    {
        registro: "4",
        nombre: "Bus",
        valor: "$0.35",
        fecha: "5/6/2024",
        tipode: "Gasto",
        tipodegasto: "Transporte público",
    },
    {
        registro: "5", 
        nombre: "Bus", 
        valor: "$0.35",
        fecha: "5/6/2024",
        tipode: "Gasto",
        tipodegasto: "Transporte público",
    },
    {
        registro: "6",
        nombre: "Peluche crochet",
        valor: "$15.00",
        fecha: "10/6/2024",
        tipode: "Ingreso",
        tipodegasto: "N/A",
    },
    { registro: "7", nombre: "Salchipapa", valor: "$2.50", fecha: "11/6/2024", tipode: "Gasto", tipodegasto: "Comida" },
    {
        registro: "8",
        nombre: "Bus",
        valor: "$0.35",
        fecha: "12/6/2024",
        tipode: "Gasto",
        tipodegasto: "Transporte público",
    },
    {
        registro: "9",
        nombre: "Bus",
        valor: "$0.35",
        fecha: "12/6/2024",
        tipode: "Gasto",
        tipodegasto: "Transporte público",
    },
    {
        registro: "10",
        nombre: "Peluche crochet",
        valor: "$10.00",
        fecha: "15/6/2024",
        tipode: "Ingreso",
        tipodegasto: "N/A",
    },
];

export default function ResumenMensualPage() { 
    const table1Columns = React.useMemo(() => {
        const table1ColumnHelper = createColumnHelper(); 
        return[
            table1ColumnHelper.accessor("registro", {
                cell: (info) => (
                    <Text as="p" className="border-[0.5px] border-solid border-gray-300">
                        {info?.getValue?.()}
                    </Text>
                ),
                header: (info) => (
                    <Button
                    size="2x1"
                    shape="square"
                    className="min-w-[94px] border-[0.5px] border-solid border-gray-300 font-cabin font-semibold"
                    >
                        # Registro
                    </Button>
                ),
                meta: { width: "94px" },
            }),
            table1ColumnHelper.accessor("nombre", {
                cell: (info) => (
                    <Text as="p" className="border-[0.5px] border-solid border-gray-300">
                        {info?.getvalue?.()}
                    </Text>
                ),
                header: (info) => (
                    <Heading
                    as="h6"
                    className="border-[0.5px] border-solid border-gray-300 bg-gray-50 !font-cabin !font-semibold !text-gray-700"
                    >
                        Nombre
                    </Heading>
                ),
                meta: { width: "194px" },
            }),
            table1ColumnHelper.accessor("valor", {
                cell: (info) => (
                    <Text as="p" className="border-[0.5px] border-solid border-gray-300">
                        {info?.getvalue?.()}
                    </Text>
                ),
                header: (info) => (
                    <Heading
                    as="p"
                    className="border-[0.5px] border-solid border-gray-300 bg-gray-50 !font-cabin !font-semibold text-gray-700"
                    >
                        Valor
                    </Heading>
                ),
                meta: { width: "92px" },
            }),
            table1ColumnHelper.accessor("fecha", {
                cell: (info) => (
                    <Text as="p" className="border-[0.5px] border-solid border-gray-300">
                        {info?.getvalue?.()}
                    </Text>
                ),
                header: (info) => (
                    <Heading
                    as="p"
                    className="border-[0.5px] border-solid border-gray-300 bg-gray-50 !font-cabin !font-semibold !text-gray-700"
                    >
                        Fecha
                    </Heading>
                ),
                meta: { width: "112px" },
            }),
            table1ColumnHelper.accessor("tipode", {
                cell: (info) => (
                    <Text as="p" className="border-[0.5px] border-solid border-gray-300">
                        {info?.getValue?.()}
                    </Text>
                ),
                header: (info) => (
                    <Button
                    size="2x1"
                    shape="square"
                    className="min-w-[126px] border-[0.5px] border-solid border-gray-300 font-cabin font-semibold"
                    >
                        Tipo de registro
                    </Button>
                ),
                meta: { width: "126px"},
            }),
            table1ColumnHelper.accessor("tipodegasto", {
                cell: (info) => (
                    <Button shape="square" className="min-w-[160px] border-[0.5px] border-solid border-gray-300">
                        {info?.getValue?.()}
                    </Button>
                ),
                header: (info) => (
                    <Heading
                    as="p"
                    className="border-[0.5px] border-solid border-gray-300 bg-gray-50 !font-cabin !font-semibold !text-gray-700"
                    >
                        Tipo de gasto
                    </Heading>
                ),
                meta: { width: "160px" },
            }),
        ];
    }, []);
    
    return (
        <>
            <Helmet>
                <title>Finanzapp</title>
                <meta name="description" content="web site created using create-react-app" /> 
            </Helmet>
            <div className="flex w-full flex-col items-center gap-9 bg-gray-50 shadow-xs"> 
                <Header className="self-stretch" />
                <div className="container-xs mb-1 md:p-5">
                    <div>
                        <div className="flex flex-col gap-8">
                            <div>
                                <div className="flex flex-col gap-[34px]">
                                    <div className="ml-1.5 flex items-center justify-between gap-5 md:m1-0"> 
                                        <Heading size="heading2x1" as="h1" className="! font-cabin uppercase"> 
                                            Dashboard
                                        </Heading>
                                        <a href="https://www.youtube.com/embed/bvFxk@sz71" target="_blank">
                                            <Button
                                            size="sm"
                                            variant="outline" 
                                            shape="round"
                                            color="undefined undefined"
                                            className="min-w-[82px]"
                                            >
                                                Regresar 
                                            </Button>
                                        </a> 
                                    </div>
                                    <div className="rounded-1g border border-solid border-gray-300 bg-white-a700 p-6 sm:p-5">
                                        <div className="flex items-center gap-8 md:flex-col">
                                            <div className="flex w-[48%] flex-col items-start gap-6 md:w-full">
                                                <Text size="textxl" as="p" className="! font-cabin !text-blue_gray-900_02">
                                                    Resumen general - Junio 2024
                                                </Text>
                                                <div className="flex gap-6 self-stretch sm:flex-col">
                                                    <div className="flex w-full flex-col items-start justify-center gap-[18px] rounded-lg bg-gray-100_02 px-6 pу-[26px] sm:w-full sm:p-5"> 
                                                        <Text size="textmd" as="p" className="!text-blue_gray-900_02">
                                                            Dinero restante
                                                        </Text>
                                                        <Heading size="heading2x1" as="h2" className="! font-cabin !text-green-400">
                                                            $420.75
                                                        </Heading>
                                                    </div>
                                                    <div className="flex w-full flex-col items-start justify-center gap-[18px] rounded-lg bg-yellow-50 px-6 py-[26px] sm:w-full sm:p-5"> 
                                                        <Text size="textmd" as="p" className="text-blue_gray-900_02">
                                                            Dinero utilizado
                                                        </Text>
                                                        <Heading size="heading2x1" as="h3" className="! font-cabin !text-blue_gray-900">
                                                            $350.20 
                                                        </Heading>
                                                    </div>
                                                </div> 
                                            </div>
                                            <div className="flex-1 md: self-stretch">
                                                <div className="flex items-center justify-center gap-[30px] md:flex-col">
                                                    <div className="h-full w-px bg-gray-300 md:h-px md:w-full" />
                                                        <div className="flex flex-1 flex-col items-start gap-[26px] md:self-stretch">
                                                            <Text size="textx1" as="p" className="! font-cabin !text-blue_gray-900_02">
                                                                Actividad
                                                            </Text>
                                                            <div className="flex gap-6 self-stretch sm: flex-col">
                                                                <div className="flex w-full flex-col items-start justify-center gap-[18px] rounded-lg bg-gray-100_03 px-6 pу-[26px] sm:w-full sm:p-5"> 
                                                                    <Text size="textmd" as="p" className="text-blue_gray-900_02"> 
                                                                        Gastos
                                                                    </Text>
                                                                    <Heading size="heading2x1" as="h4" className="! font-cabin !text-blue_gray-700">
                                                                        24
                                                                    </Heading>
                                                                </div>
                                                                <div className="flex w-full flex-col items-start gap-4 rounded-1g bg-gray-100_01 px-6 py-7 sm:w-full sm:p-5">
                                                                    <Text size="textmd" as="p" className="text-blue_gray-900_02">
                                                                        Ingresos
                                                                    </Text>
                                                                    <Heading size="heading2x1" as="h5" className="! font-cabin !text-gray-900">
                                                                        5
                                                                    </Heading>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="ml-1.5 flex items-start gap-4 md:ml-0 md:flex-col">
                                    <div className="flex-1 md: self-stretch">
                                        <div className="flex flex-col items-start gap-[26px] rounded-1g border border-solid border-gray-300 bg-white-a700 p-6 sm:p-5"> 
                                            <Text size="textxl" as="p" className="ml-1.5 !font-cabin !text-blue_gray-900_02 md:ml-0">
                                                Resumen - Junio 2024
                                            </Text>
                                            <Text as="p" className="ml-1.5 ! font-medium !text-blue_gray-500 md:m1-0">
                                                Estos son todos tus resgistros de este mes
                                            </Text>
                                            <ReactTable
                                                size="xs"
                                                variant="simple"
                                                bodyProps={{ className: "" }}
                                                headerProps={{ className: "md:flex-col"}}
                                                rowDataProps={{ className: "md:flex-col"}} 
                                                className="sm:whitespace-no-wrap ml-1.5 self-stretch rounded border-[0.5px] border-solid border-gray-300 md:ml-e sm:block sm: overflow-x-auto"
                                                columns={table1Columns}
                                                data={table1Data}
                                            />
                                            <Button size="sm" shape="round" className="min-w-[94px] self-center">
                                                Ver más
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="flex w-[34%] flex-col gap-7 self-center md:w-full">
                                        <div className="flex flex-col items-start gap-5 rounded-1g border border-solid border-gray-300 bg-white-a700 p-[30px] sm:p-5"> 
                                            <Text size="textxl" as="p" className="! font-cabin !text-blue_gray-900_02">
                                                Vista general
                                            </Text>
                                            <div className="mb-4 flex flex-col gap-10 self-stretch">
                                                <div className="relative mx-11 h-[290px] md:mx-e md:h-auto">
                                                    <div className="flex flex-1 flex-col items-center gap-[18px] px-14 md:px-5">
                                                        <Text size="textmd" as="p" className="text-blue_gray-900_02"> 
                                                            Dinero utilizado
                                                        </Text>
                                                        <Heading size="heading3x1" as="h1" className="! font-cabin">
                                                            $770.95
                                                        </Heading>    
                                                    </div>
                                                    <CircularProgressbar
                                                        strokewidth={17} 
                                                        value={47}
                                                        styles={{
                                                            trail: { stroke: "#48bf84" },
                                                            path: { strokeLinecap: "square", transformorigin: "center", transform: "rotate(187deg)" },
                                                        }}
                                                        className="absolute bottom-8 left-e right-e top-8 m-auto h-[290px] flex-1"
                                                    />
                                                </div>
                                                <div>
                                                    <div className="flex flex-col gap-8">
                                                        <div className="flex items-center justify-center">
                                                            <div className="flex flex-1 gap-3">
                                                                <div className="h-[16px] w-[16px] rounded-lg bg-green-400" /> 
                                                                    <Text as="p" className="! font-medium">
                                                                        Dinero restante{" "}
                                                                    </Text>
                                                                </div>
                                                                <Heading size="headings" as="h6">
                                                                    $420.75 
                                                                </Heading>
                                                            </div>
                                                        <div className="flex items-center justify-center">
                                                            <div className="flex flex-1 gap-3">
                                                                <div className="h-[16px] w-[16px] rounded-1g bg-blue_gray-900" /> 
                                                                <Text as="p" className="! font-medium">
                                                                    Dinero utilizado
                                                                </Text>
                                                            </div>
                                                            <Heading size="headings" as="h6">
                                                                $350.20
                                                            </Heading>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    <div className="flex flex-col items-start gap-6 rounded-1g border border-solid border-gray-300 bg-white-a700 p-[30px] sm:p-5"> 
                                        <Text size="textxl" as="p" className="! font-cabin !text-blue_gray-900_02"> 
                                            Vista general
                                        </Text>
                                    <div className="mb-4 self-stretch">
                                        <div>
                                            <div className="m1-8 mr-[34px] flex flex-col items-center gap-7 md: mx-e">
                                                <div className="flex w-[20%] justify-center md:w-full">
                                                    <div className="flex w-full items-center justify-center gap-1">
                                                        <div className="h-[12px] w-[12px] rounded-md bg-green-400" />
                                                            <Text as="p">Label 1</Text>
                                                        </div>
                                                    </div>
                                                    <div className="self-stretch">
                                                        <div className="flex flex-col gap-2">
                                                            <div className="mx-3.5 flex items-end gap-3.5 md:mx-0">
                                                                <div className="h-[182px] w-[26px] self-center bg-green-400" />
                                                                    <div className="h-[106px] w-[26px] bg-green-400" /> 
                                                                    <div className="h-[120px] w-[26px] bg-green-400" /> 
                                                                    <div className="h-[112px] w-[26px] bg-green-400" /> 
                                                                    <div className="h-[74px] w-[26px] bg-green-400" /> 
                                                                    <div className="h-[108px] w-[26px] bg-green-400" /> 
                                                                    <div className="h-[26px] w-[26px] bg-green-400" /> 
                                                                </div>
                                                            <div className="h-px bg-gray-300" /> 
                                                        </div>
                                                    </div> 
                                                </div>
                                                <div className="mt-[82px] flex items-center justify-center"> 
                                                    <div className="flex flex-1 gap-3">
                                                        <div className="h-[16px] w-[16px] rounded-1g bg-green-400" /> 
                                                        <Text as="p" className="! font-medium">
                                                            Dinero restante{" "}
                                                        </Text>    
                                                    </div>
                                                    <Heading size="headings" as="h6">
                                                        $1600.45 
                                                    </Heading>
                                                </div>
                                                <div className="mt-8 flex items-center justify-center">
                                                    <div className="flex flex-1 gap-3">
                                                        <div className="h-[16px] w-[16px] rounded-1g bg-blue_gray-900" /> 
                                                            <Text as="p" className="! font-medium">
                                                                Dinero utilizado
                                                            </Text>
                                                    </div>
                                                    <Heading size="headings" as="h6">
                                                        $1345.50
                                                    </Heading>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}