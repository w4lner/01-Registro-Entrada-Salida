import React, { useState, useEffect } from 'react';

const EmployeeForm = ({ addEmployee, editingEmployee, updateEmployee, isEditing }) => {
    const [employee, setEmployee] = useState({
        name: '',
        ci: '',
        department: '',
        checkIn: '',
        checkOut: ''
    });

    // Al montar el componente, si estamos editando un empleado, cargamos sus datos
    useEffect(() => {
        if (isEditing && editingEmployee) {
            setEmployee(editingEmployee);
        }
    }, [isEditing, editingEmployee]);

    // Función para obtener la hora actual en formato 24 horas
    const getCurrentTime = () => {
        return new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }); // Formato 24 horas sin segundos
    };

    // Al montar el componente, establecer la hora de entrada automáticamente si no estamos editando
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
        setEmployee({ name: '', ci: '', department: '', checkIn: getCurrentTime(), checkOut: '' }); // Resetear el formulario
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
                readOnly={isEditing} // No permitir modificar nombre mientras se edita
            />
            <input
                type="text"
                name="ci"
                value={employee.ci}
                onChange={handleChange}
                placeholder="CI"
                required
                readOnly={isEditing} // No permitir modificar CI mientras se edita
            />
            <input
                type="text"
                name="department"
                value={employee.department}
                onChange={handleChange}
                placeholder="Departamento"
                required
                readOnly={isEditing} // No permitir modificar Departamento mientras se edita
            />
            <input
                type="text"
                name="checkIn"
                value={employee.checkIn}
                readOnly // El campo de entrada de hora sigue siendo no editable
            />
            <input
                type="time"
                name="checkOut"
                value={employee.checkOut}
                onChange={handleChange}

            />
            <button type="submit">{isEditing ? 'Actualizar' : 'Registrar'}</button>
        </form>
    );
};

export default EmployeeForm;
