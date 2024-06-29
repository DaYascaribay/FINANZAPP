import { Button, Text, Img, Heading } from "./.."; 
import React from "react";

export default function PaginaPrincipalContainerplan({ 
    planname = "Plan Gratis",
    price = "$0",
    limitation = "Limitado",
    registrationtext = "Registro ilimitado de gastos",
    visualizationtext = "visualización de gastos",
    advertisementtext = "Publicidad",
    currentplanbutton = "Tu plan actual",
    ...props
}) {
    return (
        <div {...props} className={`${props.className} flex flex-col w-[46%] p-6 rounded-tr`}> 
            <Text size="textlg" as="p" className="mt-4">
                {planname}
            </Text>
            <Heading size="heading4x1" as="h1" className="mt-1.5 !font-cabin !text-green-400"> 
                {price}
            </Heading>
            <Text size="textmd" as="p" className="mt-3">
                {limitation}
            </Text>
            <div className="mt-3.5 flex flex-col gap-3 self-stretch">
                <div className="flex items-center gap-2">
                    <Img src="images/img_check_3.svg" alt="image" className="h-[24px] w-[24px]" /> 
                    <Text size="textmd" as="p" className="self-end">
                        {registrationtext}
                    </Text>
                </div>
                <div className="flex items-center gap-2">
                    <img src="images/img_check_3.svg" alt="image" className="h-[24px] w-[24px]" /> 
                    <Text size="textmd" as="p" className="self-end">
                        {visualizationtext}
                    </Text>
                </div>
                <div className="flex items-center gap-2">
                    <img src="images/img_check_3.svg" alt="publicidad" className="h-[24px] w-[24px]" /> 
                    <Text size="textmd" as="p">
                        {advertisementtext}
                    </Text>
                </div>
            </div>
            <Button color="green_400" size="x1" variant="outline" shape="round" className="mt-[138px] w-full sm:px-5">
                {currentplanbutton}
            </Button>
        </div>
    );
}