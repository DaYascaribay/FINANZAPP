import React from "react"; 
import PropTypes from "prop-types";

const shapes = {
    round: "rounded-lg",
    square: "rounded-[0px]",
};
const variants = {
    fill: {
        green_300: "bg-green-300 text-white-a700",
        white_A700: "bg-white-a700 text-gray-980_01",
        gray_100_02: "bg-gray-100_02 text-green-400",
        green_400: "bg-green-400 shadow-md text-white-a700",
        gray_50: "bg-gray-50 text-gray-700",
    },
    outline: {
        green_400: "border-green-400 border border-solid text-green-400",
        blue_400: "border-blue-400 border border-solid text-blue-400",
    },
};
const sizes = {
    "4x1": "h-[68px] px-4 text-sm",
    "5x1": "h-[102px] pl-6 pг-[34px] text-xs",
    x1: "h-[52px] px-[34px] text-lg",
    "2x1": "h-[56px] px-4 text-sm",
    md: "h-[44px] px-[34px] text-base", 
    xs: "h-[28px] px-1.5 text-xs", 
    "3x1": "h-[60px] pl-4 pr-6 text-sm", 
    sm: "h-[36px] px-3 text-sm", 
    lg: "h-[48px] pl-4 pr-5 text-sm", 
};

const Button = ({
    children,
    className = "",
    lefticon,
    righticon,
    shape,
    variant="fill",
    size = "lg",
    color = "",
    ...restProps
}) => {
    return ( 
        <button
            className={`${className} flex flex-row items-center justify-center text-center cursor-pointer ${(shape && shapes [shape]) || ""} ${(size & sizes[size]) || ""} ${(variant && variants[variant]?.[color]) || ""}`}
            {...restProps}
        >
            {!!leftIcon && leftIcon}
            {children}
            {!!rightIcon && rightIcon}
        </button>
    );
};

Button.propTypes = {
    className: PropTypes.string, 
    children: PropTypes.node, 
    leftIcon: PropTypes.node,
    righticon: PropTypes.node,
    shape: PropTypes.oneof(["round", "square"]),
    size: PropTypes.oneof(["4x1", "5x1", "x1", "2x1", "md", "xs", "3x1", "sm", "lg"]),
    variant: PropTypes.oneof(["fill", "outline"]),
    color: PropTypes.oneof(["green_300", "white_A700", "gray_100_02", "green_400", "gray_50", "blue_400"]),
};

export { Button };