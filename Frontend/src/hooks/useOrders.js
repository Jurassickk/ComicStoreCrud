import { useState, useEffect } from 'react';
import { orderService } from '../services/orderService';

export const useOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newOrder, setNewOrder] = useState({
    order_id: null,
    supplier_id: null,
    comic_id: null
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);

  // Cargar pedidos
  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null); // Reset error state before fetching
      console.log("Fetching all orders...");
      const data = await orderService.getAllOrders();
      console.log("Orders fetched successfully:", data);
      setOrders(data);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError(`Error al cargar los pedidos: ${err.message || "Error desconocido"}`);
      // Set orders to empty array to prevent using stale data
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  // Obtener pedido por ID
  const fetchOrderById = async (id) => {
    try {
      setLoading(true);
      console.log(`Fetching order with ID: ${id}`);
      const data = await orderService.getOrderById(id);
      return data;
    } catch (err) {
      console.error(`Error fetching order ${id}:`, err);
      setError(`Error al obtener el pedido: ${err.message || "Error desconocido"}`);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Obtener pedidos por proveedor
  const fetchOrdersBySupplier = async (supplierId) => {
    if (!supplierId) {
      setError("ID de proveedor no válido");
      return;
    }
    
    try {
      setLoading(true);
      console.log(`Fetching orders for supplier: ${supplierId}`);
      const data = await orderService.getOrdersBySupplier(supplierId);
      setOrders(data);
      setError(null);
    } catch (err) {
      console.error(`Error fetching orders by supplier ${supplierId}:`, err);
      setError(`Error al obtener los pedidos del proveedor: ${err.message || "Error desconocido"}`);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  // Obtener pedidos por cómic
  const fetchOrdersByComic = async (comicId) => {
    if (!comicId) {
      setError("ID de cómic no válido");
      return;
    }
    
    try {
      setLoading(true);
      console.log(`Fetching orders for comic: ${comicId}`);
      const data = await orderService.getOrdersByComic(comicId);
      setOrders(data);
      setError(null);
    } catch (err) {
      console.error(`Error fetching orders by comic ${comicId}:`, err);
      setError(`Error al obtener los pedidos del cómic: ${err.message || "Error desconocido"}`);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  // Cargar al inicio
  useEffect(() => {
    console.log("Component mounted, fetching orders...");
    fetchOrders();
    
    // Optional: add a cleanup function
    return () => {
      console.log("Component unmounting, cleaning up...");
      // Any cleanup logic here
    };
  }, []);

  // Manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewOrder({
      ...newOrder,
      [name]: value,
    });
  };

  // Resetear formulario
  const resetOrderForm = () => {
    setNewOrder({
      order_id: null,
      supplier_id: null,
      comic_id: null
    });
    setIsFormVisible(false);
    setIsEditing(false);
  };

  // Cargar datos para editar
  const handleEditOrder = async (id) => {
    if (!id) {
      setError("ID de pedido no válido para editar");
      return;
    }
    
    try {
      console.log(`Loading order ${id} for editing`);
      const orderData = await orderService.getOrderById(id);
      
      if (orderData) {
        console.log("Order data loaded for editing:", orderData);
        setNewOrder({
          order_id: orderData.order_id,
          supplier_id: orderData.supplier?.supplier_id || null,
          comic_id: orderData.comic_id?.comic_id || null
        });
        setIsEditing(true);
        setIsFormVisible(true);
      } else {
        setError("Pedido no encontrado");
      }
    } catch (err) {
      console.error(`Error fetching order ${id} for edit:`, err);
      setError(`Error al cargar el pedido para editar: ${err.message || "Error desconocido"}`);
    }
  };

  // Enviar formulario (agregar o actualizar)
  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    
    // Validate form data
    if (!newOrder.supplier_id || !newOrder.comic_id) {
      setError("Por favor complete todos los campos requeridos");
      return false;
    }
    
    try {
      const orderData = {
        supplier_id: newOrder.supplier_id,
        comic_id: newOrder.comic_id
      };
      
      console.log(`${isEditing ? "Updating" : "Creating"} order with data:`, orderData);
      
      if (isEditing && newOrder.order_id) {
        await orderService.updateOrder(newOrder.order_id, orderData);
      } else {
        await orderService.addOrder(orderData);
      }
      
      console.log("Order saved successfully, refreshing orders list");
      await fetchOrders();
      resetOrderForm();
      return true;
    } catch (err) {
      console.error("Error saving order:", err);
      setError(`${isEditing ? "Error al actualizar" : "Error al crear"} el pedido: ${err.message || "Error desconocido"}`);
      return false;
    }
  };

  // Eliminar pedido
  const handleDeleteOrder = async (id) => {
    if (!id) {
      setError("ID de pedido inválido");
      return;
    }
    
    try {
      console.log(`Deleting order with ID: ${id}`);
      await orderService.deleteOrder(id);
      console.log("Order deleted successfully, refreshing orders list");
      await fetchOrders();
    } catch (err) {
      console.error(`Error deleting order ${id}:`, err);
      setError(`Error al eliminar el pedido: ${err.message || "Error desconocido"}`);
    }
  };

  return {
    orders,
    loading,
    error,
    newOrder,
    isEditing,
    isFormVisible,
    fetchOrders,
    fetchOrderById,
    fetchOrdersBySupplier,
    fetchOrdersByComic,
    handleInputChange,
    handleSubmitOrder,
    handleEditOrder,
    resetOrderForm,
    handleDeleteOrder,
    setIsFormVisible,
    // Add this method to clear errors if needed
    clearError: () => setError(null)
  };
};