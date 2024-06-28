import { Text, Img, Heading } from "./.."; 
import React from "react";

export default function Footer({ ...props }) {
    return (
        <footer {...props} className={`${props.className} flex justify-center items-start py-10 sm:py-5 bg-green-400` }> 
            <div className="container-xs mb-[62px] flex justify-center px-14 md:p-5 md:px-5">
                <div className="flex w-full items-start justify-center gap-2 md:flex-col">
                    <img src="images/img_image_1.svg" alt="imagefour" className="h-[46px] w-[46px] md:w-full" />
                    <div className="mt-2 flex flex-1 flex-col gap-[50px] self-end md: self-stretch sm:self-auto"> 
                        <div className="flex items-start justify-between gap-5">
                        <Img
                            src="images/img_footer_logo.png"
                            alt="footerlogo"
                            className="mb-1.5 h-[30px] w-[126px] object-contain"
                        />
                        <div className="flex gap-4 self-end">
                            <img src="images/img_logo_twitter_white_a700.svg" alt="logotwitter" className="h-[24px] w-[24px]" /> 
                            <img src="images/img_logo_facebook.svg" alt="logofacebook" className="h-[24px] w-[24px]" /> 
                        </div>
                    </div>
                    <div className="flex items-start justify-between gap-5 md:flex-col">
                        <div className="flex w-[30%] flex-col items-start gap-2.5 md:w-full">
                            <Heading size="headings" as="h6" className="text-white-a700"> 
                                Gestor financiero inteligente{" "}
                            </Heading>
                            <Text as="p" className="self-stretch leading-[22px] !text-white-a700">
                                Gestione sus gastos de la manera más eficiente, una solución perfecta para asegurar su economía. 
                            </Text>
                        </div>
                        <div className="flex flex-col items-end gap-10 self-center">
                            <ul className="!mr-1 flex flex-wrap gap-4 md: mr-0">
                                <li>
                                    <a href="Home" target="_blank" rel="noreferrer">
                                        <Text size="textmd" as="p" className="text-white-a700"> 
                                            Home
                                        </Text>
                                    </a>
                                </li>
                                <li>
                                    <a href="Características" target="_blank" rel="noreferrer"> 
                                        <Text size="textmd" as="p" className="text-white-a700"> 
                                            Características
                                        </Text>
                                    </a> 
                                </li> 
                                <li>
                                    <a href="Premium" target="_blank" rel="noreferrer">
                                        <Text size="textmd" as="p" className="text-white-a700">
                                            Premium 
                                        </Text>
                                    </a>
                                </li>
                                <li>
                                    <a href="Privacidad" target="_blank" rel="noreferrer"> 
                                        <Text size="textmd" as="p" className="text-white-a700">
                                            Privacidad
                                        </Text>
                                    </a>
                                </li>
                                <li>
                                    <a href="Términos" target="_blank" rel="noreferrer">
                                        <Text size="textmd" as="p" className="text-white-a700">
                                            Términos 
                                        </Text>
                                    </a>
                                </li> 
                            </ul>
                            <div className="flex flex-wrap items-center sm:flex-col">
                                <img src="images/img_mail_1.svg" alt="mailone" className="h-[16px] w-[16px] sm:w-full" />
                                <Text size="textmd" as="p" className="ml-3 !text-white-a700 sm:m1-0">
                                    finanzapp@gmail.com
                                </Text>
                                <Img
                                    src="images/img_phone_1.svg"
                                    alt="phoneone"
                                    className="ml-4 h-[16px] w-[16px] sm:m1-0 sm:w-full"
                                />
                                <Text size="textmd" as="p" className="ml-1.5 !text-white-a700 sm: m1-0">
                                    (+593) 999999999
                                </Text>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}