import React, { useState } from 'react';
import EmployeeForm from './EmployeeForm';

const EmployeeCheckInSystem = () => {
    const [employees, setEmployees] = useState([]);

    const addEmployee = (newEmployee) => {
        setEmployees([...employees, newEmployee]);
    };

    return (
        <div>
            <h1>Registro de Entradas y Salidas</h1>
            <EmployeeForm addEmployee={addEmployee} />

            <table>
                <thead>
                <tr>
                    <th>Nombre y Apellidos</th>
                    <th>CI</th>
                    <th>Departamento</th>
                    <th>Hora Entrada</th>
                    <th>Hora Salida</th>
                </tr>
                </thead>
                <tbody>
                {employees.map((employee, index) => (
                    <tr key={index}>
                        <td>{employee.name}</td>
                        <td>{employee.ci}</td>
                        <td>{employee.department}</td>
                        <td>{employee.checkIn}</td>
                        <td>{employee.checkOut}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeCheckInSystem;
