import React from 'react';
import * as XLSX from 'xlsx';

const UploadExcel = ({ setEmployees }) => {
    const expectedColumns = ['name', 'ci', 'department', 'checkIn', 'checkOut'];

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

                // Verificar las columnas del archivo
                if (jsonData.length > 0) {
                    const fileColumns = Object.keys(jsonData[0]);

                    const isValid = expectedColumns.every(col => fileColumns.includes(col));

                    if (isValid) {
                        setEmployees((prevEmployees) => [...prevEmployees, ...jsonData]);
                    } else {
                        // Mostrar una alerta si el formato no es correcto
                        window.alert(`El archivo no tiene el formato correcto. Asegúrese de que las columnas sean: ${expectedColumns.join(', ')}`);
                    }
                } else {
                    window.alert('El archivo está vacío o no tiene datos válidos.');
                }
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
