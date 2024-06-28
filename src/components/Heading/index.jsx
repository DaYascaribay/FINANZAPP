import React from "react";

const sizes = {
    headingxs: "text-sm font-bold",
    headings: "text-base font-bold", 
    headingmd: "text-lg font-bold",
    headinglg: "text-x1 font-semibold",
    headingxl: "text-2x1 font-bold md:text-[22px]",
    heading2x1: "text-[32px] font-bold md:text-3x1 sm:text-[28px]", 
    heading3x1: "text-[40px] font-bold md:text-[38px] sm:text-4x1", 
    heading4x1: "text-5x1 font-bold md:text-[44px] sm:text-[38px]", 
    heading5x1: "text-[56px] font-bold md:text-5x1 sm:text-[42px]",
};

const Heading = ({ children, className = size = "headingxs", as, ...restProps }) => { 
    const Component = as || "h6";

    return (
        <Component className={`text-gray-900_01 font-inter ${className} ${sizes[size]}`} {...restProps}>
            {children}
        </Component>
    );
};

export { Heading };