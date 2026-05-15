import { useState } from "react";

export const sampleProducts = [
  { id: 1, name: "Apple",  category: "Fruits", price: 1.00, status: "In Stock" },
  { id: 2, name: "Milk",   category: "Dairy",  price: 2.50, status: "Out of Stock" },
];

export default function App() {
  const [darkMode, setDarkMode]     = useState(false);
  const [category, setCategory]     = useState("all");
  const [cart, setCart]             = useState([]);

  const filtered = category === "all"
    ? sampleProducts
    : sampleProducts.filter(p => p.category === category);

  const addToCart = (product) => {
    if (!cart.find(i => i.id === product.id)) {
      setCart(prev => [...prev, product]);
    }
  };

  return (
    <div>
      <h1>🛒 Shopping App</h1>

      <button onClick={() => setDarkMode(prev => !prev)}>
        Toggle {darkMode ? "Light" : "Dark"} Mode
      </button>

      <label>Filter by Category: </label>
      <select value={category} onChange={e => setCategory(e.target.value)}>
        <option value="all">All</option>
        <option value="Fruits">Fruits</option>
        <option value="Dairy">Dairy</option>
      </select>

      <div>
        <h2>Available Products</h2>
        {filtered.length === 0
          ? <p>No products available</p>
          : filtered.map(product => (
            <div key={product.id} className={`card ${product.status === "Out of Stock" ? "outOfStock" : ""}`}>
              <h3>{product.name}</h3>
              <p>Price: ${product.price.toFixed(2)}</p>
              <p>Status: {product.status}</p>
              <button
                data-testid={`product-${product.id}`}
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          ))
        }
      </div>

      {cart.length > 0 && (
        <div>
          <h2>Shopping Cart</h2>
          {cart.map(item => (
            <p key={item.id}>{item.name} is in your cart</p>
          ))}
        </div>
      )}
    </div>
  );
}