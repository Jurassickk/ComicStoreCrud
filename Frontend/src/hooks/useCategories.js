import { useState, useEffect, useCallback } from 'react';
import { categoryService } from '../services/categoryService';

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newCategory, setNewCategory] = useState({
    category_id: null,
    name: ""
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Cargar categorías
  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      const data = await categoryService.getAllCategories();
      setCategories(data);
      setError(null);
      
      // Emitir evento para notificar a otros componentes sobre el cambio en categorías
      globalEventEmitter.emit('categoriesUpdated', data);
    } catch (err) {
      setError(err.message || "Error al cargar las categorías");
      console.error("Error fetching categories:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Cargar al inicio
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCategory({
      ...newCategory,
      [name]: value,
    });
  };

  // Resetear formulario
  const resetCategoryForm = () => {
    setNewCategory({
      category_id: null,
      name: ""
    });
    setIsFormVisible(false);
    setIsEditing(false);
  };

  // Enviar formulario (agregar o actualizar)
  const handleSubmitCategory = async (e) => {
    e.preventDefault();
    
    // Evitar múltiples envíos simultáneos
    if (isSubmitting) {
      return false;
    }
    
    try {
      setIsSubmitting(true);
      setError(null);
      
      // Mostrar feedback visual inmediato
      await new Promise(r => setTimeout(r, 100));
      
      const categoryData = {
        name: newCategory.name
      };
      
      if (isEditing && newCategory.category_id) {
        await categoryService.updateCategory(newCategory.category_id, categoryData);
      } else {
        await categoryService.addCategory(categoryData);
      }
      
      await fetchCategories();
      resetCategoryForm();
      return true;
    } catch (err) {
      console.error("Error saving category:", err);
      setError(err.message || (isEditing ? "Error al actualizar la categoría" : "Error al crear la categoría"));
      return false;
    } finally {
      // Añadir pequeño retraso para UX
      setTimeout(() => {
        setIsSubmitting(false);
      }, 500);
    }
  };

  // Editar categoría
  const handleEditCategory = (category) => {
    if (!category) {
      setError("La categoría no existe");
      return;
    }
    
    setNewCategory({
      category_id: category.category_id,
      name: category.name
    });
    
    setIsFormVisible(true);
    setIsEditing(true);
  };

  // Eliminar categoría
  const handleDeleteCategory = async (id) => {
    if (!id) {
      setError("ID de categoría inválido");
      return;
    }
    
    try {
      setIsSubmitting(true);
      await categoryService.deleteCategory(id);
      await fetchCategories();
    } catch (err) {
      console.error("Error deleting category:", err);
      setError(err.message || "Error al eliminar la categoría");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    categories,
    loading,
    error,
    newCategory,
    isEditing,
    isFormVisible,
    isSubmitting,
    fetchCategories,
    handleInputChange,
    handleSubmitCategory,
    resetCategoryForm,
    handleEditCategory,
    handleDeleteCategory,
    setIsFormVisible,
    setIsEditing,
  };
};