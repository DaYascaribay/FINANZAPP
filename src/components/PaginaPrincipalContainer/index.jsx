import { Text, Heading, Img } from "./..";
import React from "react";

export default function PaginaPrincipalContainer({ userimage = "images/img_icono_1.svg",
    mejorcontrolfin = "Mejor control financiero",
    description = "Al tener la posibilidad de tener un seguimiento de los registros de todos los gastos que se realicen se podrá identificar patrones para realizar enfoques de mejora.",
    ...props
}) {
    return (
        <div
            {...props}
            className={`${props.className} flex flex-col items-start w-full gap-[18px] p-6 sm:p-5 rounded-tl-lg bg-white-a700`}
        >
            <Img src={userimage} alt="image" className="h-[48px] w-[48px]" />
            <Heading size="headingmd" as="h6" className="! font-cabin !text-blue_gray-900">
                {mejorcontrolfin}
            </Heading>
            <Text as="p" className="self-stretch !font-cabin leading-[22px">
                {description}
            </Text>
        </div>
    );
}