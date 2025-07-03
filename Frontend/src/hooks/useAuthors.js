import { useState, useEffect } from 'react';
import { authorService } from '../services/authorService';

export const useAuthors = () => {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newAuthor, setNewAuthor] = useState({
    author_id: null,
    name: "",
    nationality: ""
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [filter, setFilter] = useState("");

  // Cargar todos los autores
  const fetchAuthors = async () => {
    try {
      setLoading(true);
      const data = await authorService.getAllAuthors();
      setAuthors(data);
      setError(null);
    } catch (err) {
      setError("Error al cargar los autores");
      console.error("Error fetching authors:", err);
    } finally {
      setLoading(false);
    }
  };

  // Obtener autor por ID
  const fetchAuthorById = async (id) => {
    try {
      setLoading(true);
      const data = await authorService.getAuthorById(id);
      setError(null);
      return data;
    } catch (err) {
      setError("Error al cargar el autor");
      console.error("Error fetching author:", err);
    } finally {
      setLoading(false);
    }
  };

  // Eliminamos las funciones que no están en tu servicio actual

  // Filtrar autores por nacionalidad
  const fetchAuthorsByNationality = async (nationality) => {
    try {
      setLoading(true);
      const data = await authorService.getAuthorsByNationality(nationality);
      setAuthors(data);
      setError(null);
    } catch (err) {
      setError("Error al filtrar los autores por nacionalidad");
      console.error("Error filtering authors by nationality:", err);
    } finally {
      setLoading(false);
    }
  };

  // Cargar al inicio
  useEffect(() => {
    fetchAuthors();
  }, []);

  // Manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAuthor({
      ...newAuthor,
      [name]: value,
    });
  };

  // Resetear formulario
  const resetAuthorForm = () => {
    setNewAuthor({
      author_id: null,
      name: "",
      nationality: ""
    });
    setIsFormVisible(false);
    setIsEditing(false);
  };

  // Enviar formulario (agregar)
  const handleSubmitAuthor = async (e) => {
    e.preventDefault();
    try {
      const authorData = {
        name: newAuthor.name,
        nationality: newAuthor.nationality
      };
      
      await authorService.addAuthor(authorData);
      await fetchAuthors();
      resetAuthorForm();
      return true;
    } catch (err) {
      console.error("Error saving author:", err);
      setError("Error al crear el autor");
      return false;
    }
  };

  // Actualizar autor
  const handleUpdateAuthor = async (e) => {
    e.preventDefault();
    try {
      if (!newAuthor.author_id) {
        setError("ID de autor inválido");
        return false;
      }
      
      const authorData = {
        name: newAuthor.name,
        nationality: newAuthor.nationality
      };
      
      await authorService.updateAuthor(newAuthor.author_id, authorData);
      await fetchAuthors();
      resetAuthorForm();
      return true;
    } catch (err) {
      console.error("Error updating author:", err);
      setError("Error al actualizar el autor");
      return false;
    }
  };

  // Preparar para editar
  const prepareForEdit = (author) => {
    setNewAuthor({
      author_id: author.authorId,
      name: author.name,
      nationality: author.nationality
    });
    setIsEditing(true);
    setIsFormVisible(true);
  };

  // Eliminar autor
  const handleDeleteAuthor = async (id) => {
    if (!id) {
      setError("ID de autor inválido");
      return;
    }
    
    try {
      await authorService.deleteAuthor(id);
      await fetchAuthors();
    } catch (err) {
      console.error("Error deleting author:", err);
      setError("Error al eliminar el autor");
    }
  };

  // Manejar cambio de filtro
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  // Aplicar filtro de nacionalidad
  const applyNationalityFilter = () => {
    if (filter.trim() !== "") {
      fetchAuthorsByNationality(filter);
    } else {
      fetchAuthors();
    }
  };

  return {
    authors,
    loading,
    error,
    newAuthor,
    isEditing,
    isFormVisible,
    filter,
    fetchAuthors,
    fetchAuthorById,
    handleInputChange,
    handleSubmitAuthor,
    handleUpdateAuthor,
    prepareForEdit,
    resetAuthorForm,
    handleDeleteAuthor,
    setIsFormVisible,
    handleFilterChange,
    applyNationalityFilter
  };
};