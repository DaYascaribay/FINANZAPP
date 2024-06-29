import React from "react"; 
import Select from "react-select"; 
import PropTypes from "prop-types";

const shapes = {
    round: "rounded",
};
const variants = {
    fill: {
        white_A700: "bg-white-a700 text-gray-900_01",
    },
};
const sizes = {
    xs: "h-[34px] pl-3 pг-[34px] text-sm",
};

const SelectBox = React.forwardRef(
    (
        {
            children, 
            className = "",
            options = [],
            isSearchable = false,
            isMulti = false,
            indicator,
            shape,
            variant="fill",
            size = "xs",
            color="white_A700", 
            ...restProps
        },
        ref,
    ) => {
        return (
            <>
                <Select
                    ref={ref}
                    options={options}
                    className={`${className} flex ${(shape && shapes [shape]) || ""} ${(size && sizes[size]) || ""} ${(variant && variants[variant]?. [color]) || ""}`} 
                    isSearchable={isSearchable}
                    isMulti={isMulti}
                    components={{
                        IndicatorSeparator: () => null,
                        ...(indicator && { DropdownIndicator: () => indicator }),
                    }}
                    styles={{
                        container: (provided) => ({
                            ...provided,
                            zIndex: 0,
                        }),
                        control: (provided) => ({
                            ...provided,
                            backgroundColor: "transparent",
                            border: "0 !important",
                            boxShadow: "e !important",
                            minHeight: "auto",
                            width: "100%",
                            "&:hover": {
                                border: "e !important",
                            },
                        }),
                        input: (provided) => ({
                            ...provided,
                            color: "inherit",
                        }),
                        option: (provided, state) => ({
                            ...provided,
                            color: "#eee",
                        }),
                        valueContainer: (provided) => ({
                            ...provided,
                            padding: 0,
                        }),
                        placeholder: (provided) => ({
                            ...provided, 
                            margin: 0,
                        }),
                        menuPortal: (base) => ({ ...base, zIndex: 999999 }),
                        menu: ({ width, ...css }) => ({ ...css }),
                    }}
                    menuPortalTarget={document.body} 
                    closeMenuOnScroll={(event) => {
                        return event.target.id === "scrollcontainer";
                    }}
                    {...restProps}
                />
                {children}
            </>
        );
    },
);

SelectBox.propTypes = { 
    className: PropTypes.string, 
    options: PropTypes.array, 
    isSearchable: PropTypes.bool, 
    isMulti: PropTypes.bool, 
    onChange: PropTypes.func, 
    value: PropTypes.string, 
    indicator: PropTypes.node,
    shape: PropTypes.oneof(["round"]),
    size: PropTypes.oneof(["xs"]), 
    variant: PropTypes.oneof(["fill"]), 
    color: PropTypes.oneof(["white_A700"]),
};

export { SelectBox };