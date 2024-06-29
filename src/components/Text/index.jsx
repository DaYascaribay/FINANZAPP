import React from "react";

const sizes = {
    textxs: "text-xs font-normal not-italic",
    texts: "text-sm font-normal not-italic", 
    textmd: "text-base font-normal not-italic", 
    textlg: "text-1g font-normal not-italic",
    textxl: "text-2x1 font-normal not-italic md:text-[22px]",
    text2xl: "text-[32px] font-normal not-italic md:text-3x1 sm:text-[28px]",
};

const Text = ({ children, className = "", as, size = "texts", ...restProps }) => {
    const Component = as || "p";

    return (
        <Component className={`text-gray-900_01 font-inter ${className} ${sizes[size]}`} {...restProps}>
            {children}
        </Component>
    );
};

export { Text };