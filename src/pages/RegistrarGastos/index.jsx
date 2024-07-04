import { Helmet } from "react-helmet";
import { Text, Button, Heading, SelectBox, Img, Radio, RadioGroup, Input } from "../../components"; 
import Header from "../../components/Header";
import { ReactTable } from "../../components/ReactTable";
import { createColumnHelper } from "@tanstack/react-table";
import React from "react";

const dropDownOptions = [
    { label: "option1", value: "option1" },
    { label: "Option2", value: "option2" },
    { label: "Option3", value: "option3" },
];
const tableData = [
    {
        registro: "1",
        nombreone: "Bus",
        valorone: "$0.35",
        fecha: "14/6/2024",
        tipode: "Gasto",
        tipodegasto: "Transporte público",
    },
    {
        registro: "2",
        nombreone: "Metro",
        valorone: "$0.45",
        fecha: "14/6/2024",
        tipode: "Gasto",
        tipodegasto: "Transporte público",
    },
    {
        registro: "3",
        nombreone: "Bus", 
        valorone: "$0.35", 
        fecha: "14/6/2024", 
        tipode: "Gasto",
        tipodegasto: "Transporte público",
    },
    {
        registro: "4",
        nombreone: "Arroz (2 lb)",
        valorone: "$1.40",
        fecha: "14/6/2024", 
        tipode: "Gasto", 
        tipodegasto: "Comida",
    },
];

