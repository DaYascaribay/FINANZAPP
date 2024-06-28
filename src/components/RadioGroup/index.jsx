import React from "react";
import { Radio } from "../Radio";

const RadioGroup = React.forwardRef(
    ({ selectedValue, orientation="horizontal", className, name, children, onchange, disabled, ...restProps }, ref) => { 
        const [value, setvalue] = React.usestate(selectedValue);

        React.useEffect(() => {
            setvalue(selectedValue);
        }, [selectedValue]);

        const handleChange = (event, val, isDisabled) => {
            if (isDisabled) return;
            setvalue(val);
            onChange && onChange(val, event);
        };

        const compChildren = React.Children.map(children, (child) => {
            if (child?.type === Radio) {
                return React.cloneElement(child, {
                    value: child.props.value,
                    name,
                    checked: child.props.value === value,
                    onChange: (e) => handleChange (e, child.props.value, child.props.disabled), 
                    orientation,
                    disabled: child.props.disabled,
                });
            }
            return child;
        });

        return (
            <>
                <div className={className}>{compChildren}</div>
            </>
        );
    },
);

export { RadioGroup };