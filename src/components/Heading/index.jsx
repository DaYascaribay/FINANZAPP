import React from "react";

const sizes = {
    headingxs: "text-sm font-bold",
    headings: "text-base font-bold",
    headingmd: "text-lg font-bold",
    headinglg: "text-xl font-semibold",
    headingxl: "text-2xl font-bold md:text-[22px]",
    heading2x1: "text-[32px] font-bold md:text-3xl sm:text-[28px]",
    heading3x1: "text-[40px] font-bold md:text-[38px] sm:text-4xl",
    heading4x1: "text-5xl font-bold md:text-[44px] sm:text-[38px]",
    heading5x1: "text-[56px] font-bold md:text-5xl sm:text-[42px]",
};

const Heading = ({ children, className = "headingxs", as: Component = "h6", ...restProps }) => {
    const sizeClass = sizes[className] || sizes.headingxs;

    return (
        <Component className={`text-gray-900_01 font-inter ${sizeClass}`} {...restProps}>
            {children}
        </Component>
    );
};

export { Heading };
