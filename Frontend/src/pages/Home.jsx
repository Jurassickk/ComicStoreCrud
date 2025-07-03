  "use client"

  import { useState } from "react"
  import { useNavigate } from "react-router-dom"

  function Home() {
    const navigate = useNavigate()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [products, setProducts] = useState([
      {
        id: 1,
        name: "Batman: Year One",
        category: "Comics",
        price: 19.99,
        image: "https://placehold.co/300x450/333333/ffffff?text=Batman",
      },
      {
        id: 2,
        name: "Naruto Vol. 1",
        category: "Manga",
        price: 12.99,
        image: "https://placehold.co/300x450/333333/ffffff?text=Naruto",
      },
      {
        id: 3,
        name: "Spider-Man Figurine",
        category: "Collectibles",
        price: 34.99,
        image: "https://placehold.co/300x450/333333/ffffff?text=Spider-Man",
      },
      {
        id: 4,
        name: "Watchmen",
        category: "Graphic Novels",
        price: 24.99,
        image: "https://placehold.co/300x450/333333/ffffff?text=Watchmen",
      },
    ])

    const [searchTerm, setSearchTerm] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("All")

    // Get unique categories
    const categories = [
      "All",
      ...new Set(products.filter((product) => product.category).map((product) => product.category)),
    ]

    // Filter products based on search and category
    const filteredProducts = products.filter((product) => {
      // Filter by search term
      const matchesSearch = searchTerm === "" || product.name.toLowerCase().includes(searchTerm.toLowerCase())

      // Filter by category
      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory

      return matchesSearch && matchesCategory
    })

    return (
      <div className="app">
        <header>
          <div className="logo">
            <span className="icon">🗿</span>
            <h1>Comic Universe</h1>
          </div>
          <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </button>
          <div className="nav-actions">
            <button className="admin-btn" onClick={() => navigate("/dashboard")}>
              Admin
            </button>
          </div>
        </header>

        <main>
          {/* Hero Section */}
          <section className="hero">
            <div className="hero-content">
              <h1>Discover Your Next Comic Adventure</h1>
              <p>Premium comics and collectibles for enthusiasts and collectors.</p>
            </div>
          </section>

          {/* Products Section */}
          <section className="products">
            <div className="products-header">
              <h2>Our Collection</h2>
              <div className="filter-container">
                <div className="search-box">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="category-filter">
                  {categories.map((category) => (
                    <button
                      key={category}
                      className={selectedCategory === category ? "active" : ""}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="products-grid">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <div key={product.product_id} className="product-card">
                    <div className="product-image">
                      <img
                        src={product.image || "https://placehold.co/300x450/333333/ffffff?text=No+Image"}
                        alt={product.name}
                        onError={(e) => {
                          e.target.src = "https://placehold.co/300x450/333333/ffffff?text=Error"
                        }}
                      />
                    </div>
                    <div className="product-info">
                      <h3>{product.name}</h3>
                      {product.category && <span className="category-tag">{product.category}</span>}
                      <p className="price">${product.price.toFixed(2)}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-results">
                  <p>No products found matching your criteria.</p>
                </div>
              )}
            </div>
          </section>
        </main>

        <footer>
          <div className="copyright">
            <p>© {new Date().getFullYear()} Comic Universe. All rights reserved.</p>
          </div>
        </footer>
      </div>
    )
  }

  export default Home

