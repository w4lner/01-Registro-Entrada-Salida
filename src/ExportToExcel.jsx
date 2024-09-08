import React from 'react';
import * as XLSX from 'xlsx';

const ExportToExcel = ({ employees }) => {

    const exportToExcel = () => {

        const workbook = XLSX.utils.book_new();

        const worksheet = XLSX.utils.json_to_sheet(employees);

        XLSX.utils.book_append_sheet(workbook, worksheet, 'Empleados');

        const date = new Date();
        const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;

        XLSX.writeFile(workbook, `Empleados-${formattedDate}.xlsx`);
    };

    return (
        <button onClick={exportToExcel}>
            Exportar a Excel
        </button>
    );
};

export default ExportToExcel;
