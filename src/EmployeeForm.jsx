import React, { useState, useEffect } from 'react';

const EmployeeForm = ({ addEmployee }) => {
    const [employee, setEmployee] = useState({
        name: '',
        ci: '',
        department: '',
        checkIn: '',
        checkOut: ''
    });

    const getCurrentTime = () => {
        return new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }); // Formato 24 horas sin segundos
    };

    useEffect(() => {
        const currentTime = getCurrentTime();
        setEmployee((prevEmployee) => ({
            ...prevEmployee,
            checkIn: currentTime
        }));
    }, []);

    const handleChange = (e) => {
        setEmployee({ ...employee, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addEmployee(employee);
        setEmployee({ name: '', ci: '', department: '', checkIn: getCurrentTime(), checkOut: '' }); // Resetear el formulario con nueva hora de entrada
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                value={employee.name}
                onChange={handleChange}
                placeholder="Nombre y Apellidos"
                required
            />
            <input
                type="text"
                name="ci"
                value={employee.ci}
                onChange={handleChange}
                placeholder="CI"
                required
            />
            <input
                type="text"
                name="department"
                value={employee.department}
                onChange={handleChange}
                placeholder="Departamento"
                required
            />
            <input
                type="text"
                name="checkIn"
                value={employee.checkIn}
                readOnly
            />
            <input
                type="time"
                name="checkOut"
                value={employee.checkOut}
                onChange={handleChange}
                required
            />
            <button type="submit">Registrar</button>
        </form>
    );
};

export default EmployeeForm;
