import { useState, useEffect } from 'react';
import { comicCategoriaService } from '../services/comicCategoriaService';

export const useComicCategorias = () => {
  const [comicCategorias, setComicCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newComicCategoria, setNewComicCategoria] = useState({
    id: null,
    comic_id: null,
    category_id: null
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [filterType, setFilterType] = useState("comic"); // Puede ser "comic" o "category"
  const [filterId, setFilterId] = useState("");

  // Cargar todas las relaciones comic-categoría
  const fetchComicCategorias = async () => {
    try {
      setLoading(true);
      const data = await comicCategoriaService.getAllComicCategorias();
      setComicCategorias(data);
      setError(null);
    } catch (err) {
      setError("Error al cargar las categorías de cómics");
      console.error("Error fetching comic categorias:", err);
    } finally {
      setLoading(false);
    }
  };

  // Obtener comic-categoría por ID
  const fetchComicCategoriaById = async (id) => {
    try {
      setLoading(true);
      const data = await comicCategoriaService.getComicCategoriaById(id);
      setError(null);
      return data;
    } catch (err) {
      setError("Error al cargar la categoría de cómic");
      console.error("Error fetching comic categoria:", err);
    } finally {
      setLoading(false);
    }
  };

  // Filtrar comic-categorías por cómic
  const fetchComicCategoriasByComic = async (comicId) => {
    try {
      setLoading(true);
      const data = await comicCategoriaService.getComicCategoriasByComic(comicId);
      setComicCategorias(data);
      setError(null);
    } catch (err) {
      setError("Error al filtrar las categorías por cómic");
      console.error("Error filtering comic categorias by comic:", err);
    } finally {
      setLoading(false);
    }
  };

  // Filtrar comic-categorías por categoría
  const fetchComicCategoriasByCategory = async (categoryId) => {
    try {
      setLoading(true);
      const data = await comicCategoriaService.getComicCategoriasByCategory(categoryId);
      setComicCategorias(data);
      setError(null);
    } catch (err) {
      setError("Error al filtrar los cómics por categoría");
      console.error("Error filtering comic categorias by category:", err);
    } finally {
      setLoading(false);
    }
  };

  // Cargar al inicio
  useEffect(() => {
    fetchComicCategorias();
  }, []);

  // Manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewComicCategoria({
      ...newComicCategoria,
      [name]: value,
    });
  };

  // Resetear formulario
  const resetComicCategoriaForm = () => {
    setNewComicCategoria({
      id: null,
      comic_id: null,
      category_id: null
    });
    setIsFormVisible(false);
    setIsEditing(false);
  };

  // Enviar formulario (agregar)
  const handleSubmitComicCategoria = async (e) => {
    e.preventDefault();
    try {
      const comicCategoriaData = {
        comic: { comicId: newComicCategoria.comic_id },
        category: { categoryId: newComicCategoria.category_id }
      };
      
      await comicCategoriaService.addComicCategoria(comicCategoriaData);
      await fetchComicCategorias();
      resetComicCategoriaForm();
      return true;
    } catch (err) {
      console.error("Error saving comic categoria:", err);
      setError("Error al crear la relación cómic-categoría");
      return false;
    }
  };

  // Actualizar comic-categoría
  const handleUpdateComicCategoria = async (e) => {
    e.preventDefault();
    try {
      if (!newComicCategoria.id) {
        setError("ID de relación cómic-categoría inválido");
        return false;
      }
      
      const comicCategoriaData = {
        comic: { comicId: newComicCategoria.comic_id },
        category: { categoryId: newComicCategoria.category_id }
      };
      
      await comicCategoriaService.updateComicCategoria(newComicCategoria.id, comicCategoriaData);
      await fetchComicCategorias();
      resetComicCategoriaForm();
      return true;
    } catch (err) {
      console.error("Error updating comic categoria:", err);
      setError("Error al actualizar la relación cómic-categoría");
      return false;
    }
  };

  // Preparar para editar
  const prepareForEdit = (comicCategoria) => {
    setNewComicCategoria({
      id: comicCategoria.id,
      comic_id: comicCategoria.comic?.comicId,
      category_id: comicCategoria.category?.categoryId
    });
    setIsEditing(true);
    setIsFormVisible(true);
  };

  // Eliminar comic-categoría
  const handleDeleteComicCategoria = async (id) => {
    if (!id) {
      setError("ID de relación cómic-categoría inválido");
      return;
    }
    
    try {
      await comicCategoriaService.deleteComicCategoria(id);
      await fetchComicCategorias();
    } catch (err) {
      console.error("Error deleting comic categoria:", err);
      setError("Error al eliminar la relación cómic-categoría");
    }
  };

  // Manejar cambio de tipo de filtro
  const handleFilterTypeChange = (type) => {
    setFilterType(type);
  };

  // Manejar cambio de ID de filtro
  const handleFilterIdChange = (e) => {
    setFilterId(e.target.value);
  };

  // Aplicar filtro
  const applyFilter = () => {
    if (filterId.trim() !== "") {
      if (filterType === "comic") {
        fetchComicCategoriasByComic(filterId);
      } else if (filterType === "category") {
        fetchComicCategoriasByCategory(filterId);
      }
    } else {
      fetchComicCategorias();
    }
  };

  return {
    comicCategorias,
    loading,
    error,
    newComicCategoria,
    isEditing,
    isFormVisible,
    filterType,
    filterId,
    fetchComicCategorias,
    fetchComicCategoriaById,
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
  };
};