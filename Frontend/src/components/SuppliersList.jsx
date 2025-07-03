import React from "react";
import { useSuppliers } from "../hooks/useSuppliers";

function SuppliersList() {
  const {
    suppliers,
    loading,
    error,
    newSupplier,
    isFormVisible,
    handleInputChange,
    handleSubmitSupplier,
    resetSupplierForm,
    handleDeleteSupplier,
    handleEditSupplier,
    setIsFormVisible,
    isEditing
  } = useSuppliers();

  if (loading) {
    return <div className="loading">Loading suppliers...</div>;
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
    <div className="suppliers-section">
      <div className="section-header">
        <h2>List of Suppliers</h2>
        <button
          className="add-btn"
          onClick={() => {
            if (isFormVisible) {
              resetSupplierForm();
            } else {
              setIsFormVisible(!isFormVisible);
            }
          }}
        >
          {isFormVisible ? "Cancel" : "Add Supplier"}
        </button>
      </div>

      {isFormVisible && (
        <div className="form-container">
          <h3>{isEditing ? "Edit Supplier" : "Add New Supplier"}</h3>
          <form onSubmit={handleSubmitSupplier} className="product-form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={newSupplier.name || ""}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="submit-btn">
                {isEditing ? "Update Supplier" : "Add Supplier"}
              </button>
              <button 
                type="button" 
                className="cancel-btn" 
                onClick={(e) => {
                  e.preventDefault();
                  resetSupplierForm();
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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {suppliers && suppliers.length > 0 ? (
              suppliers.map((supplier) => (
                <tr key={supplier.supplier_id}>
                  <td>{supplier.supplier_id}</td>
                  <td>{supplier.name}</td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="edit-btn" 
                        onClick={() => handleEditSupplier(supplier.supplier_id)}
                      >
                        Edit
                      </button>
                      <button 
                        className="delete-btn" 
                        onClick={() => {
                          if (window.confirm(`Are you sure you want to delete "${supplier.name}"?`)) {
                            handleDeleteSupplier(supplier.supplier_id);
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
                <td colSpan="3" style={{ textAlign: 'center' }}>
                  No suppliers available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SuppliersList;