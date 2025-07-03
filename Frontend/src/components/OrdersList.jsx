import React, { useState, useEffect } from "react";
import { useOrders } from "../hooks/useOrders";
import { useSuppliers } from "../hooks/useSuppliers";

function OrdersList() {
  const {
    orders,
    loading,
    error,
    newOrder,
    isFormVisible,
    handleInputChange,
    handleSubmitOrder,
    resetOrderForm,
    handleDeleteOrder,
    handleEditOrder,
    setIsFormVisible,
    fetchOrdersBySupplier,
    fetchOrdersByComic,
    fetchOrders,
    isEditing
  } = useOrders();

  const { suppliers, loading: suppliersLoading } = useSuppliers();
  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [selectedComic, setSelectedComic] = useState("");
  const [comics, setComics] = useState([]);

  // Simulación de obtención de cómics (reemplazar con datos reales)
  useEffect(() => {
    // Aquí deberías cargar los cómics desde tu API
    setComics([
      { comic_id: 1, title: "Comic 1" },
      { comic_id: 2, title: "Comic 2" },
      { comic_id: 3, title: "Comic 3" }
    ]);
  }, []);

  if (loading) {
    return <div className="loading">Loading orders...</div>;
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

  const handleSupplierFilter = () => {
    if (selectedSupplier) {
      fetchOrdersBySupplier(selectedSupplier);
    } else {
      fetchOrders();
    }
  };

  const handleComicFilter = () => {
    if (selectedComic) {
      fetchOrdersByComic(selectedComic);
    } else {
      fetchOrders();
    }
  };

  return (
    <div className="orders-section">
      <div className="section-header">
        <h2>List of Orders</h2>
        <div className="filter-container" style={{ display: 'flex', gap: '10px' }}>
          <div>
            <select
              value={selectedSupplier}
              onChange={(e) => setSelectedSupplier(e.target.value)}
              style={{ padding: '0.5rem', backgroundColor: '#222', color: '#fff', border: '1px solid #333', borderRadius: '4px' }}
            >
              <option value="">All Suppliers</option>
              {!suppliersLoading &&
                suppliers.map((supplier) => (
                  <option key={supplier.supplier_id} value={supplier.supplier_id}>
                    {supplier.name}
                  </option>
                ))}
            </select>
            <button className="add-btn" onClick={handleSupplierFilter} style={{ marginLeft: '5px' }}>
              Filter
            </button>
          </div>
          <div>
            <select
              value={selectedComic}
              onChange={(e) => setSelectedComic(e.target.value)}
              style={{ padding: '0.5rem', backgroundColor: '#222', color: '#fff', border: '1px solid #333', borderRadius: '4px' }}
            >
              <option value="">All Comics</option>
              {comics.map((comic) => (
                <option key={comic.comic_id} value={comic.comic_id}>
                  {comic.title}
                </option>
              ))}
            </select>
            <button className="add-btn" onClick={handleComicFilter} style={{ marginLeft: '5px' }}>
              Filter
            </button>
          </div>
        </div>
        <button
          className="add-btn"
          onClick={() => {
            if (isFormVisible) {
              resetOrderForm();
            } else {
              setIsFormVisible(!isFormVisible);
            }
          }}
        >
          {isFormVisible ? "Cancel" : "Add Order"}
        </button>
      </div>

      {isFormVisible && (
        <div className="form-container">
          <h3>{isEditing ? "Edit Order" : "Add New Order"}</h3>
          <form onSubmit={handleSubmitOrder} className="product-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="supplier_id">Supplier</label>
                <select
                  id="supplier_id"
                  name="supplier_id"
                  value={newOrder.supplier_id || ""}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select a supplier</option>
                  {!suppliersLoading &&
                    suppliers.map((supplier) => (
                      <option key={supplier.supplier_id} value={supplier.supplier_id}>
                        {supplier.name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="comic_id">Comic</label>
                <select
                  id="comic_id"
                  name="comic_id"
                  value={newOrder.comic_id || ""}
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
            </div>

            <div className="form-actions">
              <button type="submit" className="submit-btn">
                {isEditing ? "Update Order" : "Add Order"}
              </button>
              <button 
                type="button" 
                className="cancel-btn" 
                onClick={(e) => {
                  e.preventDefault();
                  resetOrderForm();
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
              <th>Order ID</th>
              <th>Supplier</th>
              <th>Comic</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders && orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order.order_id}>
                  <td>{order.order_id}</td>
                  <td>{order.supplier ? order.supplier.name : "-"}</td>
                  <td>{order.comic_id ? order.comic_id.title || `Comic #${order.comic_id.comic_id}` : "-"}</td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="edit-btn" 
                        onClick={() => handleEditOrder(order.order_id)}
                      >
                        Edit
                      </button>
                      <button   
                        className="delete-btn" 
                        onClick={() => {
                          if (window.confirm(`Are you sure you want to delete order #${order.order_id}?`)) {
                            handleDeleteOrder(order.order_id);
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
                  No orders available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrdersList;