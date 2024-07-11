import { Helmet } from "react-helmet";
import { Heading, Text } from "../../components";
import Header from "../../components/Header";
import ObservarGastosColumnresumen from "../../components/ObservarGastosColumnresumen"; 
import ObservarGastosTablemes from "../../components/ObservarGastosTablesmes";
import React, { Suspense } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function ObservarGastosPage() {
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
                            <div className="flex flex-col items-start gap-9">
                                <Heading size="heading2x1" as="h1" className="ml-1.5 !font-cabin uppercase md:ml-0"> 
                                    Dashboard
                                </Heading>
                                <div className="self-stretch rounded-1g border border-solid border-gray-300 bg-white-a700 p-6 sm:p-5"> 
                                    <div className="flex gap-8 md:flex-col">
                                        <Suspense fallback={<div>Loading feed...</div>}>
                                            {[...Array(2)].map((d, index) => (
                                                <ObservarGastosColumnresumen
                                                    key={"listresumen" + index}
                                                    className="mb-1 w-[46%] md:mb-0 md:w-full md:gap-[26px]"
                                                />
                                            ))}
                                        </Suspense>
                                    </div>
                                </div>
                            </div>
                            <div className="ml-1.5 mr-1 flex gap-8 md:mx-0 md:flex-col">
                                <div className="flex-1 md:self-stretch">
                                    <div className="flex flex-col items-start rounded-1g border border-solid border-gray-300 bg-white-a780 px-6 pу-[26px] sm:p-5"> 
                                        <Text size="textxl" as="p" className="ml-1.5 !font-cabin !text-blue_gray-900_02_md:m1-0"> 
                                            Resumen mensual
                                        </Text>
                                        <Text as="p" className="ml-1.5 mt-5 !font-medium !text-blue_gray-500 md:ml-e">
                                            Este mes
                                        </Text>
                                        <div className="mb-3 ml-1.5 mt-1.5 flex flex-col gap-4 self-stretch md:ml-0">
                                            <a href="https://www.youtube.com/embed/bvFxk@sz71" target="_blank"> 
                                                <ObservarGastosTablemes />
                                            </a>
                                            <Text as="p" className="mr-[728px] !font-medium !text-blue_gray-500 md: mr-0"> 
                                                Junio
                                            </Text>
                                            <ObservarGastosTablemes 
                                                summarytext="Resumen de junio de 2024"
                                                expensestext={
                                                    <>
                                                        24 gastos
                                                        <br/>4 ingresos
                                                    </>
                                                }
                                            />
                                            <Text as="p" className="mr-[728px] ! font-medium !text-blue_gray-500 md: mr-0">
                                                Mayo 
                                            </Text>
                                        <ObservarGastosTablemes
                                            summarytext="Resumen de mayo de 2024"
                                            expensestext={
                                                <>
                                                    3 gastos
                                                    <br />5 ingresos
                                                </>
                                            }
                                        />
                                    </div>
                                </div>    
                            </div>
                            <div className="w-[34%] md:w-full">
                                <div className="flex flex-col items-start gap-5 rounded-1g border border-solid border-gray-300 bg-white-a700 p-[30px] sm:p-5"> 
                                    <Text size="textxl" as="p" className="! font-cabin !text-blue_gray-900_02"> 
                                        Vista general
                                    </Text>
                                    <div className="mb-4 self-stretch">
                                        <div className="flex flex-col gap-9">
                                            <div className="relative mx-11 h-[290px] md:mx-0 md:h-auto">
                                                <div className="flex flex-1 flex-col items-center gap-[18px] px-14 md:px-5">
                                                    <Text size="textmd" as="p" className="! text-blue_gray-900_02">
                                                        Dinero utilizado
                                                    </Text>
                                                    <Heading size="heading3x1" as="h2" className="! font-cabin">
                                                        $1345.50
                                                    </Heading>
                                                </div>
                                                <CircularProgressbar
                                                    strokewidth={17}
                                                    value={47}
                                                    styles={{
                                                        trail: { stroke: "#48bf84" },
                                                        path: { strokeLinecap: "square", transformorigin: "center", transform: "rotate(187deg)" },
                                                    }}
                                                    className="absolute bottom-e left-e right-e top-e m-auto h-[290px] flex-1"
                                                />
                                            </div>
                                            <div className="flex items-center justify-center">
                                                <div className="flex flex-1 gap-3">
                                                    <div className="h-[16px] w-[16px] rounded-lg bg-green-400" /> 
                                                    <Text as="p" className="! font-medium">
                                                        Dinero restante{" "}
                                                    </Text>
                                                </div>
                                                <Heading size="headings" as="h3">
                                                    $1600.45
                                                </Heading>
                                            </div>
                                            <div className="flex items-center justify-center">
                                                <div className="flex flex-1 gap-3">
                                                    <div className="h-[16px] w-[16px] rounded-1g bg-blue_gray-900" /> 
                                                        <Text as="p" className="! font-medium">    
                                                            Dinero utilizado
                                                        </Text>
                                                    </div>
                                                    <Heading size="headings" as="h4">
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
};
