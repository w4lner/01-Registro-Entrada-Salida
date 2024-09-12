import React from 'react';
import * as XLSX from 'xlsx';

const UploadExcel = ({ setEmployees }) => {

    const handleFileUpload = (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = (event) => {
                const data = new Uint8Array(event.target.result);
                const workbook = XLSX.read(data, { type: 'array' });

                // Suponiendo que los datos están en la primera hoja del archivo Excel
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];

                // Convertir la hoja de Excel a un array de objetos JSON
                const jsonData = XLSX.utils.sheet_to_json(worksheet);

                // Actualizar la lista de empleados
                setEmployees((prevEmployees) => [...prevEmployees, ...jsonData]);
            };

            reader.readAsArrayBuffer(file);
        }
    };

    return (
        <div>
            <input
                type="file"
                accept=".xlsx, .xls"
                onChange={handleFileUpload}
            />
        </div>
    );
};

export default UploadExcel;
