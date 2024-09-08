import React, { useState } from 'react';
import EmployeeForm from './EmployeeForm';

const EmployeeCheckInSystem = () => {
    const [employees, setEmployees] = useState([]);
    const [editingEmployeeIndex, setEditingEmployeeIndex] = useState(null); // Índice del empleado en edición

    const addEmployee = (newEmployee) => {
        setEmployees([...employees, newEmployee]);
    };

    const handleEdit = (index) => {
        setEditingEmployeeIndex(index);
    };

    const updateEmployee = (updatedEmployee) => {
        const updatedEmployees = employees.map((employee, index) =>
            index === editingEmployeeIndex ? updatedEmployee : employee
        );
        setEmployees(updatedEmployees);
        setEditingEmployeeIndex(null); // Finalizar edición
    };

    return (
        <div>
            <h1>Registro de Entradas y Salidas</h1>
            <EmployeeForm
                addEmployee={addEmployee}
                editingEmployee={employees[editingEmployeeIndex]}
                updateEmployee={updateEmployee}
                isEditing={editingEmployeeIndex !== null}
            />

            <table>
                <thead>
                <tr>
                    <th>Nombre y Apellidos</th>
                    <th>CI</th>
                    <th>Departamento</th>
                    <th>Hora Entrada</th>
                    <th>Hora Salida</th>
                    <th>Acciones</th>
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
                        <td>
                            <button onClick={() => handleEdit(index)}>Editar</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeCheckInSystem;
