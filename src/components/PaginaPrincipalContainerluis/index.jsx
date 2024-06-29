import { Img, Text, Heading} from "./..";
import React from "react";

export default function PaginaPrincipalContainerluis({
    userimage = "images/img_image_luis.png",
    username="Luis Loor",
    userdescription = "Estudiante de Ingeniería en Sistemas de la Información",
    ...props
}) {
    return (
        <div
            {...props}
            className={`${props.className} flex flex-col items-center w-[32%] md:w-full px-1.5 py-6 sm:py-5 bg-gray-50 rounded-md`}
        >
            <Img
                src={userimage}
                alt="luis_loor"
                className="ml-[46px] mr-11 h-[174px] w-[174px] rounded-[86px] object-cover"
            />
            <Heading size="headingxl" as="h4" className="mt-6 !font-cabin">
                {username}
            </Heading>
            <Text
                size="textmd"
                as="p"
                className="mt-[18px] self-stretch text-center !font-cabin leading-[26px] !text-green-400"
            >
                {userdescription}
            </Text>
            <div className="mt-[42px] flex gap-4">
                <Img src="images/img_logo_linkedin.svg" alt="logolinkedin" className="h-[24px] w-[24px]" /> 
                <Img src="images/img_logo_twitter.svg" alt="logotwitter" className="h-[24px] w-[24px]" /> 
                <Img src="images/img_logo_instagram.svg" alt="logoinstagram" className="h-[24px] w-[24px]" /> 
            </div>
        </div>
    );
}