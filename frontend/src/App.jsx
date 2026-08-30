
import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import CartPage from "./pages/shop/CartPage";
import CheckoutPage from "./pages/shop/CheckoutPage";

const categories = [
  { icon: "💻", name: "Laptopë", slug: "laptopet" },
  { icon: "🖥️", name: "PC & Shtepiza", slug: "pc-shtepiza" },
  { icon: "🖥️", name: "Monitorë", slug: "monitore" },
  { icon: "🖱️", name: "Mouse", slug: "mouse" },
  { icon: "⌨️", name: "Tastiera", slug: "tastiera" },
  { icon: "🎧", name: "Audio", slug: "audio" },
  { icon: "🔌", name: "Kablla & Adapterë", slug: "kablla-adaptere" },
  { icon: "💾", name: "SSD & RAM", slug: "ssd-ram" },
  { icon: "📡", name: "Networking", slug: "networking" },
  { icon: "🎮", name: "Gaming", slug: "gaming" },
  { icon: "📦", name: "Aksesorë", slug: "aksesore" },
];

function ProductCard({ product, addToCart }) {
  return (
    <article className="product-card">
      <div className="product-image-wrap">
        {product.is_featured && (
          <span className="product-badge">ZGJEDHJE</span>
        )}

        <img
          src={"https://techmarket-nrdr.onrender.com" + product.image_url}
          alt={product.name}
          className="product-image"
        />

        <button className="product-wishlist" aria-label="Shto në wishlist">
          ♡
        </button>
      </div>

      <div className="product-info">
        <span className="product-category">{product.category}</span>

        <h3>{product.name}</h3>

        <div className="product-rating">
          ★★★★★ <span>(0)</span>
        </div>

        <div className="product-bottom">
          <div>
            <strong>{Number(product.price).toFixed(2)} €</strong>

            {product.old_price && (
              <del>{Number(product.old_price).toFixed(2)} €</del>
            )}
          </div>

          <button
            className="add-cart"
            onClick={() => addToCart(product)}
            aria-label="Shto në shportë"
          >
            🛒
          </button>
        </div>
      </div>
    </article>
  );
}

