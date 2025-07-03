const API_BASE_URL = "http://localhost:8080/api/v1";

export const EditorialsService = {

  //obtener todos los editoriales 

  getAllEditorials: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/editorials/`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching editorials:", error);
      throw error;
    }
  },

  getEditorialById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/editorials/${id}`);
      if(response.ok){
        if (response.status === 404){
          return null;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching editorials ${id}:", error);
      throw error;
    }
  },

  getEditorialsByName: async (name) => {
    try {
      const response = await fetch(`${API_BASE_URL}/editorials/filter/${name}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching editorials by name:", error);
      throw error;
    }
  },

  getEditorialsOrderedByName: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/editorials/ordered`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching editorials ordered by name:", error);
      throw error;
    }
  },

  getEditorialsByCountry: async (country) => {
    try {
      const response = await fetch(`${API_BASE_URL}/editorials/country/${country}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching editorials by country:", error);
      throw error;
    }
  },

  addEditorial: async (editorial) => {
    try {
      const response = await fetch(`${API_BASE_URL}/editorials/anadir`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editorial),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error adding editorial:", error);
      throw error;
    }
  },

  updateEditorial: async (id, editorial) => {
    try {
      const response = await fetch(`${API_BASE_URL}/editorials/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editorial),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error updating editorial:", error);
      throw error;
    }
  },

  deleteEditorial: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/editorials/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error deleting editorial:", error);
      throw error;
    }
  },
}