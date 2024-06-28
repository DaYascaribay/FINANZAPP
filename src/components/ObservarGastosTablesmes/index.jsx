import { Img, Button, Text } from "./..";
import React from "react";

export default function observarGastosTablemes({ 
    summarytext = "Resumen de julio de 2024", 
    expensestext = (
        <>
            46 gastos
            <br />e ingresos
        </>
    ),
    visualizebutton = "Visualizar",
    ...props
}) {
    return ( 
        <div
            {...props}
            className={`${props.className} flex sm: flex-col justify-center items-center border-gray-300 border-[0.5px] border-solid flex-1 rounded-lg`}
        >
            <div className="outline-b-[0.5] outline-t-[0.5] flex flex-col bg-white-a700 px-7 py-[38px] outline outline-gray-300">
                <img src="images/img_arrow_up_right.svg" alt="image" className="h-[24px] w-[24px]" />
            </div>
            <div className="outline-b-[0.5] outline-t-[0.5] flex flex-1 flex-col items-start justify-center gap-0.5 bg-white-a700 px-4 py-[18px] outline outline-gray-300 sm:self-stretch">
                <Text as="p">{summarytext}</Text>
                <Text size="textxs" as="p" className="leading-5 !text-gray-700">
                    {expensestext}
                </Text> 
            </div>
            <div className="outline-b-[0.5] outline-t-[0.5] flex w-[18%] bg-white-a700 px-4 py-9 outline outline-gray-300"> 
                <Button size="xs" variant="outline" color="undefined undefined" className="min-w-[70px] rounded-[14px]"> 
                    {visualizebutton}
                </Button>
            </div>
            <div className="outline-b-[0.5] outline-t-[0.5] flex justify-center bg-white-a700 p-10 outline outline-gray-300"> 
                <img src="images/img_slider.svg" alt="image" className="h-[22px] w-[92%]" />
            </div>
        </div>
    );
}