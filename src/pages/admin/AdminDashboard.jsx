export default function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
        <div className="admin-logo">TECHMARKET</div>

        <nav>
          <a href="/admin/dashboard">Dashboard</a>
          <a href="/admin/products">Products</a>
          <a href="/admin/orders">Orders</a>
          <a href="/admin/customers">Customers</a>
          <a href="/admin/categories">Categories</a>
          <a href="/admin/settings">Settings</a>
        </nav>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <div>
            <h1>Dashboard</h1>
            <p>Welcome back to TechMarket.</p>
          </div>

          <div className="admin-user">
            Admin
          </div>
        </header>

        <section className="dashboard-stats">
          <div className="stat-card">
            <span>Total Products</span>
            <strong>0</strong>
          </div>

          <div className="stat-card">
            <span>Total Orders</span>
            <strong>0</strong>
          </div>

          <div className="stat-card">
            <span>Customers</span>
            <strong>0</strong>
          </div>

          <div className="stat-card">
            <span>Revenue</span>
            <strong>€0.00</strong>
          </div>
        </section>

        <section className="dashboard-content">
          <div className="dashboard-card">
            <h2>Recent Orders</h2>
            <p>No orders yet.</p>
          </div>

          <div className="dashboard-card">
            <h2>Inventory</h2>
            <p>Your product inventory will appear here.</p>
          </div>
        </section>
      </main>
    </div>
  );
}
