import React from 'react';
import './EmployeeList.css';

const EmployeeList = ({ employees, totalEmployees, employeesPerPage, currentPage, handlePageChange, handleEdit, startIndex }) => {
    const totalPages = Math.ceil(totalEmployees / employeesPerPage);

    return (
        <div>
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
                {employees.length > 0 ? (
                    employees.map((employee, index) => (
                        <tr key={index}>
                            <td>{employee.name}</td>
                            <td>{employee.ci}</td>
                            <td>{employee.department}</td>
                            <td>{employee.checkIn}</td>
                            <td>{employee.checkOut}</td>
                            <td>
                                <button onClick={() => handleEdit(startIndex + index)}>Editar</button>
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

            <div className="pagination-container">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Anterior
                </button>
                <span>Página {currentPage} de {totalPages}</span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Siguiente
                </button>
            </div>
        </div>
    );
};

export default EmployeeList;
