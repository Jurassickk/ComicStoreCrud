
const API_BASE_URL = "http://localhost:8080/api/v1";

export const orderService = {
  // Obtener todos los pedidos
  getAllOrders: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders/`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching orders:", error);
      throw error;
    }
  },

  // Obtener pedido por ID
  getOrderById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching order ${id}:`, error);
      throw error;
    }
  },

  // Obtener pedido por ID de usuario
  getOrdersBySupplier: async (supplierId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders/supplier/${supplierId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching orders by supplier ${supplierId}:`, error);
      throw error;
    }
  },

  // Obtener pedido por ID de comic
  getOrdersByComic: async (comicId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders/comic/${comicId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching orders by comic ${comicId}:`, error);
      throw error;
    }

  },

  // Añadir nuevo pedido
  addOrder: async (orderData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders/anadir`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error creating order:", error);
      throw error;
    }
  },

  // Actualizar pedido
  updateOrder: async (id, orderData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error updating order ${id}:`, error);
      throw error;
    }
  },

  // Eliminar pedido
  deleteOrder: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error deleting order ${id}:`, error);
      throw error;
    }
  }
};