import React from "react"; 
import PropTypes from "prop-types";

const shapes = {
    round: "rounded",
};

const variants = {
    fill: {
        white_A700: "bg-white-a700 text-gray-400", 
        gray_100: "bg-gray-100 text-gray-400",
    },
};

const sizes = {
    x1: "h-[144px] px-2.5 text-sm", 
    sm: "h-[34px] pr-2.5",
    lg: "h-[70px] pl-3 pr-[34px] text-2x1",
    md: "h-[42px] pl-4 pr-[34px] text-base", 
    xs: "h-[34px] pl-3 pr-[34px] text-sm", 
};

const Input = React.forwardRef(
    (
        {
            className = "",
            name = "",
            placeholder = "",
            type="text",
            children,
            label = "",
            prefix,
            suffix,
            onChange,
            shape,
            variant = "fill",
            size = "xs",
            color = "",
            ...restProps
        },
        ref,
    ) => {
        return (
            <label
                className={`${className} flex items-center justify-center cursor-text ${(shape && shapes [shape]) || ""} ${variants [variant]?. [color] || variants[variant] || ""} ${sizes[size] || ""}`} 
            >    
                {!!label && label}
                {!!prefix && prefix}
                <input ref={ref} type={type} name={name} placeholder={placeholder} onChange={onChange} {...restProps} />
                {!! suffix && suffix}
            </label>
        );
    },
);
Input.propTypes = {
    className: PropTypes.string, 
    name: PropTypes.string,
    placeholder: PropTypes.string, 
    type: PropTypes.string,
    label: PropTypes.string,
    prefix: PropTypes.node,
    suffix: PropTypes.node,
    shape: PropTypes.oneof(["round"]),
    size: PropTypes.oneof(["x1", "sm", "lg", "md", "xs"]),
    variant: PropTypes.oneof(["fill"]),
    color: PropTypes.oneof(["white_A700", "gray_100"]),
};

export { Input };
    
