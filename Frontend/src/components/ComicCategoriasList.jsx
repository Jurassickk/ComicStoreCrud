import React, { useState, useEffect } from "react";
import { useComicCategorias } from "../hooks/useComicCategorias";

function ComicCategoriasList() {
  const {
    comicCategorias,
    loading,
    error,
    newComicCategoria,
    isFormVisible,
    isEditing,
    filterType,
    filterId,
    fetchComicCategorias,
    handleInputChange,
    handleSubmitComicCategoria,
    handleUpdateComicCategoria,
    prepareForEdit,
    resetComicCategoriaForm,
    handleDeleteComicCategoria,
    setIsFormVisible,
    handleFilterTypeChange,
    handleFilterIdChange,
    applyFilter
  } = useComicCategorias();

  // State para guardar los comics y categorías disponibles
  const [comics, setComics] = useState([]);
  const [categories, setCategories] = useState([]);

  // Simulación de obtención de cómics y categorías (reemplazar con datos reales)
  useEffect(() => {
    // Aquí deberías cargar los cómics desde tu API
    setComics([
      { comic_id: 1, title: "Comic 1" },
      { comic_id: 2, title: "Comic 2" },
      { comic_id: 3, title: "Comic 3" }
    ]);

    // Aquí deberías cargar las categorías desde tu API
    setCategories([
      { category_id: 1, name: "Action" },
      { category_id: 2, name: "Adventure" },
      { category_id: 3, name: "Fantasy" }
    ]);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      handleUpdateComicCategoria(e);
    } else {
      handleSubmitComicCategoria(e);
    }
  };

  if (loading) {
    return <div className="loading">Loading comic categories...</div>;
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
    <div className="comic-categorias-section">
      <div className="section-header">
        <h2>List of Comic Categories</h2>
        <div className="filter-container" style={{ display: 'flex', gap: '10px' }}>
          <div>
            <select
              value={filterType}
              onChange={(e) => handleFilterTypeChange(e.target.value)}
              style={{ padding: '0.5rem', backgroundColor: '#222', color: '#fff', border: '1px solid #333', borderRadius: '4px' }}
            >
              <option value="comic">Filter by Comic</option>
              <option value="category">Filter by Category</option>
            </select>
          </div>
          <div>
            {filterType === "comic" ? (
              <select
                value={filterId}
                onChange={handleFilterIdChange}
                style={{ padding: '0.5rem', backgroundColor: '#222', color: '#fff', border: '1px solid #333', borderRadius: '4px' }}
              >
                <option value="">All Comics</option>
                {comics.map((comic) => (
                  <option key={comic.comic_id} value={comic.comic_id}>
                    {comic.title}
                  </option>
                ))}
              </select>
            ) : (
              <select
                value={filterId}
                onChange={handleFilterIdChange}
                style={{ padding: '0.5rem', backgroundColor: '#222', color: '#fff', border: '1px solid #333', borderRadius: '4px' }}
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category.category_id} value={category.category_id}>
                    {category.name}
                  </option>
                ))}
              </select>
            )}
            <button className="add-btn" onClick={applyFilter} style={{ marginLeft: '5px' }}>
              Filter
            </button>
            <button className="add-btn" onClick={fetchComicCategorias} style={{ marginLeft: '5px' }}>
              Reset
            </button>
          </div>
        </div>
        <button
          className="add-btn"
          onClick={() => {
            if (isFormVisible) {
              resetComicCategoriaForm();
            } else {
              setIsFormVisible(!isFormVisible);
            }
          }}
        >
          {isFormVisible ? "Cancel" : "Add Comic Category"}
        </button>
      </div>

      {isFormVisible && (
        <div className="form-container">
          <h3>{isEditing ? "Edit Comic Category" : "Add New Comic Category"}</h3>
          <form onSubmit={handleSubmit} className="comic-categoria-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="comic_id">Comic</label>
                <select
                  id="comic_id"
                  name="comic_id"
                  value={newComicCategoria.comic_id || ""}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select a comic</option>
                  {comics.map((comic) => (
                    <option key={comic.comic_id} value={comic.comic_id}>
                      {comic.title}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="category_id">Category</label>
                <select
                  id="category_id"
                  name="category_id"
                  value={newComicCategoria.category_id || ""}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category.category_id} value={category.category_id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="submit-btn">
                {isEditing ? "Update Comic Category" : "Add Comic Category"}
              </button>
              <button 
                type="button" 
                className="cancel-btn" 
                onClick={(e) => {
                  e.preventDefault();
                  resetComicCategoriaForm();
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
              <th>Comic</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {comicCategorias && comicCategorias.length > 0 ? (
              comicCategorias.map((comicCategoria) => (
                <tr key={comicCategoria.id}>
                  <td>{comicCategoria.id}</td>
                  <td>
                    {comicCategoria.comic ? 
                      (comicCategoria.comic.title || `Comic #${comicCategoria.comic.comicId}`) : 
                      "-"}
                  </td>
                  <td>
                    {comicCategoria.category ? 
                      (comicCategoria.category.name || `Category #${comicCategoria.category.categoryId}`) : 
                      "-"}
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="edit-btn" 
                        onClick={() => prepareForEdit(comicCategoria)}
                      >
                        Edit
                      </button>
                      <button 
                        className="delete-btn" 
                        onClick={() => {
                          if (window.confirm(`Are you sure you want to delete this comic-category relation?`)) {
                            handleDeleteComicCategoria(comicCategoria.id);
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
                  No comic categories available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ComicCategoriasList;