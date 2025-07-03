import { useState, useEffect } from 'react';
import { supplierService } from '../services/supplierService';

export const useSuppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newSupplier, setNewSupplier] = useState({
    supplier_id: null,
    name: ""
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);

  // Cargar proveedores
  const fetchSuppliers = async () => {
    try {
      setLoading(true);
      const data = await supplierService.getAllSuppliers();
      setSuppliers(data);
      setError(null);
    } catch (err) {
      setError("Error al cargar los proveedores");
      console.error("Error fetching suppliers:", err);
    } finally {
      setLoading(false);
    }
  };

  // Obtener proveedor por ID
  const fetchSupplierById = async (id) => {
    try {
      setLoading(true);
      const data = await supplierService.getSupplierById(id);
      return data;
    } catch (err) {
      setError("Error al obtener el proveedor");
      console.error(`Error fetching supplier ${id}:`, err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Cargar al inicio
  useEffect(() => {
    fetchSuppliers();
  }, []);

  // Manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSupplier({
      ...newSupplier,
      [name]: value,
    });
  };

  // Resetear formulario
  const resetSupplierForm = () => {
    setNewSupplier({
      supplier_id: null,
      name: ""
    });
    setIsFormVisible(false);
    setIsEditing(false);
  };

  // Cargar datos para editar
  const handleEditSupplier = async (id) => {
    try {
      const supplierData = await supplierService.getSupplierById(id);
      if (supplierData) {
        setNewSupplier({
          supplier_id: supplierData.supplier_id,
          name: supplierData.name
        });
        setIsEditing(true);
        setIsFormVisible(true);
      } else {
        setError("Proveedor no encontrado");
      }
    } catch (err) {
      console.error(`Error fetching supplier ${id} for edit:`, err);
      setError("Error al cargar el proveedor para editar");
    }
  };

  // Enviar formulario (agregar o actualizar)
  const handleSubmitSupplier = async (e) => {
    e.preventDefault();
    try {
      const supplierData = {
        name: newSupplier.name
      };
      
      if (isEditing && newSupplier.supplier_id) {
        await supplierService.updateSupplier(newSupplier.supplier_id, supplierData);
      } else {
        await supplierService.addSupplier(supplierData);
      }
      
      await fetchSuppliers();
      resetSupplierForm();
      return true;
    } catch (err) {
      console.error("Error saving supplier:", err);
      setError(isEditing ? "Error al actualizar el proveedor" : "Error al crear el proveedor");
      return false;
    }
  };

  // Eliminar proveedor
  const handleDeleteSupplier = async (id) => {
    if (!id) {
      setError("ID de proveedor inválido");
      return;
    }
    
    try {
      await supplierService.deleteSupplier(id);
      await fetchSuppliers();
    } catch (err) {
      console.error("Error deleting supplier:", err);
      setError("Error al eliminar el proveedor");
    }
  };

  return {
    suppliers,
    loading,
    error,
    newSupplier,
    isEditing,
    isFormVisible,
    fetchSuppliers,
    fetchSupplierById,
    handleInputChange,
    handleSubmitSupplier,
    handleEditSupplier,
    resetSupplierForm,
    handleDeleteSupplier,
    setIsFormVisible
  };
};