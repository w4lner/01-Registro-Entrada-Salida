import React, { useState } from 'react';
import * as XLSX from 'xlsx';

const UploadExcel = ({ setEmployees }) => {
    const [warningMessage, setWarningMessage] = useState('');

    const expectedColumns = ['name', 'ci', 'department', 'checkIn', 'checkOut'];

    const handleFileUpload = (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = (event) => {
                const data = new Uint8Array(event.target.result);
                const workbook = XLSX.read(data, { type: 'array' });

                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];

                const jsonData = XLSX.utils.sheet_to_json(worksheet);

                if (jsonData.length > 0) {
                    const fileColumns = Object.keys(jsonData[0]);

                    const isValid = expectedColumns.every(col => fileColumns.includes(col));

                    if (isValid) {
                        setEmployees((prevEmployees) => [...prevEmployees, ...jsonData]);
                        setWarningMessage('');
                    } else {
                        setWarningMessage('El archivo no tiene el formato correcto. Asegúrese de que las columnas sean: ' + expectedColumns.join(', '));
                    }
                } else {
                    setWarningMessage('El archivo está vacío o no tiene datos válidos.');
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
            {warningMessage && <p style={{ color: 'red' }}>{warningMessage}</p>}
        </div>
    );
};

export default UploadExcel;
