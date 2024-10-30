// components/DataTable.tsx
import React from 'react';
import { useTable, Column } from 'react-table';

interface DataTableProps<T extends object> {
    columns: Column<T>[];
    data: T[];
}

const DataTable = <T extends object>({ columns, data }: DataTableProps<T>) => {
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
        columns,
        data,
    });

    return (
        <table {...getTableProps()} style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
                {headerGroups.map((headerGroup) => {
                    // Separate key from the rest of the headerGroup properties
                    const { key: headerGroupKey, ...headerGroupProps } = headerGroup.getHeaderGroupProps();
                    return (
                        <tr key={headerGroupKey} {...headerGroupProps} style={{ backgroundColor: '#f4f4f4' }}>
                            {headerGroup.headers.map((column) => {
                                const { key: columnKey, ...columnProps } = column.getHeaderProps();
                                return (
                                    <th key={columnKey} {...columnProps} style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                                        {column.render('Header')}
                                    </th>
                                );
                            })}
                        </tr>
                    );
                })}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                    prepareRow(row);
                    const { key: rowKey, ...rowProps } = row.getRowProps();
                    return (
                        <tr key={rowKey} {...rowProps} style={{ borderBottom: '1px solid #ddd' }}>
                            {row.cells.map((cell) => {
                                const { key: cellKey, ...cellProps } = cell.getCellProps();
                                return (
                                    <td key={cellKey} {...cellProps} style={{ padding: '10px', textAlign: 'center' }}>
                                        {cell.render('Cell')}
                                    </td>
                                );
                            })}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default DataTable;
