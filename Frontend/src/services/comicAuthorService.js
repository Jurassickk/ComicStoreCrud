
  const API_BASE_URL = "http://localhost:8080/api/v1";

  export const comicAuthorService = {

    getAllComicAuthors: async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/comic-authors/`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
      } catch (error) {
        console.error("Error fetching comic authors:", error);
        throw error;
      }
    },

    getComicAuthorById: async (id) => {
      try {
        const response = await fetch(`${API_BASE_URL}/comic-authors/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
      } catch (error) {
        console.error("Error fetching comic authors:", error);
        throw error;
      }
    },

    getComicAuthorsByName: async (name) => {
      try {
        const response = await fetch(`${API_BASE_URL}/comic-authors/filter/${name}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
      } catch (error) {
        console.error("Error fetching comic authors by name:", error);
        throw error;
      }
    },

    getComicAuthorsByComic: async (comicId) => {
      try {
        const response = await fetch(`${API_BASE_URL}/comic-authors/comic/${comicId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
      } catch (error) {
        console.error("Error fetching comic authors by comic:", error);
        throw error;
      }
    },

    getComicAuthorsByAuthor: async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/comic-authors/author`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
      } catch (error) {
        console.error("Error fetching comic authors by author:", error);
        throw error;
      }
    },

    addComicAuthor: async (comicAuthor) => {
      try {
        const response = await fetch(`${API_BASE_URL}/comic-authors/anadir`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(comicAuthor),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
      } catch (error) {
        console.error("Error adding comic author:", error);
        throw error;
      }
    },

    updateComicAuthor: async (id, comicAuthor) => {
      try {
        const response = await fetch(`${API_BASE_URL}/comic-authors/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(comicAuthor),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
      } catch (error) {
        console.error("Error updating comic author:", error);
        throw error;
      }
    },

    deleteComicAuthor: async (id) => {
      try {
        const response = await fetch(`${API_BASE_URL}/comic-authors/${id}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
      } catch (error) {
        console.error("Error deleting comic author:", error);
        throw error;
      }
    }
  }