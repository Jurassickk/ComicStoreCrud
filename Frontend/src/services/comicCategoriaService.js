
const API_BASE_URL = "http://localhost:8080/api/v1";

export const comicCategoriaService = {

  getAllComicCategorias: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/comic-categorias/`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching comic categorias:", error);
      throw error;
    }
  },

  getComicCategoriaById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/comic-categorias/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching comic categorias:", error);
      throw error;
    }
  },

  getComicCategoriasByComic: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/comic-categorias/comic/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching comic categorias by comic:", error);
      throw error;
    }
  },

  getComicCategoriasByCategory: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/comic-categorias/category/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching comic categorias by category:", error);
      throw error;
    }
  },

  addComicCategoria: async (comicCategoria) => {
    try {
      const response = await fetch(`${API_BASE_URL}/comic-categorias/anadir`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(comicCategoria),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error adding comic categoria:", error);
      throw error;
    }
  },

  updateComicCategoria: async (id, comicCategoria) => {
    try {
      const response = await fetch(`${API_BASE_URL}/comic-categorias/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(comicCategoria),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error updating comic categoria:", error);
      throw error;
    }
  },

  deleteComicCategoria: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/comic-categorias/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error deleting comic categoria:", error);
      throw error;
    }
  }
}