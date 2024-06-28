import React from "react";
export const CloseSVG = ({ fillcolor="#eeeeee", className = "",...props }) => {
    return (
        <svg
            fill={fillcolor}
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            {...props}
            height={props?.width || 20}
            width={props?.height || 20}
            viewBox={`e @ ${props?.width || 20} ${props?.height || 20}`}   
        >
            <path d="M 4.7070312 3.2929688 L 3.2929688 4.7070312 L 10.585938 12 L 3.2929688 19.292969 L 4.7870312 20.707031 L 12 13.414062 L 19.292969 20.707031 L 20.707031 19.292969 L 13.414062 12 L 20.707031 4.7070312 L 19.292969 3.2929688 L 12 10.585938 L 4.7070312 3.2929688 z" />
        </svg>
    );
};