import { Helmet } from "react-helmet";
import { Input, Heading, Img, Button, Text } from "../../components";
import Header from "../../components/Header";
import React, { Suspense } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const data = [
{ gastos: "Gastos", fortysix: "46" },
{ gastos: "Ingresos", fortysix: "0" },
];

export default function RecomendacionesPage() {
return (
    <>
        <Helmet>
            <title>FINANZAPP</title>
            <meta name="description" content="Web site created using create-react-app" />
        </Helmet>
        <div className="flex w-full flex-col items-center gap-[46px] bg-gray-50 shadow-xs">
            <Header className="self-stretch" />
            <div className="container-xs mb-1 md:p-5">
                <div className="flex flex-col items-start gap-[38px]">      
                    <Heading size="heading3xl" as="h1" className="!font-cabin uppercase">
                        Recomendación
                    </Heading>
                    <div className="flex items-start gap-4 self-stretch rounded border border-solid border-gray-300 bg-white-a700 px-[30px] py-8 md: flex-col sm:p-5">
                        <div className="mb-2 flex w-[44%] flex-col gap-[52px] self-center md:w-full sm:gap-[26px]">
                            <div className="flex flex-col items-start gap-5 rounded-lg border border-solid border-gray-300 bg-white-a700 p-[30px] sm:p-5">
                                <Text size="textxl" as="p" className="!font-cabin !text-blue_gray-900_02">
                                    Distribució0n de los gastos
                                </Text>
                                <div className="mb-1.5 flex flex-col gap-[34px] self-stretch">
                                    <div className="relative mx-[94px] h-[290px] md:mx-0 md:h-auto">
                                        <div className="relative h-[290px] flex-1">
                                        <CircularProgressbar
                                            strokewidth={17}
                                            value={24}
                                            styles={{
                                                trail: { stroke: "#48bf84" },
                                                path: { strokelinecap: "square", transformorigin: "center", transform: "rotate(143deg)" },
                                            }}
                                            className="absolute bottom-0 left-0 right-0 top-0 m-auto h-[290px] flex-1"
                                        />
                                        <CircularProgressbar
                                            strokewidth={17}
                                            value={7}
                                            styles={{
                                                trail: { stroke: "#48bf84" },
                                                path: { strokelinecap: "square", transformorigin: "center", transform: "rotate(230deg)" },
                                                }}                
                                                className="absolute bottom-0 left-0 right-o top-0 m-auto h-[290px] flex-1"
                                        />
                                        <CircularProgressbar
                                            strokewidth={17}
                                            value={24}
                                            styles={{
                                                trail: { stroke: "#48bf84" },
                                                path: { strokeLinecap: "square", transformorigin: "center", transform: "rotate(259deg)" },
                                            }}          
                                            className="absolute bottom-0 left-0 right-0 top-0 m-auto h-[290px] flex-1"
                                        />       
                                        <CircularProgressbar
                                            strokewidth={17}
                                            value={3}
                                            styles={{ trail: { stroke: "#48bf84" }, path: { strokelinecap: "square" } }}
                                            className="absolute bottom-0 left-0 right-0 top-0 m-auto h-[290px] flex-1"
                                        />
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-o top-0 m-auto flex h-max w-max flex-1 flex-col items-center gap-[18px] px-14 md:px-5">
                                        <Text size="textmd" as="p" className="!text-blue_gray-900_02">
                                            Dinero utilizado
                                        </Text>
                                        <Heading size="heading3xl" as="h2" className="!font-cabin">
                                            $142.00
                                        </Heading>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex flex-col gap-5">
                                        <div className="flex items-center justify-center">
                                            <div className="flex flex-1 gap-3">
                                                <div className="h-[16px] w-[16px] rounded-lg bg-green-400" />
                                                <Text as="p" className="! font-medium">
                                                    Comida rápida
                                                </Text>
                                            </div>
                                            <Heading size="headings" as="h3">
                                                $60.45
                                            </Heading>
                                        </div>
                                        <div className="flex items-center justify-center">
                                            <div className="flex flex-1 gap-3">
                                                <div className="h-[16px] w-[16px] rounded-lg bg-blue_gray-900" />
                                                <Text as="p" className="! font-medium">
                                                Medicina
                                                </Text>
                                            </div>
                                            <Heading size="headings" as="h4">
                                                $46.25
                                            </Heading>
                                        </div>
                                        <div className="flex items-center justify-center">
                                            <div className="flex flex-1 gap-3">
                                                <div className="h-[16px] w-[16px] rounded-lg bg-blue_gray-700_01" />
                                                <Text as="p" className="! font-medium">
                                                    Transporte privado
                                                </Text>
                                            </div>
                                            <Heading size="headings" as="h5">
                                                $24.80
                                            </Heading>
                                        </div>
                                        <div className="flex items-center justify-center">
                                            <div className="flex flex-1 gap-3">
                                                <div className="h-[16px] w-[16px] rounded-lg bg-green-300" />
                                                <Text as="p" className="!font-medium">
                                                    Transporte publico
                                                </Text>
                                            </div>
                                            <Heading size="headings" as="h6">
                                                $7.00
                                            </Heading>
                                        </div>
                                        <div className="flex items-center justify-center">
                                            <div className="flex flex-1 gap-3">
                                                <div className="h-[16px] w-[16px] rounded-lg bg-gray-900" />
                                                <Text as="p" className="!font-medium">
                                                    Dulce
                                                </Text>
                                            </div>
                                            <Heading size="headings" as="h6">
                                                $3.50
                                            </Heading>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col items-start gap-5 rounded-lg border border-solid border-gray-300 bg-white-a700 px-[90px] py-7 sm:p-5">
                            <Text size="textxl" as="p" className="!font-cabin !text-blue_gray-900_02">
                                Distribucion de ingresos
                            </Text>
                            <div className="self-stretch">
                                <div className="flex flex-col gap-[30px]">
                                    <div className="relative mx-[92px] h-[290px] md:mx-0 md:h-auto">
                                        <Img
                                            src="images/img_ellipse. svg"
                                            alt="circleimage"
                                            className="h-[290px] w-[290px] rounded-[50%]"
                                        />
                                        <div className="absolute bottom-0 left-0 right-0 top-0 m-auto flex h-max w-max flex-1 flex-col items-center gap-4 px-14 md:px-5">
                                            <Text size="textmd" as="p" className="!text-blue_gray-900_02">
                                                Dinero conseguido
                                            </Text>
                                            <Heading size="heading3x1" as="h1" className="!font-cabin">
                                                $0.00
                                            </Heading>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-center">
                                        <div className="flex flex-1 gap-3">
                                            <div className="h-[16px] w-[16px] rounded-lg bg-green-400" />
                                                <Text as="p" className="! font-medium">
                                                    N/A
                                                </Text>
                                            </div>
                                            <Heading size="headings" as="h6">
                                                $0.00
                                            </Heading>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-1 flex-col gap-[34px] md:self-stretch">
                            <div className="mr-[26px] md:mr-0">
                                <div className="flex flex-col items-start">
                                    <Text size="textxl" as="p" className="!font-cabin !text-blue_gray-900_02">
                                        Último mes
                                    </Text>
                                    <div className="mt-6 flex items-center gap-[11px] self-stretch">
                                        <Img src="images/img_currency_dollar.svg" alt="currencydollar" className="h-[28px] w-[28px]" />
                                        <Heading size="headinglg" as="h5" className="self-end !font-cabin !text-green-400">
                                            Gasto mas significativo
                                        </Heading>
                                    </div>
                                    <div className="mt-2 self-stretch rounded-lg border border-solid border-gray-300 bg-white-a700 px-4 py-[18px]">
                                        <div className="mb-3.5 flex flex-col gap-[18px]">
                                            <div className="flex w-[82%] items-center md:w-full sm:flex-col">
                                                <Heading as="p" className="!text-blue_gray-900_02">
                                                    Nombre
                                                </Heading>
                                                <div className="flex flex-1 items-center justify-end sm:self-stretch">
                                                    <Text as="p" className="!text-blue_gray-900_02">
                                                        Pizza
                                                    </Text>
                                                    <div className="flex flex-wrap gap-6">
                                                            <Heading as="p" className="!text-blue_gray-900_02">
                                                                Precio promedio
                                                            </Heading>
                                                            <Text as="p" className="!text-blue_gray-900_02">
                                                                $21.34
                                                            </Text>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex w-[82%] items-center md:w-full sm:flex-col">
                                                <Heading as="p" className="!text-blue_gray-900_02">
                                                    Tipo
                                                </Heading>
                                                <div className="flex flex-1 items-center justify-end sm:self-stretch">
                                                    <Text as="p" className="!text-blue_gray-900_02">
                                                        Comida rápida
                                                    </Text>
                                                    <div className="flex flex-wrap gap-[62px] md:gap-5">
                                                        <Heading as="p" className="!text-blue_gray-900_02">
                                                            Porcentaje
                                                        </Heading>
                                                        <Text as="p" className="!text-blue_gray-900_02">
                                                            %18.60
                                                        </Text>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-wrap gap-[18px]">
                                                <Heading as="p" className="!text-blue_gray-900_02">
                                                    Veces reincido
                                                </Heading>
                                                <Text as="p" className="!text-blue_gray-900_02">
                                                    4
                                                </Text>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mr-[222px] mt-[22px] flex gap-[26px] self-stretch md:mr-0 md:flex-col">
                                        <Suspense fallback={<div>Loading feed ...</div>}>
                                            {data.map((d, index) => (
                                                <div
                                                    key={"recomendaciones" + index}
                                                    className="flex w-[46%] flex-col items-start gap-3 rounded-lg border border-solid border-gray-300 bg-white-a700 px-6 py-5 md:w-full sm:px-5"
                                                >
                                                    <Text size="textmd" as="p">
                                                        {d.gastos}
                                                    </Text>
                                                    <Heading size="headinglg" as="h5" className="!font-bold uppercase !text-blue_gray-900">
                                                        {d. fortysix}
                                                    </Heading>
                                                </div>
                                            ))}
                                        </Suspense>
                                    </div>
                                </div>
                            </div>
                            <div className="ml-2 mr-[18px] md:mx-0">
                                <div className="flex flex-col gap-[18px]">
                                    <div className="flex items-center gap-[11px]">
                                        <Img src="images/img_c_info_1.svg" alt="cinfoone" className="h-[28px] w-[28px]" />
                                        <Heading size="headinglg" as="h5" className="!font-cabin !text-green-400">
                                            Detalle del mes
                                        </Heading>
                                    </div>
                                    <div className="flex justify-center rounded-lg border-[0.5px] border-solid border-gray-300 sm:flex-col">
                                        <div className="outline-b-[0.5] outline-t-[0.5] flex flex-col bg-white-a700 px-4 py-[38px] outline outline-gray-300 sm:py-5">
                                            <Img src="images/img_arrow_up_right.svg" alt="arrowupright" className="h-[24px] w-[24px]" />
                                        </div>
                                        <div className="outline-b-[0.5] outline-t-[0.5] flex flex-1 flex-col items-start justify-center gap-0.5 bg-white-a700 px-4 py-[18px] outline outline-gray-300 sm:self-stretch">
                                            <Text as="p">Resumen de julio de 2024</Text>
                                            <Text size="textxs" as="p" className="leading-5 !text-gray-700">
                                                <>
                                                    5 gastos
                                                    <br />0 ingresos
                                                </>
                                            </Text>
                                        </div>
                                        <Button
                                            size="5xl"
                                            shape="square"
                                            className="outline-b-[0.5] outline-t-[0.5] min-w-[114px] !text-blue-400 outline outline-gray-300 sm:px-5"
                                        >
                                            Visualizar
                                        </Button>
                                        <div className="outline-b-[0.5] outline-t-[0.5] flex bg-white-a700 px-8 py-10 outline outline-gray-300 sm:p-5">
                                            <Img src="images/img_slider.svg" alt="slider" className="h-[22px] w-full md:h-auto" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="ml-2 mr-[18px] flex flex-col gap-4 md:mx-0">
                                <div className="mx-1.5 flex items-center gap-[7px] md:mx-0">
                                    <Img src="images/img_archive_check_1.svg" alt="archivecheckone" className="h-[28px] w-[28px]" />
                                    <Heading size="headinglg" as="h5" className="!font-cabin !text-green-400">
                                        Recomendación
                                    </Heading>
                                </div>
                                <Input
                                    color="white_A700"
                                    size="xl"
                                    name="description"
                                    placeholder={'Redistribuir tus gastos puede ayudarte a ahorrar dinero y mejorar tu salud. Enfócate en reducir gastos innecesarios en comida rápida y dulces, y revisa cuidadosamente tus gastos en medicina y misceláneos. Aprovecha más el transporte público si es viable. Implementar estos cambios puede llevar a una mejor situación financiera y bienestar general.'}
                                    className="rounded-lg border border-solid border-gray-300 font-medium leading-[22px] !text-blue_gray-500"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>  
    </>
);
}