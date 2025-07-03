  import { useState, useEffect } from 'react';
  import { EditorialsService } from '../services/EditorialsService';

  export const useEditorials = () => {
    const [editorials, setEditorials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newEditorial, setNewEditorial] = useState({
      editorial_id: null,
      name: "",
      country: ""
    });
    const [isEditing, setIsEditing] = useState(false);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [filterType, setFilterType] = useState("name"); // Puede ser "name", "country" o "ordered"
    const [filterValue, setFilterValue] = useState("");

    // Cargar todas las editoriales
    const fetchEditorials = async () => {
      try {
        setLoading(true);
        const data = await EditorialsService.getAllEditorials();
        setEditorials(data);
        setError(null);
      } catch (err) {
        setError("Error al cargar las editoriales");
        console.error("Error fetching editorials:", err);
      } finally {
        setLoading(false);
      }
    };

    // Obtener editorial por ID
    const fetchEditorialById = async (id) => {
      try {
        setLoading(true);
        const data = await EditorialsService.getEditorialById(id);
        setError(null);
        return data;
      } catch (err) {
        setError("Error al cargar la editorial");
        console.error("Error fetching editorial:", err);
      } finally {
        setLoading(false);
      }
    };

    // Filtrar editoriales por nombre
    const fetchEditorialsByName = async (name) => {
      try {
        setLoading(true);
        const data = await EditorialsService.getEditorialsByName(name);
        setEditorials(data);
        setError(null);
      } catch (err) {
        setError("Error al filtrar las editoriales por nombre");
        console.error("Error filtering editorials by name:", err);
      } finally {
        setLoading(false);
      }
    };

    // Obtener editoriales ordenadas por nombre
    const fetchEditorialsOrderedByName = async () => {
      try {
        setLoading(true);
        const data = await EditorialsService.getEditorialsOrderedByName();
        setEditorials(data);
        setError(null);
      } catch (err) {
        setError("Error al ordenar las editoriales");
        console.error("Error fetching editorials ordered by name:", err);
      } finally {
        setLoading(false);
      }
    };

    // Filtrar editoriales por país
    const fetchEditorialsByCountry = async (country) => {
      try {
        setLoading(true);
        const data = await EditorialsService.getEditorialsByCountry(country);
        setEditorials(data);
        setError(null);
      } catch (err) {
        setError("Error al filtrar las editoriales por país");
        console.error("Error filtering editorials by country:", err);
      } finally {
        setLoading(false);
      }
    };

    // Cargar al inicio
    useEffect(() => {
      fetchEditorials();
    }, []);

    // Manejar cambios en el formulario
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setNewEditorial({
        ...newEditorial,
        [name]: value,
      });
    };

    // Resetear formulario
    const resetEditorialForm = () => {
      setNewEditorial({
        editorial_id: null,
        name: "",
        country: ""
      });
      setIsFormVisible(false);
      setIsEditing(false);
    };

    // Enviar formulario (agregar)
    const handleSubmitEditorial = async (e) => {
      e.preventDefault();
      try {
        const editorialData = {
          name: newEditorial.name,
          country: newEditorial.country
        };
        
        await EditorialsService.addEditorial(editorialData);
        await fetchEditorials();
        resetEditorialForm();
        return true;
      } catch (err) {
        console.error("Error saving editorial:", err);
        setError("Error al crear la editorial");
        return false;
      }
    };

    // Actualizar editorial
    const handleUpdateEditorial = async (e) => {
      e.preventDefault();
      try {
        if (!newEditorial.editorial_id) {
          setError("ID de editorial inválido");
          return false;
        }
        
        const editorialData = {
          name: newEditorial.name,
          country: newEditorial.country
        };
        
        await EditorialsService.updateEditorial(newEditorial.editorial_id, editorialData);
        await fetchEditorials();
        resetEditorialForm();
        return true;
      } catch (err) {
        console.error("Error updating editorial:", err);
        setError("Error al actualizar la editorial");
        return false;
      }
    };

    // Preparar para editar
    const prepareForEdit = (editorial) => {
      setNewEditorial({
        editorial_id: editorial.editorialId,
        name: editorial.name,
        country: editorial.country
      });
      setIsEditing(true);
      setIsFormVisible(true);
    };

    // Eliminar editorial
    const handleDeleteEditorial = async (id) => {
      if (!id) {
        setError("ID de editorial inválido");
        return;
      }
      
      try {
        await EditorialsService.deleteEditorial(id);
        await fetchEditorials();
      } catch (err) {
        console.error("Error deleting editorial:", err);
        setError("Error al eliminar la editorial");
      }
    };

    // Manejar cambio de tipo de filtro
    const handleFilterTypeChange = (type) => {
      setFilterType(type);
    };

    // Manejar cambio de valor de filtro
    const handleFilterValueChange = (e) => {
      setFilterValue(e.target.value);
    };

    // Aplicar filtro
    const applyFilter = () => {
      switch (filterType) {
        case "name":
          if (filterValue.trim() !== "") {
            fetchEditorialsByName(filterValue);
          } else {
            fetchEditorials();
          }
          break;
        case "country":
          if (filterValue.trim() !== "") {
            fetchEditorialsByCountry(filterValue);
          } else {
            fetchEditorials();
          }
          break;
        case "ordered":
          fetchEditorialsOrderedByName();
          break;
        default:
          fetchEditorials();
      }
    };

    return {
      editorials,
      loading,
      error,
      newEditorial,
      isEditing,
      isFormVisible,
      filterType,
      filterValue,
      fetchEditorials,
      fetchEditorialById, 
      handleInputChange,
      handleSubmitEditorial,
      handleUpdateEditorial,
      prepareForEdit,
      resetEditorialForm,
      handleDeleteEditorial,
      setIsFormVisible,
      handleFilterTypeChange,
      handleFilterValueChange,
      applyFilter
    };
  };