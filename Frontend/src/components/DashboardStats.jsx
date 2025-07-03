import React, { useState, useEffect } from "react";
import { authorService } from "../services/authorService";
import { EditorialsService } from "../services/editorialsService";

function DashboardStats() {
  const [stats, setStats] = useState({
    authors: 0,
    loading: true,
    error: null
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const authors = await authorService.getAllAuthors();
        const editorials = await EditorialsService.getAllEditorials();

        setStats({
          authors: authors.length,
          editorials: editorials.length,
          loading: false,
          error: null
        });
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
        setStats(prevStats => ({
          ...prevStats,
          loading: false,
          error: "Error cargando estadísticas del dashboard"
        }));
      }
    };

    fetchStats();
  }, []);

  if (stats.loading) {
    return <div className="loading">Cargando estadísticas...</div>;
  }

  if (stats.error) {
    return (
      <div className="error-container">
        <h2>Error</h2>
        <p>{stats.error}</p>
        <button onClick={() => window.location.reload()}>Reintentar</button>
      </div>
    );
  }

  return (
    <div className="dashboard-section">
      <h2>Welcome to Comic Universe Management System</h2>
      <p className="dashboard-intro">Here's an overview of your store data:</p>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Authors</h3>
          <p className="stat-value">{stats.authors}</p>
          <p className="stat-label">Registered authors</p>
        </div>
      </div>
        <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Editorials</h3>
          <p className="stat-value">{stats.editorials}</p>
          <p className="stat-label">Registered editorials</p>
        </div>
      </div>
    </div>
  );
}

export default DashboardStats;