function Home() {
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const addToCart = (product) => {
    const saved = JSON.parse(localStorage.getItem("techmarket_cart") || "[]");

    const existing = saved.find((item) => item.id === product.id);

    let updated;

    if (existing) {
      updated = saved.map((item) =>
        item.id === product.id
          ? {
              ...item,
              quantity: Math.min(
                item.quantity + 1,
                item.stock || 99
              ),
            }
          : item
      );
    } else {
      updated = [
        ...saved,
        {
          ...product,
          quantity: 1,
        },
      ];
    }

    localStorage.setItem("techmarket_cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("cartUpdated"));
    alert("Produkti u shtua në shportë.");
  };

  React.useEffect(() => {
    fetch("https://techmarket-nrdr.onrender.com/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Products API error");
        }

        return response.json();
      })
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error("Failed to load products:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="store">
      <div className="topbar">
        <div>🚚 Dërgesë e shpejtë në Kosovë</div>
        <div>🔒 Blerje të sigurta • 💳 Pagesa të sigurta</div>
      </div>

      <header className="header">
        <div className="logo">
          <span className="logo-mark">T</span>
          <span>Tech<span>Market</span></span>
        </div>

        <div className="search">
          <span>⌕</span>
          <input
            type="text"
            placeholder="Kërko produkte në të gjitha kategoritë"
          />
        </div>

        <div className="header-actions">
          <button>♡</button>
          <a href="/cart" className="cart-button">🛒</a>
          <button className="account">♙ <span>Hyr</span></button>
        </div>
      </header>

      <div className="main-navigation">
        <button className="category-button">
          ☰ <span>Kategoritë</span>
        </button>

        <a href="#offers">Ofertat</a>
        <a href="#new">Produktet e reja</a>
        <a href="#popular">Më të kërkuarat</a>
        <a href="#contact">Kontakt</a>

        <div className="nav-right">
          🚚 Dërgesa në Kosovë
        </div>
      </div>

      <main>
        <section className="shop-layout">
          <aside className="category-sidebar">
            <h3>Kategoritë</h3>

            {categories.map((category) => (
              <a href={`/shop/${category.slug}`} key={category.name} className="category-item">
                <span className="category-icon">{category.icon}</span>
                <span>{category.name}</span>
                <span className="arrow">›</span>
              </a>
            ))}
          </aside>

          <section className="hero-area">
            <div className="hero">
              <div className="hero-content">
                <div className="hero-badge">TECHMARKET</div>

                <h1>
                  Teknologjia
                  <br />
                  që të duhet.
                </h1>

                <p>
                  Laptopë, PC, monitorë dhe aksesorë
                  <br />
                  në një vend.
                </p>

                <a href="#products" className="hero-button">
                  BLEJ TANI →
                </a>
              </div>

              <div className="hero-visual">
                <div className="laptop-shape">
                  <div className="laptop-screen">
                    TECH
                    <br />
                    MARKET
                  </div>
                  <div className="laptop-base" />
                </div>
              </div>
            </div>

            <div className="mini-banners">
              <div className="mini-banner banner-one">
                <span>💻</span>
                <div>
                  <small>LAPTOPË</small>
                  <strong>Zgjidh laptopin tënd</strong>
                </div>
              </div>

              <div className="mini-banner banner-two">
                <span>🖥️</span>
                <div>
                  <small>MONITORË</small>
                  <strong>Për punë & gaming</strong>
                </div>
              </div>

              <div className="mini-banner banner-three">
                <span>🎮</span>
                <div>
                  <small>GAMING</small>
                  <strong>Pajisjet gaming</strong>
                </div>
              </div>
            </div>
          </section>
        </section>

        <section className="benefits">
          <div>
            <span>🚚</span>
            <div>
              <strong>Dërgesë e shpejtë</strong>
              <small>Kudo në Kosovë</small>
            </div>
          </div>

          <div>
            <span>🔒</span>
            <div>
              <strong>Pagesë e sigurt</strong>
              <small>Proces i mbrojtur</small>
            </div>
          </div>

          <div>
            <span>🎧</span>
            <div>
              <strong>Kujdes ndaj klientit</strong>
              <small>Jemi këtu për ju</small>
            </div>
          </div>

          <div>
            <span>🏷️</span>
            <div>
              <strong>Oferta të veçanta</strong>
              <small>Çmime konkurruese</small>
            </div>
          </div>
        </section>

        <section className="product-section" id="offers">
          <div className="section-heading">
            <div>
              <span className="eyebrow">OFERTA</span>
              <h2>Ofertat më të mira</h2>
              <p>Zbritje speciale në produkte të zgjedhura.</p>
            </div>
            <a href="/shop/laptopet">Shiko ofertat →</a>
          </div>

          <div className="promo-grid">
            <a href="/shop/laptopet" className="promo-card">
              <span>💻</span>
              <div>
                <small>LAPTOPË</small>
                <strong>Zbritje në laptopë</strong>
                <p>Shiko ofertat →</p>
              </div>
            </a>

            <a href="/shop/gaming" className="promo-card">
              <span>🎮</span>
              <div>
                <small>GAMING</small>
                <strong>Gaming Deals</strong>
                <p>Shiko ofertat →</p>
              </div>
            </a>

            <a href="/shop/monitore" className="promo-card">
              <span>🖥️</span>
              <div>
                <small>MONITORË</small>
                <strong>Oferta në monitorë</strong>
                <p>Shiko ofertat →</p>
              </div>
            </a>
          </div>
        </section>

        <section className="product-section" id="new">
          <div className="section-heading">
            <div>
              <span className="eyebrow">TË REJA</span>
              <h2>Produktet e reja</h2>
              <p>Zbuloni produktet më të fundit në TechMarket.</p>
            </div>

            <a href="/shop/laptopet">Shiko të gjitha →</a>
          </div>

          <div className="product-placeholder">
            <div className="placeholder-icon">✨</div>
            <h3>Produktet e reja do të shfaqen këtu</h3>
            <p>
              Këtu do të shfaqen automatikisht produktet e reja
              nga database.
            </p>
          </div>
        </section>

        <section className="product-section" id="popular">
          <div className="section-heading">
            <div>
              <span className="eyebrow">POPULAR</span>
              <h2>Më të kërkuarat</h2>
              <p>Produktet që klientët kërkojnë më së shumti.</p>
            </div>

            <a href="/shop/gaming">Shiko të gjitha →</a>
          </div>

          <div className="product-placeholder">
            <div className="placeholder-icon">🔥</div>
            <h3>Produktet më të kërkuara</h3>
            <p>
              Këtu do të shfaqen automatikisht produktet më të
              kërkuara nga klientët.
            </p>
          </div>
        </section>

        <section className="product-section" id="products">
          <div className="section-heading">
            <div>
              <span className="eyebrow">TECHMARKET</span>
              <h2>Produktet tona</h2>
              <p>Produktet reale do të shfaqen këtu nga database.</p>
            </div>

            <a href="#">Shiko të gjitha →</a>
          </div>

          {loading ? (
            <div className="product-placeholder">
              <div className="placeholder-icon">⏳</div>
              <h3>Duke ngarkuar produktet...</h3>
            </div>
          ) : products.length > 0 ? (
            <div className="products-grid">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} addToCart={addToCart} />
              ))}
            </div>
          ) : (
            <div className="product-placeholder">
              <div className="placeholder-icon">📦</div>
              <h3>Nuk ka produkte ende</h3>
            </div>
          )}
        </section>

        <section className="category-showcase">
          <div className="section-heading">
            <div>
              <span className="eyebrow">SHOP</span>
              <h2>Bli sipas kategorisë</h2>
            </div>
          </div>

          <div className="category-grid">
            {categories.slice(0, 6).map((category) => (
              <a href={`/shop/${category.slug}`} className="category-card" key={category.name}>
                <span>{category.icon}</span>
                <strong>{category.name}</strong>
                <small>Shiko produktet →</small>
              </a>
            ))}
          </div>
        </section>
      </main>

      <footer id="contact">
        <div className="footer-brand">
          <div className="logo">
            <span className="logo-mark">T</span>
            <span>Tech<span>Market</span></span>
          </div>
          <p>
            Teknologjia që të duhet, në një vend.
          </p>
        </div>

        <div>
          <h4>TechMarket</h4>
          <a href="#">Rreth nesh</a>
          <a href="#">Kontakt</a>
          <a href="#">Kushtet</a>
        </div>

        <div>
          <h4>Ndihmë</h4>
          <a href="#">Dërgesa</a>
          <a href="#">Pagesat</a>
          <a href="#">Kthimet</a>
        </div>
      </footer>
    </div>
  );
}


