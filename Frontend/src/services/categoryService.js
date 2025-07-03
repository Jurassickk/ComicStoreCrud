const API_BASE_URL = "http://localhost:8080/api/v1";

export const categoryService = {
  // Obtener todas las categorías
  getAllCategories: async () => {
    // Verificamos si podemos hacer la petición
    if (!clientSecurity.canMakeRequest('categories-get-all', 8, 60000)) { // 8 por minuto
      const waitTime = Math.ceil(clientSecurity.getWaitTimeMs() / 1000);
      throw new Error(`Demasiadas solicitudes. Por favor espera ${waitTime} segundos.`);
    }

    try {
      const response = await fetch(`${API_BASE_URL}/categories/`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  },

  // Obtener categoría por ID
  getCategoryById: async (id) => {
    // Verificamos si podemos hacer la petición
    if (!clientSecurity.canMakeRequest(`category-get-${id}`, 10, 60000)) {
      const waitTime = Math.ceil(clientSecurity.getWaitTimeMs() / 1000);
      throw new Error(`Demasiadas solicitudes. Por favor espera ${waitTime} segundos.`);
    }

    try {
      const response = await fetch(`${API_BASE_URL}/categories/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching category ${id}:`, error);
      throw error;
    }
  },

  // Añadir nueva categoría
  addCategory: async (categoryData) => {
    // Verificamos si podemos hacer la petición
    if (!clientSecurity.canMakeRequest('category-add', 3, 60000)) { // 3 por minuto
      const waitTime = Math.ceil(clientSecurity.getWaitTimeMs() / 1000);
      throw new Error(`Demasiadas solicitudes. Por favor espera ${waitTime} segundos.`);
    }

    // Verificar contenido duplicado
    if (clientSecurity.isDuplicate(categoryData)) {
      throw new Error("No puedes enviar exactamente los mismos datos repetidamente.");
    }

    try {
      const response = await fetch(`${API_BASE_URL}/categories/anadir`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(categoryData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error creating category:", error);
      throw error;
    }
  },

  // Eliminar categoría
  deleteCategory: async (id) => {
    // Verificamos si podemos hacer la petición
    if (!clientSecurity.canMakeRequest(`category-delete`, 3, 60000)) {
      const waitTime = Math.ceil(clientSecurity.getWaitTimeMs() / 1000);
      throw new Error(`Demasiadas solicitudes. Por favor espera ${waitTime} segundos.`);
    }

    try {
      const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error deleting category ${id}:`, error);
      throw error;
    }
  },

  // Actualizar categoría
  updateCategory: async (id, categoryData) => {
    // Verificamos si podemos hacer la petición
    if (!clientSecurity.canMakeRequest(`category-update`, 3, 60000)) {
      const waitTime = Math.ceil(clientSecurity.getWaitTimeMs() / 1000);
      throw new Error(`Demasiadas solicitudes. Por favor espera ${waitTime} segundos.`);
    }

    // Verificar contenido duplicado
    if (clientSecurity.isDuplicate({id, ...categoryData})) {
      throw new Error("No puedes enviar exactamente los mismos datos repetidamente.");
    }

    try {
      const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(categoryData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error updating category ${id}:`, error);
      throw error;
    }
  }
};