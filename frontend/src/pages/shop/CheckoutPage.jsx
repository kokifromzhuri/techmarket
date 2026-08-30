import React from "react";
import { Link, useNavigate } from "react-router-dom";

const API_URL = "https://techmarket-nrdr.onrender.com";

function CheckoutPage({ cart }) {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = React.useState("cash");

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <div className="store">
        <main className="checkout-page">
          <div className="empty-cart">
            <div className="empty-cart-icon">🛒</div>
            <h1>Shporta është bosh</h1>
            <p>Shtoni një produkt para se të vazhdoni.</p>

            <Link to="/" className="checkout-button">
              Vazhdo blerjet →
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (paymentMethod === "card") {
      alert("Pagesa me kartelë do të lidhet me payment gateway.");
      return;
    }

    alert("Porosia do të përpunohet.");
  };

  return (
    <div className="store">
      <header className="header">
        <Link to="/" className="logo">
          <span className="logo-mark">T</span>
          <span>
            Tech<span>Market</span>
          </span>
        </Link>
      </header>

      <main className="checkout-page">
        <div className="breadcrumb">
          <Link to="/">TechMarket</Link>
          <span>›</span>
          <Link to="/cart">Shporta</Link>
          <span>›</span>
          <strong>Pagesa</strong>
        </div>

        <div className="checkout-title">
          <span className="eyebrow">TECHMARKET</span>
          <h1>Përfundo porosinë</h1>
        </div>

        <div className="checkout-layout">

          <form
            className="checkout-form"
            onSubmit={handleSubmit}
          >

            <section className="checkout-section">
              <h2>Informacioni i klientit</h2>

              <div className="form-grid">
                <label>
                  Emri
                  <input
                    required
                    name="first_name"
                    placeholder="Emri"
                  />
                </label>

                <label>
                  Mbiemri
                  <input
                    required
                    name="last_name"
                    placeholder="Mbiemri"
                  />
                </label>

                <label>
                  Email
                  <input
                    required
                    type="email"
                    name="email"
                    placeholder="email@example.com"
                  />
                </label>

                <label>
                  Telefoni
                  <input
                    required
                    name="phone"
                    placeholder="+383..."
                  />
                </label>
              </div>
            </section>

            <section className="checkout-section">
              <h2>Adresa e dërgesës</h2>

              <div className="form-grid">
                <label className="full-field">
                  Adresa
                  <input
                    required
                    name="address"
                    placeholder="Rruga dhe numri"
                  />
                </label>

                <label>
                  Qyteti
                  <input
                    required
                    name="city"
                    placeholder="Prishtinë"
                  />
                </label>

                <label>
                  Shteti
                  <input
                    value="Kosovë"
                    readOnly
                  />
                </label>
              </div>
            </section>

            <section className="checkout-section">
              <h2>Zgjedh mënyrën e pagesës</h2>

              <div className="payment-options">

                <label
                  className={
                    "payment-option payment-card-option" +
                    (paymentMethod === "card" ? " selected" : "")
                  }
                >
                  <input
                    type="radio"
                    name="payment_method"
                    value="card"
                    checked={paymentMethod === "card"}
                    onChange={() => setPaymentMethod("card")}
                  />

                  <span className="payment-option-content">

                    <strong>💳 Paguaj me kartelë</strong>

                    <small>E rekomanduar</small>

                    <span className="card-brands">
                      <span className="visa-brand">
                        VISA
                      </span>

                      <span className="mastercard-brand">
                        Mastercard
                      </span>
                    </span>

                    <span className="card-description">
                      Kryeni pagesën online me kredit apo debit
                      kartelën tuaj bankare.
                    </span>

                  </span>
                </label>

                {paymentMethod === "card" && (
                  <div className="card-payment-panel">

                    <h3>Pagesë me kartelë</h3>

                    <div className="field">
                      <label>
                        Kartelë mbajtësi
                      </label>

                      <input
                        type="text"
                        placeholder="Emri dhe mbiemri"
                        autoComplete="cc-name"
                      />
                    </div>

                    <div className="field">
                      <label>
                        Numri i kartelës
                      </label>

                      <input
                        type="text"
                        placeholder="•••• •••• •••• ••••"
                        inputMode="numeric"
                        autoComplete="cc-number"
                      />
                    </div>

                    <div className="card-fields-row">

                      <div className="field">
                        <label>
                          Data e skadencës
                        </label>

                        <input
                          type="text"
                          placeholder="MM / YY"
                          autoComplete="cc-exp"
                        />
                      </div>

                      <div className="field">
                        <label>
                          CVV2 (CVC2)
                        </label>

                        <input
                          type="password"
                          placeholder="•••"
                          inputMode="numeric"
                          autoComplete="cc-csc"
                        />
                      </div>

                    </div>

                    <div className="secure-note">
                      🔒 Pagesa do të përpunohet në mënyrë
                      të sigurt nga payment gateway.
                    </div>

                  </div>
                )}

                <label
                  className={
                    "payment-option" +
                    (paymentMethod === "cash" ? " selected" : "")
                  }
                >
                  <input
                    type="radio"
                    name="payment_method"
                    value="cash"
                    checked={paymentMethod === "cash"}
                    onChange={() => setPaymentMethod("cash")}
                  />

                  <span>
                    <strong>💵 Para në dorë</strong>

                    <small>
                      Paguani kur ta pranoni porosinë.
                    </small>
                  </span>
                </label>

                <label
                  className={
                    "payment-option" +
                    (
                      paymentMethod === "bank_transfer"
                        ? " selected"
                        : ""
                    )
                  }
                >
                  <input
                    type="radio"
                    name="payment_method"
                    value="bank_transfer"
                    checked={paymentMethod === "bank_transfer"}
                    onChange={() =>
                      setPaymentMethod("bank_transfer")
                    }
                  />

                  <span>
                    <strong>🏦 Transfer bankar</strong>

                    <small>
                      Instruksionet do të shfaqen pas porosisë.
                    </small>
                  </span>
                </label>

              </div>
            </section>

            <button
              className="checkout-button full"
              type="submit"
            >
              {paymentMethod === "card"
                ? `Vazhdo me pagesën — ${total.toFixed(2)} €`
                : `Përfundo porosinë — ${total.toFixed(2)} €`
              }
            </button>

          </form>

          <aside className="checkout-summary">

            <h2>Porosia juaj</h2>

            {cart.map((item) => (
              <div
                className="checkout-product"
                key={item.id}
              >

                <img
                  src={API_URL + item.image_url}
                  alt={item.name}
                />

                <div>
                  <strong>{item.name}</strong>

                  <span>
                    {item.quantity} ×{" "}
                    {Number(item.price).toFixed(2)} €
                  </span>
                </div>

              </div>
            ))}

            <div className="summary-divider" />

            <div className="summary-total">
              <span>Totali</span>

              <strong>
                {total.toFixed(2)} €
              </strong>
            </div>

            <p className="secure-note">
              🔒 Pagesë e sigurt
            </p>

            <button
              className="back-cart"
              type="button"
              onClick={() => navigate("/cart")}
            >
              ← Kthehu te shporta
            </button>

          </aside>

        </div>
      </main>
    </div>
  );
}

export default CheckoutPage;
