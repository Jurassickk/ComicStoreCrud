import React from "react";
import { useEditorials } from "../hooks/useEditorials";

function EditorialsList() {
  const {
    editorials,
    loading,
    error,
    newEditorial,
    isEditing,
    isFormVisible,
    filterType,
    filterValue,
    handleInputChange,
    handleSubmitEditorial,
    handleUpdateEditorial,
    prepareForEdit,
    resetEditorialForm,
    handleDeleteEditorial,
    setIsFormVisible,
    handleFilterTypeChange,
    handleFilterValueChange,
    applyFilter
  } = useEditorials();

  const handleSubmit = (e) => {
    if (isEditing) {
      handleUpdateEditorial(e);
    } else {
      handleSubmitEditorial(e);
    }
  };

  if (loading) {
    return <div className="loading">Loading editorials...</div>;
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
    <div className="editorials-section">
      <div className="section-header">
        <h2>List of Editorials</h2>
        <div className="filter-container" style={{ display: 'flex', gap: '10px' }}>
          <div>
            <select
              value={filterType}
              onChange={(e) => handleFilterTypeChange(e.target.value)}
              style={{ padding: '0.5rem', backgroundColor: '#222', color: '#fff', border: '1px solid #333', borderRadius: '4px' }}
            >
              <option value="name">By Name</option>
              <option value="country">By Country</option>
              <option value="ordered">Ordered by Name</option>
            </select>
          </div>
          
          {filterType !== "ordered" && (
            <div>
              <input
                type="text"
                placeholder={filterType === "name" ? "Search by name" : "Search by country"}
                value={filterValue}
                onChange={handleFilterValueChange}
                style={{ padding: '0.5rem', backgroundColor: '#222', color: '#fff', border: '1px solid #333', borderRadius: '4px' }}
              />
            </div>
          )}
          
          <button className="filter-btn" onClick={applyFilter}>
            Apply Filter
          </button>
        </div>
        <button
          className="add-btn"
          onClick={() => {
            if (isFormVisible) {
              resetEditorialForm();
            } else {
              setIsFormVisible(!isFormVisible);
            }
          }}
        >
          {isFormVisible ? "Cancel" : "Add Editorial"}
        </button>
      </div>

      {isFormVisible && (
        <div className="form-container">
          <h3>{isEditing ? "Edit Editorial" : "Add New Editorial"}</h3>
          <form onSubmit={handleSubmit} className="product-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newEditorial.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="country">Country</label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={newEditorial.country}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="submit-btn">
                {isEditing ? "Update Editorial" : "Add Editorial"}
              </button>
              <button 
                type="button" 
                className="cancel-btn" 
                onClick={(e) => {
                  e.preventDefault();
                  resetEditorialForm();
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
              <th>Country</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {editorials && editorials.length > 0 ? (
              editorials.map((editorial) => (
                <tr key={editorial.editorialId}>
                  <td>{editorial.editorialId}</td>
                  <td>{editorial.name}</td>
                  <td>{editorial.country}</td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="edit-btn" 
                        onClick={() => prepareForEdit(editorial)}
                      >
                        Edit
                      </button>
                      <button 
                        className="delete-btn" 
                        onClick={() => {
                          if (window.confirm(`Are you sure you want to delete editorial "${editorial.name}"?`)) {
                            handleDeleteEditorial(editorial.editorialId);
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
                <td colSpan="4" style={{ textAlign: 'center' }}>
                  No editorials available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EditorialsList;