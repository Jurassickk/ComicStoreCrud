import React from "react";
import { useComics } from "../hooks/useComics";
import { useEditorials } from "../hooks/useEditorials";

function ComicsList() {
  const {
    comics,
    loading,
    error,
    newComic,
    isEditing,
    isFormVisible,
    filterType,
    minPrice,
    maxPrice,
    editorialId,
    serieId,
    publicationDate,
    handleInputChange,
    handleSubmitComic,
    handleUpdateComic,
    prepareForEdit,
    resetComicForm,
    handleDeleteComic,
    setIsFormVisible,
    handleFilterTypeChange,
    handleMinPriceChange,
    handleMaxPriceChange,
    handleEditorialIdChange,
    handleSerieIdChange,
    handlePublicationDateChange,
    applyFilter
  } = useComics();

  const { editorials, loading: editorialsLoading } = useEditorials();
  const [series, setSeries] = React.useState([]);

  // Simulación de obtención de series (reemplazar con datos reales)
  React.useEffect(() => {
    // Aquí deberías cargar las series desde tu API
    setSeries([
      { serieId: 1, name: "Serie 1" },
      { serieId: 2, name: "Serie 2" },
      { serieId: 3, name: "Serie 3" }
    ]);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      handleUpdateComic(e);
    } else {
      handleSubmitComic(e);
    }
  };

  if (loading) {
    return <div className="loading">Loading comics...</div>;
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
    <div className="comics-section">
      <div className="section-header">
        <h2>List of Comics</h2>
        <div className="filter-container" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <div>
            <select
              value={filterType}
              onChange={(e) => handleFilterTypeChange(e.target.value)}
              style={{ padding: '0.5rem', backgroundColor: '#222', color: '#fff', border: '1px solid #333', borderRadius: '4px' }}
            >
              <option value="all">All Comics</option>
              <option value="stock">In Stock</option>
              <option value="priceRange">Price Range</option>
              <option value="editorial">By Editorial</option>
              <option value="serie">By Serie</option>
              <option value="date">By Publication Date</option>
            </select>
          </div>

          {filterType === "priceRange" && (
            <div style={{ display: 'flex', gap: '5px' }}>
              <input
                type="number"
                placeholder="Min price"
                value={minPrice}
                onChange={handleMinPriceChange}
                style={{ padding: '0.5rem', backgroundColor: '#222', color: '#fff', border: '1px solid #333', borderRadius: '4px' }}
              />
              <input
                type="number"
                placeholder="Max price"
                value={maxPrice}
                onChange={handleMaxPriceChange}
                style={{ padding: '0.5rem', backgroundColor: '#222', color: '#fff', border: '1px solid #333', borderRadius: '4px' }}
              />
            </div>
          )}

          {filterType === "editorial" && (
            <select
              value={editorialId}
              onChange={handleEditorialIdChange}
              style={{ padding: '0.5rem', backgroundColor: '#222', color: '#fff', border: '1px solid #333', borderRadius: '4px' }}
            >
              <option value="">Select Editorial</option>
              {!editorialsLoading &&
                editorials.map((editorial) => (
                  <option key={editorial.editorialId} value={editorial.editorialId}>
                    {editorial.name}
                  </option>
                ))}
            </select>
          )}

          {filterType === "serie" && (
            <select
              value={serieId}
              onChange={handleSerieIdChange}
              style={{ padding: '0.5rem', backgroundColor: '#222', color: '#fff', border: '1px solid #333', borderRadius: '4px' }}
            >
              <option value="">Select Serie</option>
              {series.map((serie) => (
                <option key={serie.serieId} value={serie.serieId}>
                  {serie.name}
                </option>
              ))}
            </select>
          )}

          {filterType === "date" && (
            <input
              type="date"
              value={publicationDate}
              onChange={handlePublicationDateChange}
              style={{ padding: '0.5rem', backgroundColor: '#222', color: '#fff', border: '1px solid #333', borderRadius: '4px' }}
            />
          )}

          <button className="filter-btn" onClick={applyFilter}>
            Apply Filter
          </button>
        </div>
        <button
          className="add-btn"
          onClick={() => {
            if (isFormVisible) {
              resetComicForm();
            } else {
              setIsFormVisible(!isFormVisible);
            }
          }}
        >
          {isFormVisible ? "Cancel" : "Add Comic"}
        </button>
      </div>

      {isFormVisible && (
        <div className="form-container">
          <h3>{isEditing ? "Edit Comic" : "Add New Comic"}</h3>
          <form onSubmit={handleSubmit} className="product-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={newComic.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="price">Price</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  step="0.01"
                  value={newComic.price}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="stock">Stock</label>
                <input
                  type="number"
                  id="stock"
                  name="stock"
                  value={newComic.stock}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="publication_date">Publication Date</label>
                <input
                  type="date"
                  id="publication_date"
                  name="publication_date"
                  value={newComic.publication_date}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="image">Image URL</label>
                <input
                  type="text"
                  id="image"
                  name="image"
                  value={newComic.image}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="editorial_id">Editorial</label>
                <select
                  id="editorial_id"
                  name="editorial_id"
                  value={newComic.editorial_id || ""}
                  onChange={handleInputChange}
                >
                  <option value="">Select an editorial</option>
                  {!editorialsLoading &&
                    editorials.map((editorial) => (
                      <option key={editorial.editorialId} value={editorial.editorialId}>
                        {editorial.name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="serie_id">Serie</label>
                <select
                  id="serie_id"
                  name="serie_id"
                  value={newComic.serie_id || ""}
                  onChange={handleInputChange}
                >
                  <option value="">Select a serie</option>
                  {series.map((serie) => (
                    <option key={serie.serieId} value={serie.serieId}>
                      {serie.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="submit-btn">
                {isEditing ? "Update Comic" : "Add Comic"}
              </button>
              <button 
                type="button" 
                className="cancel-btn" 
                onClick={(e) => {
                  e.preventDefault();
                  resetComicForm();
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
              <th>Title</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Publication Date</th>
              <th>Editorial</th>
              <th>Serie</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {comics && comics.length > 0 ? (
              comics.map((comic) => (
                <tr key={comic.comicId}>
                  <td>{comic.comicId}</td>
                  <td>{comic.title}</td>
                  <td>${comic.price.toFixed(2)}</td>
                  <td>{comic.stock}</td>
                  <td>{comic.publicationDate}</td>
                  <td>{comic.editorials ? comic.editorials.name : "-"}</td>
                  <td>{comic.serie ? comic.serie.name : "-"}</td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="edit-btn" 
                        onClick={() => prepareForEdit(comic)}
                      >
                        Edit
                      </button>
                      <button 
                        className="delete-btn" 
                        onClick={() => {
                          if (window.confirm(`Are you sure you want to delete comic "${comic.title}"?`)) {
                            handleDeleteComic(comic.comicId);
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
                <td colSpan="8" style={{ textAlign: 'center' }}>
                  No comics available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ComicsList;