function CategoryPage({ category }) {
  return (
    <div className="store">
      <div className="topbar">
        <div>🚚 Dërgesë e shpejtë në Kosovë</div>
        <div>🔒 Blerje të sigurta • 💳 Pagesa të sigurta</div>
      </div>

      <header className="header">
        <a href="/" className="logo">
          <span className="logo-mark">T</span>
          <span>Tech<span>Market</span></span>
        </a>

        <div className="search">
          <span>⌕</span>
          <input
            type="text"
            placeholder={`Kërko në ${category.name.toLowerCase()}...`}
          />
        </div>

        <div className="header-actions">
          <button>♡</button>
          <a href="/cart" className="cart-button">🛒</a>
          <button className="account">♙ <span>Hyr</span></button>
        </div>
      </header>

      <div className="main-navigation">
        <a href="/">← Kryefaqja</a>
        <a href="/#products">Produktet</a>
        <a href="/#contact">Kontakt</a>
      </div>

      <main>
        <div className="category-page">
          <div className="breadcrumb">
            <a href="/">TechMarket</a>
            <span>›</span>
            <strong>{category.name}</strong>
          </div>

          <section className="category-hero">
            <div>
              <span className="eyebrow">TECHMARKET / KATEGORI</span>
              <h1>{category.icon} {category.name}</h1>
              <p>
                Shiko produktet më të fundit në kategorinë {category.name}.
              </p>
            </div>
          </section>

          <section className="category-products">
            <div className="section-heading">
              <div>
                <span className="eyebrow">SHOP</span>
                <h2>{category.name}</h2>
              </div>
              <span className="product-count">
                Produktet do të shfaqen këtu
              </span>
            </div>

            <div className="empty-category">
              <div>📦</div>
              <h3>Produktet e kësaj kategorie</h3>
              <p>
                Këtu do të shfaqen automatikisht produktet reale
                nga TechMarket.
              </p>
            </div>
          </section>
        </div>
      </main>

      <footer>
        <div className="footer-brand">
          <div className="logo">
            <span className="logo-mark">T</span>
            <span>Tech<span>Market</span></span>
          </div>
          <p>Teknologjia që të duhet, në një vend.</p>
        </div>

        <div>
          <h4>TechMarket</h4>
          <a href="/">Kryefaqja</a>
          <a href="/#products">Produktet</a>
          <a href="/#contact">Kontakt</a>
        </div>

        <div>
          <h4>Ndihmë</h4>
          <a href="#">Dërgesa</a>
          <a href="#">Pagesat</a>
          <a href="#">Kthimet</a>
        </div>
      </footer>
    </div>
  );
}

function AdminLogin() {
  return <Navigate to="/" replace />;
}

function AdminDashboard() {
  return <Navigate to="/" replace />;
}


function CartPageWrapper() {
  const [cart, setCart] = React.useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("techmarket_cart") || "[]"
      );
    } catch {
      return [];
    }
  });

  React.useEffect(() => {
    const syncCart = () => {
      try {
        setCart(
          JSON.parse(
            localStorage.getItem("techmarket_cart") || "[]"
          )
        );
      } catch {
        setCart([]);
      }
    };

    window.addEventListener("cartUpdated", syncCart);

    return () => {
      window.removeEventListener("cartUpdated", syncCart);
    };
  }, []);

  React.useEffect(() => {
    localStorage.setItem("techmarket_cart", JSON.stringify(cart));
  }, [cart]);

  return <CartPage cart={cart} setCart={setCart} />;
}


function CheckoutPageWrapper() {
  const [cart, setCart] = React.useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("techmarket_cart") || "[]"
      );
    } catch {
      return [];
    }
  });

  React.useEffect(() => {
    const syncCart = () => {
      try {
        setCart(
          JSON.parse(
            localStorage.getItem("techmarket_cart") || "[]"
          )
        );
      } catch {
        setCart([]);
      }
    };

    window.addEventListener("cartUpdated", syncCart);

    return () => {
      window.removeEventListener("cartUpdated", syncCart);
    };
  }, []);

  return <CheckoutPage cart={cart} />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/cart"
          element={
            <CartPageWrapper />
          }
        />

        <Route
          path="/checkout"
          element={
            <CheckoutPageWrapper />
          }
        />

        {categories.map((category) => (
          <Route
            key={category.slug}
            path={`/shop/${category.slug}`}
            element={<CategoryPage category={category} />}
          />
        ))}

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
