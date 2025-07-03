import { useState, useEffect } from 'react';
import { seriesService } from '../services/seriesService';

export const useSeries = () => {
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newSeries, setNewSeries] = useState({
    serie_id: null,
    name: "",
    description: ""
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [filter, setFilter] = useState("");

  // Cargar series
  const fetchSeries = async () => {
    try {
      setLoading(true);
      const data = await seriesService.getAllSeries();
      setSeries(data);
      setError(null);
    } catch (err) {
      setError("Error al cargar las series");
      console.error("Error fetching series:", err);
    } finally {
      setLoading(false);
    }
  };

  // Obtener series por ID
  const fetchSeriesById = async (id) => {
    try {
      setLoading(true);
      const data = await seriesService.getSeriesById(id);
      if (data) {
        return data;
      } else {
        setError("Serie no encontrada");
        return null;
      }
    } catch (err) {
      setError("Error al obtener la serie");
      console.error(`Error fetching series ${id}:`, err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Filtrar series
  const fetchSeriesByFilter = async (filterValue) => {
    try {
      setLoading(true);
      const data = await seriesService.getSeriesByNameOrDescription(filterValue);
      setSeries(data);
      setError(null);
    } catch (err) {
      setError("Error al filtrar las series");
      console.error("Error filtering series:", err);
    } finally {
      setLoading(false);
    }
  };

  // Obtener series ordenadas
  const fetchSeriesOrdered = async () => {
    try {
      setLoading(true);
      const data = await seriesService.getSeriesOrderedByName();
      setSeries(data);
      setError(null);
    } catch (err) {
      setError("Error al ordenar las series");
      console.error("Error fetching ordered series:", err);
    } finally {
      setLoading(false);
    }
  };

  // Cargar al inicio
  useEffect(() => {
    fetchSeries();
  }, []);

  // Manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSeries({
      ...newSeries,
      [name]: value,
    });
  };

  // Resetear formulario
  const resetSeriesForm = () => {
    setNewSeries({
      serie_id: null,
      name: "",
      description: ""
    });
    setIsFormVisible(false);
    setIsEditing(false);
  };

  // Cargar datos para editar
  const handleEditSeries = async (id) => {
    try {
      const seriesData = await seriesService.getSeriesById(id);
      if (seriesData) {
        setNewSeries({
          serie_id: seriesData.serieId,
          name: seriesData.name,
          description: seriesData.description || ""
        });
        setIsEditing(true);
        setIsFormVisible(true);
      } else {
        setError("Serie no encontrada");
      }
    } catch (err) {
      console.error(`Error fetching series ${id} for edit:`, err);
      setError("Error al cargar la serie para editar");
    }
  };

  // Enviar formulario (agregar o actualizar)
  const handleSubmitSeries = async (e) => {
    e.preventDefault();
    try {
      const seriesData = {
        name: newSeries.name,
        description: newSeries.description
      };
      
      if (isEditing && newSeries.serie_id) {
        await seriesService.updateSeries(newSeries.serie_id, seriesData);
      } else {
        await seriesService.addSeries(seriesData);
      }
      
      await fetchSeries();
      resetSeriesForm();
      return true;
    } catch (err) {
      console.error("Error saving series:", err);
      setError(isEditing ? "Error al actualizar la serie" : "Error al crear la serie");
      return false;
    }
  };

  // Eliminar serie
  const handleDeleteSeries = async (id) => {
    if (!id) {
      setError("ID de serie inválido");
      return;
    }
    
    try {
      await seriesService.deleteSeries(id);
      await fetchSeries();
    } catch (err) {
      console.error("Error deleting series:", err);
      setError("Error al eliminar la serie");
    }
  };

  // Manejar cambio de filtro
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  // Aplicar filtro
  const applyFilter = () => {
    if (filter.trim() !== "") {
      fetchSeriesByFilter(filter);
    } else {
      fetchSeries();
    }
  };

  return {
    series,
    loading,
    error,
    newSeries,
    isEditing,
    isFormVisible,
    filter,
    fetchSeries,
    fetchSeriesById,
    fetchSeriesOrdered,
    handleInputChange,
    handleSubmitSeries,
    handleEditSeries,
    resetSeriesForm,
    handleDeleteSeries,
    setIsFormVisible,
    handleFilterChange,
    applyFilter
  };
};