import React from "react";

import { flexRender, getCoreRowModel, useReactTable, getSortedRowModel } from "@tanstack/react-table";

const variants = {
    simple: "bg-white-a700",
};
const sizes = {
    xs: "p-3.5",
    sm: "p-5",
};

const ReactTable = ({
    columns,
    data = [],
    headerProps = {},
    bodyProps = {},
    className = "",
    rowDataProps = { className: "" },
    size,
    variant,
    ...restConfig
}) => {
    const tableConfig = {
        columns,
        data,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getsortedRowModel(), 
        ...restConfig,
    };

    const table = useReactTable(tableConfig);

    // Render the UI for your table
    return (
        <table className={className}>
            <thead {...headerProps}>
                {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                            <th key={header.id} {...header.column.columnDef?.meta}>
                                {header.isPlaceholder ? null: flexRender (header.column.columnDef.header, header.getContext())}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...bodyProps}>
                {table.getRowModel().rows.map((row) => (
                    <tr
                        {...rowDataProps}
                        className={`${variant ? variants[variant] : ""} ${rowDataProps?.className}`}
                        key={row.id}
                    >
                        {row.getVisibleCells().map((cell) => (
                            <td key={cell.id} className={size ? sizes[size] : ``}> 
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                        ))}
                    </tr>    
                ))} 
            </tbody>
        </table>
    );
};

export { ReactTable };