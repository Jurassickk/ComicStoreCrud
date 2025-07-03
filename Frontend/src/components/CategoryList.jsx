import React from "react";
import { useCategories } from "../hooks/useCategories";

function CategoryList() {
  const {
    categories,
    loading,
    error,
    newCategory,
    isEditing,
    isFormVisible,
    isSubmitting,
    handleInputChange,
    handleSubmitCategory,
    resetCategoryForm,
    handleEditCategory,
    handleDeleteCategory,
    setIsFormVisible,
  } = useCategories();

  if (loading) {
    return <div className="loading">Cargando categorías...</div>;
  }

  return (
    <div className="categories-section">
      <div className="section-header">
        <h2>Categorías</h2>
        <button
          className="add-btn"
          onClick={() => {
            setIsFormVisible(!isFormVisible);
          }}
          disabled={isSubmitting}
        >
          {isFormVisible && !isEditing ? "Cancelar" : "Añadir Nueva Categoría"}
        </button>
      </div>

      {error && (
        <div className="error-message">
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Reintentar</button>
        </div>
      )}

      {isFormVisible && (
        <div className="form-container">
          <h3>{isEditing ? "Editar Categoría" : "Añadir Nueva Categoría"}</h3>
          <form onSubmit={handleSubmitCategory} className="category-form">
            <div className="form-group">
              <label htmlFor="name">Nombre de categoría</label>
              <input
                type="text"
                id="name"
                name="name"
                value={newCategory.name || ""}
                onChange={handleInputChange}
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="form-actions">
              <button 
                type="submit" 
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Procesando...' : (isEditing ? "Actualizar Categoría" : "Crear Categoría")}
              </button>
              <button 
                type="button" 
                className="cancel-btn" 
                onClick={(e) => {
                  e.preventDefault();
                  resetCategoryForm();
                }}
                disabled={isSubmitting}
              >
                Cancelar
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
              <th>Nombre</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {categories && categories.length > 0 ? (
              categories.map((category) => (
                <tr key={category.category_id}>
                  <td>{category.category_id}</td>
                  <td>{category.name}</td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="edit-btn" 
                        onClick={() => handleEditCategory(category)}
                        disabled={isSubmitting}
                      >
                        Editar
                      </button>
                      <button 
                        className="delete-btn" 
                        onClick={() => {
                          if (window.confirm(`¿Estás seguro de eliminar la categoría "${category.name}"?`)) {
                            handleDeleteCategory(category.category_id);
                          }
                        }}
                        disabled={isSubmitting}
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" style={{ textAlign: 'center' }}>
                  No hay categorías disponibles
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CategoryList;