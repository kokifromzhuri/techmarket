import React from "react";
import { Link, useNavigate } from "react-router-dom";

const API_URL = "https://techmarket-nrdr.onrender.com";

function CartPage({ cart, setCart }) {
  const navigate = useNavigate();

  const updateQuantity = (id, change) => {
    setCart((current) =>
      current
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: Math.max(
                  1,
                  Math.min(item.stock || 99, item.quantity + change)
                ),
              }
            : item
        )
    );
  };

  const removeItem = (id) => {
    setCart((current) => current.filter((item) => item.id !== id));
  };

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  const itemCount = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <div className="store">
        <header className="header">
          <Link to="/" className="logo">
            <span className="logo-mark">T</span>
            <span>Tech<span>Market</span></span>
          </Link>
        </header>

        <main className="cart-page">
          <div className="empty-cart">
            <div className="empty-cart-icon">🛒</div>
            <h1>Shporta është bosh</h1>
            <p>
              Nuk keni ende produkte në shportën tuaj.
            </p>
            <Link to="/" className="checkout-button">
              Vazhdo blerjet →
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="store">
      <header className="header">
        <Link to="/" className="logo">
          <span className="logo-mark">T</span>
          <span>Tech<span>Market</span></span>
        </Link>

        <div className="header-actions">
          <Link to="/" className="continue-shopping">
            ← Vazhdo blerjet
          </Link>
        </div>
      </header>

      <main className="cart-page">
        <div className="breadcrumb">
          <Link to="/">TechMarket</Link>
          <span>›</span>
          <strong>Shporta</strong>
        </div>

        <div className="cart-title">
          <div>
            <span className="eyebrow">TECHMARKET</span>
            <h1>Shporta ime</h1>
          </div>
          <span>{itemCount} produkt{itemCount !== 1 ? "e" : ""}</span>
        </div>

        <div className="cart-layout">
          <section className="cart-items">
            {cart.map((item) => (
              <article className="cart-item" key={item.id}>
                <div className="cart-item-image">
                  <img
                    src={API_URL + item.image_url}
                    alt={item.name}
                  />
                </div>

                <div className="cart-item-details">
                  <span className="product-category">
                    {item.category}
                  </span>

                  <h2>{item.name}</h2>

                  <strong>
                    {Number(item.price).toFixed(2)} €
                  </strong>

                  <div className="cart-item-controls">
                    <div className="quantity-control">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                      >
                        −
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                      >
                        +
                      </button>
                    </div>

                    <button
                      className="remove-cart-item"
                      onClick={() => removeItem(item.id)}
                    >
                      🗑 Fshi
                    </button>
                  </div>
                </div>

                <div className="cart-item-total">
                  {(Number(item.price) * item.quantity).toFixed(2)} €
                </div>
              </article>
            ))}
          </section>

          <aside className="cart-summary">
            <h2>Përmbledhja</h2>

            <div className="summary-row">
              <span>Produktet</span>
              <strong>{total.toFixed(2)} €</strong>
            </div>

            <div className="summary-row">
              <span>Transporti</span>
              <strong>Do të llogaritet</strong>
            </div>

            <div className="summary-divider" />

            <div className="summary-total">
              <span>Totali</span>
              <strong>{total.toFixed(2)} €</strong>
            </div>

            <button
              className="checkout-button full"
              onClick={() => navigate("/checkout")}
            >
              Vazhdo te pagesa →
            </button>

            <p className="secure-note">
              🔒 Pagesë e sigurt
            </p>
          </aside>
        </div>
      </main>
    </div>
  );
}

export default CartPage;
