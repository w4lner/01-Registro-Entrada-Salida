import React, { useState, useEffect } from 'react';
import EmployeeForm from './EmployeeForm';
import SearchBar from './SearchBar';

const EmployeeCheckInSystem = () => {
    const [employees, setEmployees] = useState(() => {

        const savedEmployees = localStorage.getItem('employees');
        return savedEmployees ? JSON.parse(savedEmployees) : [];
    });

    const [editingEmployeeIndex, setEditingEmployeeIndex] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');


    useEffect(() => {
        localStorage.setItem('employees', JSON.stringify(employees));
    }, [employees]);

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
        setEditingEmployeeIndex(null);
    };

    const filteredEmployees = employees.filter((employee) =>
        employee.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="container">
            <h1>Registro de Entradas y Salidas</h1>

            <EmployeeForm
                addEmployee={addEmployee}
                editingEmployee={employees[editingEmployeeIndex]}
                updateEmployee={updateEmployee}
                isEditing={editingEmployeeIndex !== null}
            />

            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

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
                {filteredEmployees.length > 0 ? (
                    filteredEmployees.map((employee, index) => (
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
                    ))
                ) : (
                    <tr>
                        <td colSpan="6">No se encontraron empleados</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeCheckInSystem;
