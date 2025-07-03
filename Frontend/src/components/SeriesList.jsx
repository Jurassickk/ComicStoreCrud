import React from "react";
import { useSeries } from "../hooks/useSeries";

function SeriesList() {
  const {
    series,
    loading,
    error,
    newSeries,
    isFormVisible,
    filter,
    handleInputChange,
    handleSubmitSeries,
    resetSeriesForm,
    handleDeleteSeries,
    handleEditSeries,
    setIsFormVisible,
    handleFilterChange,
    applyFilter,
    isEditing,
    fetchSeriesOrdered
  } = useSeries();

  if (loading) {
    return <div className="loading">Loading series...</div>;
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
    <div className="series-section">
      <div className="section-header">
        <h2>List of Series</h2>
        <div className="filter-container">
          <input
            type="text"
            placeholder="Filter series..."
            value={filter}
            onChange={handleFilterChange}
          />
          <button className="add-btn" onClick={applyFilter}>Search</button>
          <button className="add-btn" onClick={fetchSeriesOrdered} style={{ marginLeft: '10px' }}>
            Order by Name
          </button>
        </div>
        <button
          className="add-btn"
          onClick={() => {
            if (isFormVisible) {
              resetSeriesForm();
            } else {
              setIsFormVisible(!isFormVisible);
            }
          }}
        >
          {isFormVisible ? "Cancel" : "Add Series"}
        </button>
      </div>

      {isFormVisible && (
        <div className="form-container">
          <h3>{isEditing ? "Edit Series" : "Add New Series"}</h3>
          <form onSubmit={handleSubmitSeries} className="product-form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={newSeries.name || ""}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                id="description"
                name="description"
                value={newSeries.description || ""}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="submit-btn">
                {isEditing ? "Update Series" : "Add Series"}
              </button>
              <button 
                type="button" 
                className="cancel-btn" 
                onClick={(e) => {
                  e.preventDefault();
                  resetSeriesForm();
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
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {series && series.length > 0 ? (
              series.map((seriesItem) => (
                <tr key={seriesItem.serieId}>
                  <td>{seriesItem.serieId}</td>
                  <td>{seriesItem.name}</td>
                  <td>{seriesItem.description || "-"}</td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="edit-btn" 
                        onClick={() => handleEditSeries(seriesItem.serieId)}
                      >
                        Edit
                      </button>
                      <button 
                        className="delete-btn" 
                        onClick={() => {
                          if (window.confirm(`Are you sure you want to delete "${seriesItem.name}"?`)) {
                            handleDeleteSeries(seriesItem.serieId);
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
                  No series available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SeriesList;