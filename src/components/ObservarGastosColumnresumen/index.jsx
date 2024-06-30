import { Heading, Text, Img } from "./.."; 
import React from "react";

export default function ObservarGastosColumnresumen({ 
    resumen = "Resumen financiero",
    verdetalles = "Ver detalles",
    dineroRestante = "Dinero restante", 
    remainingamount = "$1600.45",
    dinero = "Dinero utilizado",
    usedamount = "$1350.50",
    ...props
}) {
    return (
        <div {...props} className={'${props.className} flex flex-col gap-[26px]'}>
            <div className="flex items-center gap-[15px] self-stretch">
                <Text size="textxl" as="p" className="font-cabin text-blue_gray-900_02 sm:text-x1"> 
                    {resumen}
                </Text>
                <div className="flex items-center gap-1 rounded-[3px] p-2">
                    <Text size="textxs" as="p" className="text-green-400">
                        {verdetalles}
                    </Text>
                    <Img src="images/img_arrow_right.svg" alt="ver_detalles" className="h-[12px] w-[12px]" /> 
                </div>
            </div>
            <div className="flex gap-6 self-stretch">
                <div className="flex w-full flex-col items-start justify-center gap-[18px] rounded-lg bg-gray-100_02 px-6 py-[26px] sm:gap-[18px] sm:p-5"> 
                    <Text size="textmd" as="p" className="text-blue_gray-900_02 sm:text-[13px]">
                        {dineroRestante}
                    </Text>
                    <Heading size="heading2x1" as="h2" className="font-cabin text-green-400 sm:text-[27px]">
                        {remainingamount}
                    </Heading>
                </div>
                <div className="flex w-full flex-col items-start justify-center gap-[18px] rounded-lg bg-yellow-50 px-6 py-[26px] sm:gap-[18px] sm:p-5"> 
                    <Text size="textmd" as="p" className="text-blue_gray-900_02 sm:text-[13px]">
                        {dinero}
                    </Text>
                    <Heading size="heading2x1" as="h2" className="font-cabin text-blue_gray-900 sm:text-[27px]">
                        {usedamount}
                    </Heading>
                </div>
            </div>
        </div>
    );
}
