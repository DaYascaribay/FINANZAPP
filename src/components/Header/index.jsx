import { Img, Text, Heading} from "./..";
import React from "react";

export default function Header({ ...props }) {
    return (
        <header {...props} className={`${props.className} flex justify-center items-center bg-white-a700`}>
            <div className="container-xs flex justify-center md:p-5">
                <div className="flex w-full items-center justify-between gap-5 px-1 md:flex-col">
                    <img src="images/img_header_logo.png" alt="headerlogo" className="h-[46px] w-[182px] object-contain" />
                    <div className="flex w-[58%] items-center justify-between gap-5 md:w-full md: flex-col">
                        <div className="flex w-[74%] justify-center md:w-full sm:flex-col">
                            <div className="flex flex-1 items-center justify-center gap-2 rounded-t1-[36px] rounded-tr-[36px] px-4 py-6 sm: self-stretch sm:py-5"> 
                                <a href="#">
                                    <img src="images/img_layout_11.svg" alt="layouteleven" className="h-[24px] w-[24px]" /> 
                                </a>
                                <Heading as="p" className="!text-green-400">
                                    Observar economia
                                </Heading>
                            </div>
                            <div className="flex items-center gap-2 rounded-t1-[36px] rounded-tr-[36px] px-4 py-6 sm:py-5"> 
                                <a href="#">
                                    <img src="images/img_package.svg" alt="package" className="h-[24px] w-[24px]" />
                                </a>
                                <Text as="p" className="self-end !text-gray-700">
                                    Crear registros
                                </Text>
                            </div>
                            <div className="flex flex-1 items-center justify-center gap-2 rounded-t1-[36px] rounded-tr-[36px] px-4 py-6 sm:self-stretch sm:py-5">
                                <a href="#">
                                    <img src="images/img_cart.svg" alt="cart" className="h-[24px] w-[24px]" /> 
                                </a>
                                <Text as="p" className="text-gray-700">
                                    Recomendaciones
                                </Text>
                            </div>
                        </div>
                        <a href="#">
                            <Img
                                src="images/img_rectangle.png"
                                alt="image"
                                className="h-[44px] w-[44px] rounded-[22px] object-cover md:w-full"
                            /> 
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
}