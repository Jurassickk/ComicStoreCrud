
const API_BASE_URL = "http://localhost:8080/api/v1";

export const employeeService = {
  
  getAllEmployees: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/employees/`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching employees:", error);
      throw error;
    }
  },

  getEmployeeById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/employees/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching employees:", error);
      throw error;
    }
  },

  getEmployeesByName: async (name) => {
    try {
      const response = await fetch(`${API_BASE_URL}/employees/filter/${name}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching employees by name:", error);
      throw error;
    }
  },

  getEmployeesOrderedByName: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/employees/ordered`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching employees ordered by name:", error);
      throw error;
    }
  },

  addEmployee: async (employee) => {
    try {
      const response = await fetch(`${API_BASE_URL}/employees/anadir`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employee),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error adding employee:", error);
      throw error;
    }
  },

  updateEmployee: async (id, employee) => {
    try {
      const response = await fetch(`${API_BASE_URL}/employees/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employee),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error updating employee:", error);
      throw error;
    }
  },

  deleteEmployee: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/employees/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error deleting employee:", error);
      throw error;
    }
  }
};