export default function RegistrarGastosPage() { 
    const tableColumns= React.useMemo (() => {
        const tableColumnHelper = createColumnHelper(); 
        return [
            tableColumnHelper.accessor("registro", {
                cell: (info) => (
                    <Text as="p" className="border-[0.5px] border-solid border-gray-300">
                        {info?.getValue?.()}
                    </Text>
                ),
                header: (info) => (
                    <Button
                        size="4x1"
                        shape="square"
                        className="min-w-[96px] border-[0.5px] border-solid border-gray-300 font-cabin font-semibold"
                    >
                        # Registro
                    </Button>
                ),
                meta: { width: "96px"},
            }),
            tableColumnHelper.accessor("nombreone", {
                cell: (info) => (
                    <Text as="p" className="border-[0.5px] border-solid border-gray-300">
                        {info?.getValue?.()}
                    </Text>
                ),
                header: (info) => (
                    <Heading 
                        as="h2"
                        className="border-[0.5px] border-solid border-gray-300 bg-gray-50 !font-cabin !font-semibold !text-gray-700"
                    >
                        Nombre
                    </Heading>
                ),
                meta: { width: "314px" },
            }),
            tableColumnHelper.accessor("valorone", {
                cell: (info) => (
                    <Text as="p" className="border-[0.5px] border-solid border-gray-300">
                        {info?.getValue?.()}
                    </Text>
                ),
                header: (info) => (
                <Heading
                as="h3"
                className="border-[0.5px] border-solid border-gray-300 bg-gray-50 !font-cabin !font-semibold !text-gray-700"
                >
                    Valor
                </Heading>
                ),
                meta: { width: "102px" },
            }),
            tableColumnHelper.accessor("fecha", {
                cell: (info) => (
                    <Button size="3x1" shape="square" className="min-w-[110px] border-[0.5px] border-solid border-gray-300"> 
                        {info?.getValue?.()}
                    </Button>
                ),
                header: (info) => (
                    <Heading 
                        as="h4"
                        className="border-[0.5px] border-solid border-gray-300 bg-gray-50 !font-cabin !font-semibold !text-gray-700"
                    >
                        Fecha
                    </Heading>
                ),
                meta: { width: "110px" },
            }),
            tableColumnHelper.accessor("tipode", {
                cell: (info) => (
                    <Text as="p" className="border-[0.5px] border-solid border-gray-300">
                        {info?.getValue?.()}
                    </Text>
                ),
                header: (info) => (
                    <Heading
                        as="h5"
                        className="border-[0.5px] border-solid border-gray-300 bg-gray-50 !font-cabin !font-semibold !text-gray-700"
                    >
                        Tipo de registro
                    </Heading>
                ),
                meta: { width: "138px" },
            }),
            tableColumnHelper.accessor("tipodegasto", {
                cell: (info) => (
                    <Text as="p" className="border-[0.5px] border-solid border-gray-300">
                        {info?.getValue?.()}
                    </Text>
                ),
                header: (info) => (
                    <Heading
                    as="h6"
                    className="border-[0.5px] border-solid border-gray-300 bg-gray-50 !font-cabin !font-semibold !text-gray-700"
                    >
                        Tipo de gasto
                    </Heading>
                ),
                meta: { width: "186px"},
            }),
        ];
    }, []);

    return (
        <>
            <Helmet>
                <title>Finanzapp</title>
                <meta name="description" content="web site created using create-react-app" /> 
            </Helmet>
            <div className="flex w-full flex-col gap-9 bg-gray-50 shadow-xs">
                <Header />
                <div className="mb-1 ml-[72px] mr-6 flex items-center gap-[18px] md:mx-0 md:flex-col">
                    <div className="flex w-[26%] flex-col items-start gap-9 md:w-full md:p-5"> 
                        <Heading size="heading2x1" as="h1" className="! font-cabin uppercase">
                        crear registro
                        </Heading>
                        <div className="flex flex-col items-start self-stretch rounded-1g border border-solid border-gray-300 bg-white-a780 px-[42px] py-[30px] md:px-5 sm: p-5">
                            <Input
                                shape="round" 
                                name="nombre"
                                placeholder={`Nombre...`}
                                className="self-stretch border border-solid border-gray-500 sm:pr-5"
                            />
                            <Input
                                shape="round"
                                name="valor"
                                placeholder={`Valor...`}
                                className="mt-[26px] self-stretch border border-solid border-gray-500 sm:pr-5"
                            />
                            <Input
                                shape="round"
                                name="ddmmaaaa"
                                placeholder={`dd/mm/aaaa...`}
                                className="mt-[26px] self-stretch border border-solid border-gray-500 sm:pr-5"
                            />
                            <RadioGroup name="group78" className="mt-[26px] flex self-stretch">
                                <Radio value="gasto" label="Gasto" className="w-full gap-1.5 text-sm text-gray-900_01" /> 
                                <Radio
                                    value="ingreso"
                                    label="Ingreso"
                                    className="ml-16 mr-[52px] w-full gap-1.5 py-0.5 text-sm text-gray-900_01"
                                />
                            </RadioGroup>
                            <SelectBox
                                shape="round"
                                indicator={<img src="images/img_arrowdown.svg" alt="arrow_down" className="h-[14px] w-[14px]" />} 
                                name="dropdown"
                                placeholder={`Dropdown`}
                                options={dropDownOptions}
                                className="mt-[26px] w-[74%] border border-solid border-gray-500 sm:pr-5"
                            />
                            <a href="https://www.youtube.com/embed/bvFxk@sz71" target="_blank">
                                <Button size="md" shape="round" className="mb-[30px] mt-[46px] w-full sm: px-5">
                                    Agregar
                                </Button>
                            </a> 
                        </div>
                    </div>
                    <div className="flex-1 md: self-stretch md:p-5">
                        <div className="rounded-1g border border-solid border-gray-300 bg-white-a700 px-2.5 py-[22px] sm:py-5">
                            <ReactTable
                                size="sm"
                                variant="simple"
                                bodyProps={{ className: "" }}
                                headerProps={{ className: "md:flex-col"}}
                                rowDataProps={{ className: "md:flex-col"}}
                                className="sm:whitespace-no-wrap mt-1.5 rounded border-[0.5px] border-solid border-gray-300 sm:block sm: overflow-x-auto" 
                                columns={tableColumns}
                                data={tableData}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}