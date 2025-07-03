import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthorsList from "./AuthorsList";
import CategoryList from "./CategoryList";
import ComicsList from "./ComicsList";
import EditorialsList from "./EditorialsList";
import OrdersList from "./OrdersList";
import SeriesList from "./SeriesList";
import SuppliersList from "./SuppliersList";
import DashboardStats from "./DashboardStats";
import EmployeeList from "./EmployeeList";
import ComicCategoriasList from "./ComicCategoriasList";

function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo">
            <span className="icon">🗿</span>
            <h1>Comic Universe</h1>
          </div>
        </div>  
        <nav className="sidebar-nav">
          <ul>
            <li className={activeTab === "dashboard" ? "active" : ""}>
              <button onClick={() => setActiveTab("dashboard")}>
                <span className="icon">📊</span>
                Dashboard
              </button>
            </li>
            <li className={activeTab === "comics" ? "active" : ""}>
              <button onClick={() => setActiveTab("comics")}>
                <span className="icon">📖</span>
                Comics
              </button>
            </li>
            <li className={activeTab === "editorials" ? "active" : ""}>
              <button onClick={() => setActiveTab("editorials")}>
                <span className="icon">📰</span>
                Editorials
              </button>
            </li>
            <li className={activeTab === "orders" ? "active" : ""}>
              <button onClick={() => setActiveTab("orders")}>
                <span className="icon">📒</span>
                Orders
              </button>
            </li>
            <li className={activeTab === "series" ? "active" : ""}>
              <button onClick={() => setActiveTab("series")}>
                <span className="icon">📚</span>
                Series
              </button>
            </li>
            <li className={activeTab === "categories" ? "active" : ""}>
              <button onClick={() => setActiveTab("categories")}>
                <span className="icon">🏷️</span>
                Categories
              </button>
            </li>
            <li className={activeTab === "authors" ? "active" : ""}>
              <button onClick={() => setActiveTab("authors")}>
                <span className="icon">👤</span>
                Authors
              </button>
            </li>
            <li className={activeTab === "suppliers" ? "active" : ""}>
              <button onClick={() => setActiveTab("suppliers")}>
                <span className="icon">🚚</span>
                Suppliers
              </button>
            </li>
            <li className={activeTab === "employees" ? "active" : ""}>
              <button onClick={() => setActiveTab("employees")}>
                <span className="icon">👥</span>
                Employees
              </button>
            </li>
            <li className={activeTab === "comic-categorias" ? "active" : ""}>
              <button onClick={() => setActiveTab("comic-categorias")}>
                <span className="icon">🏷️</span>
                Comic Categories
              </button>
            </li>
          </ul>
        </nav>
        <div className="sidebar-footer">
          <button onClick={() => navigate("/")} className="back-to-site">
            <span className="icon">🏠</span>
            Back to Site
          </button>
        </div>
      </aside>

      <main className="content">
        <header className="content-header">
          <h1>
            {activeTab === "dashboard" && "Dashboard"}
            {activeTab === "comics" && "Comics Management"}
            {activeTab === "editorials" && "Editorials Management"}
            {activeTab === "orders" && "Orders Management"}
            {activeTab === "series" && "Series Management"}
            {activeTab === "categories" && "Categories Management"}
            {activeTab === "employees" && "Employees Management"}
            {activeTab === "customers" && "Customers Management"}
            {activeTab === "suppliers" && "Suppliers Management"}
            {activeTab === "authors" && "Authors Management"}
            {activeTab === "comic-categorias" && "Comic Categories Management"}
          </h1>
        </header>

        <div className="content-body">
          {activeTab === "dashboard" && <DashboardStats />}
          {activeTab === "comics" && <ComicsList />}
          {activeTab === "editorials" && <EditorialsList />}
          {activeTab === "orders" && <OrdersList />}
          {activeTab === "series" && <SeriesList />}
          {activeTab === "categories" && <CategoryList />}
          {activeTab === "authors" && <AuthorsList />}
          {activeTab === "suppliers" && <SuppliersList />}
          {activeTab === "employees" && (<EmployeeList />)}
          {activeTab === "comic-categorias" && (<ComicCategoriasList />)}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;