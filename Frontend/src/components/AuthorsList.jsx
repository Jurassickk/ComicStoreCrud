import React, { useState } from "react";
import { useAuthors } from "../hooks/useAuthors";

function AuthorsList() {
  const {
    authors,
    loading,
    error,
    newAuthor,
    isFormVisible,
    isEditing,
    filter,
    handleInputChange,
    handleSubmitAuthor,
    handleUpdateAuthor,
    prepareForEdit,
    resetAuthorForm,
    handleDeleteAuthor,
    setIsFormVisible,
    handleFilterChange,
    applyNationalityFilter,
    fetchAuthors
  } = useAuthors();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      handleUpdateAuthor(e);
    } else {
      handleSubmitAuthor(e);
    }
  };

  if (loading) {
    return <div className="loading">Loading authors...</div>;
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
    <div className="authors-section">
      <div className="section-header">
        <h2>List of Authors</h2>
        <div className="filter-container" style={{ display: 'flex', gap: '10px' }}>
          <div>
            <input
              type="text"
              value={filter}
              onChange={handleFilterChange}
              placeholder="Filter by nationality"
              style={{ 
                padding: '0.5rem', 
                backgroundColor: '#222', 
                color: '#fff', 
                border: '1px solid #333', 
                borderRadius: '4px' 
              }}
            />
            <button className="add-btn" onClick={applyNationalityFilter} style={{ marginLeft: '5px' }}>
              Filter
            </button>
            <button className="add-btn" onClick={fetchAuthors} style={{ marginLeft: '5px' }}>
              Reset
            </button>
          </div>
        </div>
        <button
          className="add-btn"
          onClick={() => {
            if (isFormVisible) {
              resetAuthorForm();
            } else {
              setIsFormVisible(!isFormVisible);
            }
          }}
        >
          {isFormVisible ? "Cancel" : "Add Author"}
        </button>
      </div>

      {isFormVisible && (
        <div className="form-container">
          <h3>{isEditing ? "Edit Author" : "Add New Author"}</h3>
          <form onSubmit={handleSubmit} className="author-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newAuthor.name || ""}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="nationality">Nationality</label>
                <input
                  type="text"
                  id="nationality"
                  name="nationality"
                  value={newAuthor.nationality || ""}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="submit-btn">
                {isEditing ? "Update Author" : "Add Author"}
              </button>
              <button 
                type="button" 
                className="cancel-btn" 
                onClick={(e) => {
                  e.preventDefault();
                  resetAuthorForm();
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
              <th>Author ID</th>
              <th>Name</th>
              <th>Nationality</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {authors && authors.length > 0 ? (
              authors.map((author) => (
                <tr key={author.authorId}>
                  <td>{author.authorId}</td>
                  <td>{author.name}</td>
                  <td>{author.nationality}</td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="edit-btn" 
                        onClick={() => prepareForEdit(author)}
                      >
                        Edit
                      </button>
                      <button 
                        className="delete-btn" 
                        onClick={() => {
                          if (window.confirm(`Are you sure you want to delete author ${author.name}?`)) {
                            handleDeleteAuthor(author.authorId);
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
                  No authors available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AuthorsList;