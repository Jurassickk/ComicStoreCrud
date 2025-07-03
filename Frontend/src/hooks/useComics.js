import { useState, useEffect } from 'react';
import { comicService } from '../services/comicService';

export const useComics = () => {
  const [comics, setComics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newComic, setNewComic] = useState({
    comic_id: null,
    title: "",
    price: 0,
    stock: 0,
    publication_date: "",
    image: "",
    editorial_id: null,
    serie_id: null
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [filterType, setFilterType] = useState("all"); // Puede ser "all", "stock", "priceRange", "editorial", "serie", "date"
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [editorialId, setEditorialId] = useState("");
  const [serieId, setSerieId] = useState("");
  const [publicationDate, setPublicationDate] = useState("");

  // Cargar todos los cómics
  const fetchComics = async () => {
    try {
      setLoading(true);
      const data = await comicService.getAllComics();
      setComics(data);
      setError(null);
    } catch (err) {
      setError("Error al cargar los cómics");
      console.error("Error fetching comics:", err);
    } finally {
      setLoading(false);
    }
  };

  // Obtener cómic por ID
  const fetchComicById = async (id) => {
    try {
      setLoading(true);
      const data = await comicService.getAllComicsById(id);
      setError(null);
      return data;
    } catch (err) {
      setError("Error al cargar el cómic");
      console.error("Error fetching comic:", err);
    } finally {
      setLoading(false);
    }
  };

  // Obtener cómics en stock
  const fetchComicsInStock = async () => {
    try {
      setLoading(true);
      const data = await comicService.getComicsInStock();
      setComics(data);
      setError(null);
    } catch (err) {
      setError("Error al cargar los cómics en stock");
      console.error("Error fetching comics in stock:", err);
    } finally {
      setLoading(false);
    }
  };

  // Obtener cómics por rango de precio
  const fetchComicsByPriceRange = async (min, max) => {
    try {
      setLoading(true);
      const data = await comicService.getComicsByPriceRange(min, max);
      setComics(data);
      setError(null);
    } catch (err) {
      setError("Error al filtrar los cómics por precio");
      console.error("Error filtering comics by price range:", err);
    } finally {
      setLoading(false);
    }
  };

  // Obtener cómics por editorial
  const fetchComicsByEditorial = async (editorialId) => {
    try {
      setLoading(true);
      const data = await comicService.getComicsByEditorial(editorialId);
      setComics(data);
      setError(null);
    } catch (err) {
      setError("Error al filtrar los cómics por editorial");
      console.error("Error filtering comics by editorial:", err);
    } finally {
      setLoading(false);
    }
  };

  // Obtener cómics por serie
  const fetchComicsBySerie = async (serieId) => {
    try {
      setLoading(true);
      const data = await comicService.getComicsBySerie(serieId);
      setComics(data);
      setError(null);
    } catch (err) {
      setError("Error al filtrar los cómics por serie");
      console.error("Error filtering comics by serie:", err);
    } finally {
      setLoading(false);
    }
  };

  // Obtener cómics publicados después de una fecha
  const fetchComicsPublishedAfterDate = async (date) => {
    try {
      setLoading(true);
      const data = await comicService.getComicsPublishedAfterDate(date);
      setComics(data);
      setError(null);
    } catch (err) {
      setError("Error al filtrar los cómics por fecha de publicación");
      console.error("Error filtering comics by publication date:", err);
    } finally {
      setLoading(false);
    }
  };

  // Cargar al inicio
  useEffect(() => {
    fetchComics();
  }, []);

  // Manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    const newValue = type === 'number' ? parseFloat(value) : value;
    
    setNewComic({
      ...newComic,
      [name]: newValue,
    });
  };

  // Resetear formulario
  const resetComicForm = () => {
    setNewComic({
      comic_id: null,
      title: "",
      price: 0,
      stock: 0,
      publication_date: "",
      image: "",
      editorial_id: null,
      serie_id: null
    });
    setIsFormVisible(false);
    setIsEditing(false);
  };

  // Enviar formulario (agregar)
  const handleSubmitComic = async (e) => {
    e.preventDefault();
    try {
      // Asegúrate de que todos los valores numéricos sean realmente números
      const comicData = {
        title: newComic.title,
        price: parseFloat(newComic.price),
        stock: parseInt(newComic.stock),
        publicationDate: newComic.publication_date,
        image: newComic.image || "",
        // Asegúrate de que el ID de editorial sea un número
        editorials: newComic.editorial_id ? { editorialId: parseInt(newComic.editorial_id) } : null,
        // Asegúrate de que el ID de serie sea un número
        serie: newComic.serie_id ? { serieId: parseInt(newComic.serie_id) } : null
      };
      
      // Agrega logs para depuración
      console.log("Enviando datos al servidor:", JSON.stringify(comicData));
      
      const resultado = await comicService.addComic(comicData);
      console.log("Respuesta del servidor:", resultado);
      
      await fetchComics();
      resetComicForm();
      return true;
    } catch (err) {
      console.error("Error completo al guardar cómic:", err);
      setError("Error al crear el cómic: " + (err.message || "Error desconocido"));
      return false;
    }
  };

  // Actualizar cómic
  const handleUpdateComic = async (e) => {
    e.preventDefault();
    try {
      if (!newComic.comic_id) {
        setError("ID de cómic inválido");
        return false;
      }
      
      // Asegúrate de que todos los valores numéricos sean realmente números
      const comicData = {
        title: newComic.title,
        price: parseFloat(newComic.price),
        stock: parseInt(newComic.stock),
        publicationDate: newComic.publication_date,
        image: newComic.image || "",
        // Asegúrate de que el ID de editorial sea un número
        editorialId: newComic.editorial_id ? parseInt(newComic.editorial_id) : null,
        serieId: newComic.serie_id ? parseInt(newComic.serie_id) : null
      };
      
      // Agrega logs para depuración
      console.log("Enviando datos de actualización:", JSON.stringify(comicData));
      
      const resultado = await comicService.updateComic(newComic.comic_id, comicData);
      console.log("Respuesta del servidor:", resultado);
      
      await fetchComics();
      resetComicForm();
      return true;
    } catch (err) {
      console.error("Error completo al actualizar cómic:", err);
      setError("Error al actualizar el cómic: " + (err.message || "Error desconocido"));
      return false;
    }
  };

  // Preparar para editar
  const prepareForEdit = (comic) => {
    setNewComic({
      comic_id: comic.comicId,
      title: comic.title,
      price: comic.price,
      stock: comic.stock,
      publication_date: comic.publicationDate,
      image: comic.image,
      editorial_id: comic.editorials?.editorialId,
      serie_id: comic.serie?.serieId
    });
    setIsEditing(true);
    setIsFormVisible(true);
  };

  // Eliminar cómic
  const handleDeleteComic = async (id) => {
    if (!id) {
      setError("ID de cómic inválido");
      return;
    }
    
    try {
      await comicService.deleteComic(id);
      await fetchComics();
    } catch (err) {
      console.error("Error deleting comic:", err);
      setError("Error al eliminar el cómic");
    }
  };

  // Manejar cambio de tipo de filtro
  const handleFilterTypeChange = (type) => {
    setFilterType(type);
  };

  // Manejar cambio de precio mínimo
  const handleMinPriceChange = (e) => {
    setMinPrice(e.target.value);
  };

  // Manejar cambio de precio máximo
  const handleMaxPriceChange = (e) => {
    setMaxPrice(e.target.value);
  };

  // Manejar cambio de editorial ID
  const handleEditorialIdChange = (e) => {
    setEditorialId(e.target.value);
  };

  // Manejar cambio de serie ID
  const handleSerieIdChange = (e) => {
    setSerieId(e.target.value);
  };

  // Manejar cambio de fecha de publicación
  const handlePublicationDateChange = (e) => {
    setPublicationDate(e.target.value);
  };

  // Aplicar filtro
  const applyFilter = () => {
    switch (filterType) {
      case "all":
        fetchComics();
        break;
      case "stock":
        fetchComicsInStock();
        break;
      case "priceRange":
        if (minPrice && maxPrice) {
          fetchComicsByPriceRange(minPrice, maxPrice);
        } else {
          setError("Debe proporcionar un rango de precios válido");
        }
        break;
      case "editorial":
        if (editorialId) {
          fetchComicsByEditorial(editorialId);
        } else {
          setError("Debe seleccionar una editorial");
        }
        break;
      case "serie":
        if (serieId) {
          fetchComicsBySerie(serieId);
        } else {
          setError("Debe seleccionar una serie");
        }
        break;
      case "date":
        if (publicationDate) {
          fetchComicsPublishedAfterDate(publicationDate);
        } else {
          setError("Debe proporcionar una fecha válida");
        }
        break;
      default:
        fetchComics();
    }
  };

  return {
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
    fetchComics,
    fetchComicById,
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
  };
};