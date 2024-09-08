import React, { useState, useEffect } from 'react';
import EmployeeForm from './EmployeeForm';
import SearchBar from './SearchBar';
import EmployeeList from './EmployeeList';

const EmployeeCheckInSystem = () => {
    const [employees, setEmployees] = useState(() => {
        const savedEmployees = localStorage.getItem('employees');
        return savedEmployees ? JSON.parse(savedEmployees) : [];
    });

    const [editingEmployeeIndex, setEditingEmployeeIndex] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const employeesPerPage = 5;

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

    const startIndex = (currentPage - 1) * employeesPerPage;
    const paginatedEmployees = filteredEmployees.slice(startIndex, startIndex + employeesPerPage);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

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

            <EmployeeList
                employees={paginatedEmployees}
                totalEmployees={filteredEmployees.length}
                employeesPerPage={employeesPerPage}
                currentPage={currentPage}
                handlePageChange={handlePageChange}
                handleEdit={handleEdit}
                startIndex={startIndex}
            />
        </div>
    );
};

export default EmployeeCheckInSystem;
