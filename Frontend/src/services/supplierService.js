const API_BASE_URL = "http://localhost:8080/api/v1";

export const supplierService = {
  // Obtener todos los proveedores
  getAllSuppliers: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/suppliers/`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching suppliers:", error);
      throw error;
    }
  },

  // Obtener proveedor por ID
  getSupplierById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/suppliers/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching supplier ${id}:`, error);
      throw error;
    }
  },

  // Añadir nuevo proveedor
  addSupplier: async (supplierData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/suppliers/anadir`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(supplierData)
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error creating supplier:", error);
      throw error;
    }
  },

  // Actualizar proveedor
  updateSupplier: async (id, supplierData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/suppliers/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(supplierData)
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error updating supplier ${id}:`, error);
      throw error;
    }
  },

  // Eliminar proveedor
  deleteSupplier: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/suppliers/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error deleting supplier ${id}:`, error);
      throw error;
    }
  }
};