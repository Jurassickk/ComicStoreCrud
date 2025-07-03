
const API_BASE_URL = "http://localhost:8080/api/v1";

export const comicService = {

  getAllComics: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/comics/`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching comics:", error);
      throw error;
    }
  },

  getAllComicsById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/comics/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching comics:", error);
      throw error;
    }
  },

  getComicsInStock: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/comics/stock`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching comics in stock:", error);
      throw error;
    }
  },

  getComicsByPriceRange: async (min, max) => {
    try {
      const response = await fetch(`${API_BASE_URL}/comics/price-range/${min}/${max}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching comics by price range:", error);
      throw error;
    }
  },

  getComicsByEditorial: async (editorialId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/comics/editorial/${editorialId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching comics by editorial:", error);
      throw error;
    }
  },

  getComicsBySerie: async (serieId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/comics/serie/${serieId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching comics by serie:", error);
      throw error;
    }
  },

  getComicsPublishedAfterDate: async (date) => {
    try {
      const response = await fetch(`${API_BASE_URL}/comics/published-after/${date}`); 
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching comics published after date:", error);
      throw error;
    }
  },

  addComic: async (comic) => {
    try {
      const response = await fetch(`${API_BASE_URL}/comics/anadir`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(comic),
      });
      // Maneja los errores de HTTP de manera más detallada
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error en respuesta HTTP:", response.status, errorText);
      throw new Error(`Error HTTP ${response.status}: ${errorText}`);
    }
      return await response.json();
    } catch (error) {
      console.error("Error adding comic:", error);
      throw error;
    }
  },

  updateComic: async (id, comic) => {
    try {
      const response = await fetch(`${API_BASE_URL}/comics/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(comic),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error updating comic:", error);
      throw error;
    }
  },

  deleteComic: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/comics/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error deleting comic:", error);
      throw error;
    }
  }
}