const API_BASE_URL = "http://localhost:8080/api/v1";

export const authorService = {
    //obtener todos los autores
    getAllAuthors: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/authors/`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Error fetching authors:", error);
            throw error;
        }
    },

    getAuthorById: async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/authors/${id}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Error fetching authors:", error);
            throw error;
        }
        
    },

    
    getAuthorsByNationality: async (nationality) => {
        try {
            const response = await fetch(`${API_BASE_URL}/authors/nationality/${nationality}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Error fetching authors by nationality:", error);
            throw error;
        }
    },

    addAuthor: async (author) => {
        try {
            const response = await fetch(`${API_BASE_URL}/authors/anadir`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(author),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Error adding author:", error);
            throw error;
        }
    },

    updateAuthor: async (id, author) => {
        try {
            const response = await fetch(`${API_BASE_URL}/authors/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(author),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Error updating author:", error);
            throw error;
        }
    },

    deleteAuthor: async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/authors/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Error deleting author:", error);
            throw error;
        }
    },
    }