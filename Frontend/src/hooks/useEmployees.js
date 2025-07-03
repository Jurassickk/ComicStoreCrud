  import { useState, useEffect } from 'react';
  import { employeeService } from '../services/employeesService';

  export const useEmployees = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newEmployee, setNewEmployee] = useState({
      employee_id: null,
      name: "",
      rol: "",
      status: true
    });
    const [isEditing, setIsEditing] = useState(false);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [filter, setFilter] = useState("");

    // Cargar empleados
    const fetchEmployees = async () => {
      try {
        setLoading(true);
        const data = await employeeService.getAllEmployees();
        setEmployees(data);
        setError(null);
      } catch (err) {
        setError("Error al cargar los empleados");
        console.error("Error fetching employees:", err);
      } finally {
        setLoading(false);
      }
    };

    // Filtrar empleados
    const fetchEmployeesByFilter = async (filterValue) => {
      try {
        setLoading(true);
        const data = await employeeService.getEmployeesByFilter(filterValue);
        setEmployees(data);
        setError(null);
      } catch (err) {
        setError("Error al filtrar los empleados");
        console.error("Error filtering employees:", err);
      } finally {
        setLoading(false);
      }
    };

    // Cargar al inicio
    useEffect(() => {
      fetchEmployees();
    }, []);

    // Manejar cambios en el formulario
    const handleInputChange = (e) => {
      const { name, value, type, checked } = e.target;
      setNewEmployee({
        ...newEmployee,
        [name]: type === 'checkbox' ? checked : value,
      });
    };

    // Resetear formulario
    const resetEmployeeForm = () => {
      setNewEmployee({
        employee_id: null,
        name: "",
        rol: "",
        status: true
      });
      setIsFormVisible(false);
      setIsEditing(false);
    };

    // Enviar formulario (agregar)
    const handleSubmitEmployee = async (e) => {
      e.preventDefault();
      try {
        const employeeData = {
          name: newEmployee.name,
          rol: newEmployee.rol,
          status: newEmployee.status
        };
        
        await employeeService.addEmployee(employeeData);
        await fetchEmployees();
        resetEmployeeForm();
        return true;
      } catch (err) {
        console.error("Error saving employee:", err);
        setError("Error al crear el empleado");
        return false;
      }
    };

    // Eliminar empleado
    const handleDeleteEmployee = async (id) => {
      if (!id) {
        setError("ID de empleado inválido");
        return;
      }
      
      try {
        await employeeService.deleteEmployee(id);
        await fetchEmployees();
      } catch (err) {
        console.error("Error deleting employee:", err);
        setError("Error al eliminar el empleado");
      }
    };

    // Manejar cambio de filtro
    const handleFilterChange = (e) => {
      setFilter(e.target.value);
    };

    // Aplicar filtro
    const applyFilter = () => {
      if (filter.trim() !== "") {
        fetchEmployeesByFilter(filter);
      } else {
        fetchEmployees();
      }
    };

    return {
      employees,
      loading,
      error,
      newEmployee,
      isFormVisible,
      filter,
      fetchEmployees,
      handleInputChange,
      handleSubmitEmployee,
      resetEmployeeForm,
      handleDeleteEmployee,
      setIsFormVisible,
      handleFilterChange,
      applyFilter
    };
  };