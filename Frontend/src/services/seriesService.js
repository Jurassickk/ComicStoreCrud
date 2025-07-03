const API_BASE_URL = "http://localhost:8080/api/v1";

export const seriesService = {
  // Obtener todas las series
  getAllSeries: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/series/`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching series:", error);
      throw error;
    }
  },

  // Obtener serie por ID
  getSeriesById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/series/${id}`);
      if (!response.ok) {
        if (response.status === 404) {
          return null; // Manejar caso de serie no encontrada
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching series ${id}:`, error);
      throw error;
    }
  },

  // Filtrar series por nombre o descripción
  getSeriesByNameOrDescription: async (filter) => {
    try {
      const response = await fetch(`${API_BASE_URL}/series/filter/${filter}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error filtering series with '${filter}':`, error);
      throw error;
    }
  },

  // Obtener series ordenadas por nombre
  getSeriesOrderedByName: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/series/ordered`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching ordered series:", error);
      throw error;
    }
  },

  // Añadir nueva serie
  addSeries: async (seriesData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/series/anadir`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(seriesData)
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error creating series:", error);
      throw error;
    }
  },

  // Actualizar serie
  updateSeries: async (id, seriesData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/series/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(seriesData)
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error updating series ${id}:`, error);
      throw error;
    }
  },

  // Eliminar serie
  deleteSeries: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/series/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error deleting series ${id}:`, error);
      throw error;
    }
  }
};