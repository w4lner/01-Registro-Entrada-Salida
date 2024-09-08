import React, { useState, useEffect } from 'react';

const EmployeeForm = ({ addEmployee, editingEmployee, updateEmployee, isEditing }) => {
    const [employee, setEmployee] = useState({
        name: '',
        ci: '',
        department: '',
        checkIn: '',
        checkOut: ''
    });

    useEffect(() => {
        if (isEditing && editingEmployee) {
            setEmployee(editingEmployee);
        }
    }, [isEditing, editingEmployee]);

    const getCurrentTime = () => {
        return new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    };

    useEffect(() => {
        if (!isEditing) {
            const currentTime = getCurrentTime();
            setEmployee((prevEmployee) => ({
                ...prevEmployee,
                checkIn: currentTime
            }));
        }
    }, [isEditing]);

    const handleChange = (e) => {
        setEmployee({ ...employee, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            updateEmployee(employee);
        } else {
            addEmployee(employee);
        }
        setEmployee({ name: '', ci: '', department: '', checkIn: getCurrentTime(), checkOut: '' });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className={`input-group ${isEditing ? 'disabled' : ''}`}>
                <input
                    type="text"
                    name="name"
                    value={employee.name}
                    onChange={handleChange}
                    placeholder="Nombre y Apellidos"
                    required
                    readOnly={isEditing}
                />
            </div>
            <div className={`input-group ${isEditing ? 'disabled' : ''}`}>
                <input
                    type="text"
                    name="ci"
                    value={employee.ci}
                    onChange={handleChange}
                    placeholder="CI"
                    required
                    readOnly={isEditing}
                />
            </div>
            <div className={`input-group ${isEditing ? 'disabled' : ''}`}>
                <input
                    type="text"
                    name="department"
                    value={employee.department}
                    onChange={handleChange}
                    placeholder="Departamento"
                    required
                    readOnly={isEditing}
                />
            </div>
            <div className="input-group">
                <input
                    type="text"
                    name="checkIn"
                    value={employee.checkIn}
                    readOnly
                />
            </div>
            <div className="input-group">
                <input
                    type="time"
                    name="checkOut"
                    value={employee.checkOut}
                    onChange={handleChange}
                />
            </div>
            <button type="submit">{isEditing ? 'Actualizar' : 'Registrar'}</button>
        </form>
    );
};

export default EmployeeForm;
