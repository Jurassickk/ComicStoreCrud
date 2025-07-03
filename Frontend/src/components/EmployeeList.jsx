import React from "react";
import { useEmployees } from "../hooks/useEmployees";

function EmployeesList() {
  const {
    employees,
    loading,
    error,
    newEmployee,
    isFormVisible,
    filter,
    handleInputChange,
    handleSubmitEmployee,
    resetEmployeeForm,
    handleDeleteEmployee,
    setIsFormVisible,
    handleFilterChange,
    applyFilter
  } = useEmployees();

  if (loading) {
    return <div className="loading">Loading employees...</div>;
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Reload</button>
      </div>
    );
  }

  return (
    <div className="employees-section">
      <div className="section-header">
        <h2>List of Employees</h2>
        <div className="filter-container" style={{ display: 'flex', gap: '10px' }}>
          <div>
            <input
              type="text"
              placeholder="Search employees"
              value={filter}
              onChange={handleFilterChange}
              style={{ padding: '0.5rem', backgroundColor: '#222', color: '#fff', border: '1px solid #333', borderRadius: '4px' }}
            />
            <button className="filter-btn" onClick={applyFilter} style={{ marginLeft: '5px' }}>
              Filter
            </button>
          </div>
        </div>
        <button
          className="add-btn"
          onClick={() => {
            if (isFormVisible) {
              resetEmployeeForm();
            } else {
              setIsFormVisible(!isFormVisible);
            }
          }}
        >
          {isFormVisible ? "Cancel" : "Add Employee"}
        </button>
      </div>

      {isFormVisible && (
        <div className="form-container">
          <h3>Add New Employee</h3>
          <form onSubmit={handleSubmitEmployee} className="product-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newEmployee.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="rol">Role</label>
                <input
                  type="text"
                  id="rol"
                  name="rol"
                  value={newEmployee.rol}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group checkbox-group">
                <label htmlFor="status">
                  <input
                    type="checkbox"
                    id="status"
                    name="status"
                    checked={newEmployee.status}
                    onChange={handleInputChange}
                  />
                  Active
                </label>
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="submit-btn">
                Add Employee
              </button>
              <button 
                type="button" 
                className="cancel-btn" 
                onClick={(e) => {
                  e.preventDefault();
                  resetEmployeeForm();
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees && employees.length > 0 ? (
              employees.map((employee) => (
                <tr key={employee.employee_id}>
                  <td>{employee.employee_id}</td>
                  <td>{employee.name}</td>
                  <td>{employee.rol}</td>
                  <td>
                    <span className={`status-indicator ${employee.status ? 'active' : 'inactive'}`}>
                      {employee.status ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="delete-btn" 
                        onClick={() => {
                          if (window.confirm(`Are you sure you want to delete employee "${employee.name}"?`)) {
                            handleDeleteEmployee(employee.employee_id);
                          }
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center' }}>
                  No employees available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EmployeesList;