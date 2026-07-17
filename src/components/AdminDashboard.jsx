import React, { useState, useMemo } from "react";
import { useDatabase } from "../db";
import { translations, formatPrice } from "../i18n";
import { MENU_CATEGORIES, groupItemsByCategory } from "../menuCategories";

export default function AdminDashboard({ language, currency, onLogout }) {
  const {
    menuItems,
    users,
    orders,
    feedbacks,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
    addUser,
    updateUser,
    deleteUser
  } = useDatabase();

  const [activeTab, setActiveTab] = useState("analytics"); // analytics, menu, orders, users, feedback
  const [editingItem, setEditingItem] = useState(null); // Menu item being edited/added
  const [editingUser, setEditingUser] = useState(null); // User being edited/added
  const [showItemModal, setShowItemModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);

  const t = translations[language] || translations.en;

  // Form states for menu items
  const [itemForm, setItemForm] = useState({
    name: "",
    price: "",
    category: "burger",
    description: "",
    image: "",
    prepTime: 15,
    ingredients: "",
    allergens: ""
  });

  // Form states for users
  const [userForm, setUserForm] = useState({
    username: "",
    password: "",
    role: "waiter",
    name: ""
  });

  // Calculate Real-Time Stats from Orders Database
  const stats = useMemo(() => {
    let totalRevenue = 0;
    let completedCount = 0;
    let activeCount = 0;
    let cancelledCount = 0;
    const itemSales = {};

    orders.forEach(order => {
      if (order.status === "Completed" || order.status === "Served") {
        completedCount++;
        order.items.forEach(it => {
          totalRevenue += it.price * it.quantity;
          itemSales[it.name] = (itemSales[it.name] || 0) + it.quantity;
        });
      } else if (order.status === "Cancelled") {
        cancelledCount++;
      } else {
        activeCount++;
        order.items.forEach(it => {
          itemSales[it.name] = (itemSales[it.name] || 0) + it.quantity;
        });
      }
    });

    const sortedSales = Object.entries(itemSales).sort((a, b) => b[1] - a[1]);
    const mostPopular = sortedSales.length > 0 ? `${sortedSales[0][0]} (${sortedSales[0][1]} sold)` : "N/A";
    const leastPopular = sortedSales.length > 1 ? `${sortedSales[sortedSales.length - 1][0]} (${sortedSales[sortedSales.length - 1][1]} sold)` : "N/A";

    return {
      revenue: totalRevenue,
      total: orders.length,
      completed: completedCount,
      active: activeCount,
      cancelled: cancelledCount,
      mostPopular,
      leastPopular,
      salesData: sortedSales.slice(0, 5) // Top 5 items for chart
    };
  }, [orders]);

  // Group menu items by category so the Menu Management table reads
  // like the customer-facing menu instead of one long, mixed list.
  const groupedMenuItems = useMemo(
    () => groupItemsByCategory(menuItems),
    [menuItems],
  );

  // Open item form for adding or editing
  const handleOpenItemModal = (item = null) => {
    if (item) {
      setEditingItem(item.name);
      setItemForm({
        name: item.name,
        price: item.price,
        category: item.category,
        description: item.description,
        image: item.image,
        prepTime: item.prepTime || 15,
        ingredients: item.ingredients ? item.ingredients.join(", ") : "",
        allergens: item.allergens ? item.allergens.join(", ") : ""
      });
    } else {
      setEditingItem(null);
      setItemForm({
        name: "",
        price: "",
        category: "burger",
        description: "",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80",
        prepTime: 15,
        ingredients: "",
        allergens: ""
      });
    }
    setShowItemModal(true);
  };

  const handleSaveItem = (e) => {
    e.preventDefault();
    const formattedItem = {
      name: itemForm.name,
      price: parseFloat(itemForm.price) || 0,
      category: itemForm.category,
      description: itemForm.description,
      image: itemForm.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80",
      prepTime: parseInt(itemForm.prepTime) || 15,
      ingredients: itemForm.ingredients ? itemForm.ingredients.split(",").map(i => i.trim()) : [],
      allergens: itemForm.allergens ? itemForm.allergens.split(",").map(i => i.trim()) : []
    };

    if (editingItem) {
      updateMenuItem(editingItem, formattedItem);
    } else {
      addMenuItem(formattedItem);
    }
    setShowItemModal(false);
  };

  // Open user form for adding or editing
  const handleOpenUserModal = (user = null) => {
    if (user) {
      setEditingUser(user.username);
      setUserForm({
        username: user.username,
        password: user.password,
        role: user.role,
        name: user.name
      });
    } else {
      setEditingUser(null);
      setUserForm({
        username: "",
        password: "",
        role: "waiter",
        name: ""
      });
    }
    setShowUserModal(true);
  };

  const handleSaveUser = (e) => {
    e.preventDefault();
    if (editingUser) {
      updateUser(editingUser, userForm);
    } else {
      addUser(userForm);
    }
    setShowUserModal(false);
  };

  return (
    <div className="admin-shell">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="sidebar-brand">
          <span className="brand">Biku</span>
          <span className="brand-accent">Panel</span>
        </div>
        <nav className="sidebar-nav">
          <button className={activeTab === "analytics" ? "active" : ""} onClick={() => setActiveTab("analytics")}>
            📊 {t.analytics}
          </button>
          <button className={activeTab === "menu" ? "active" : ""} onClick={() => setActiveTab("menu")}>
            🍔 {t.menu_mgmt}
          </button>
          <button className={activeTab === "orders" ? "active" : ""} onClick={() => setActiveTab("orders")}>
            📋 Order List
          </button>
          <button className={activeTab === "users" ? "active" : ""} onClick={() => setActiveTab("users")}>
            👥 Staff Accounts
          </button>
          <button className={activeTab === "feedback" ? "active" : ""} onClick={() => setActiveTab("feedback")}>
            💬 Feedbacks
          </button>
        </nav>
        <div className="sidebar-footer">
          <button className="logout-btn" onClick={onLogout}>
            🚪 {t.logout}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-content">
        {/* Analytics Tab */}
        {activeTab === "analytics" && (
          <div className="analytics-view">
            <h2>{t.analytics}</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <h3>{t.total_revenue}</h3>
                <p className="stat-val">{formatPrice(stats.revenue, currency)}</p>
                <span className="stat-sub">From served orders</span>
              </div>
              <div className="stat-card">
                <h3>{t.total_orders}</h3>
                <p className="stat-val">{stats.total}</p>
                <span className="stat-sub">Lifetime orders</span>
              </div>
              <div className="stat-card">
                <h3>{t.active_orders}</h3>
                <p className="stat-val highlight">{stats.active}</p>
                <span className="stat-sub">Currently in progress</span>
              </div>
              <div className="stat-card">
                <h3>Completed / Cancelled</h3>
                <p className="stat-val">
                  <span className="green">{stats.completed}</span> / <span className="red">{stats.cancelled}</span>
                </p>
                <span className="stat-sub">Final states</span>
              </div>
            </div>

            {/* Popular Items & CSS Chart */}
            <div className="analytics-details">
              <div className="chart-container">
                <h3>🔥 Top Selling Dishes</h3>
                {stats.salesData.length === 0 ? (
                  <p className="empty-state">No sales data recorded yet.</p>
                ) : (
                  <div className="bar-chart">
                    {stats.salesData.map(([name, count]) => {
                      const maxCount = Math.max(...stats.salesData.map(s => s[1]));
                      const percent = maxCount > 0 ? (count / maxCount) * 100 : 0;
                      return (
                        <div key={name} className="chart-row">
                          <span className="chart-label">{name}</span>
                          <div className="chart-bar-wrap">
                            <div className="chart-bar" style={{ width: `${percent}%` }} />
                          </div>
                          <span className="chart-count">{count} sold</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="trends-card">
                <h3>🏷️ Performance Summary</h3>
                <div className="trend-row">
                  <span>Most Popular:</span>
                  <strong>{stats.mostPopular}</strong>
                </div>
                <div className="trend-row">
                  <span>Least Popular:</span>
                  <strong>{stats.leastPopular}</strong>
                </div>
                <div className="trend-row">
                  <span>Average Ticket Value:</span>
                  <strong>{formatPrice(stats.total > 0 ? stats.revenue / stats.total : 0, currency)}</strong>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Menu Management Tab */}
        {activeTab === "menu" && (
          <div className="menu-mgmt-view">
            <div className="view-header">
              <h2>{t.menu_mgmt}</h2>
              <button className="admin-add-btn" onClick={() => handleOpenItemModal()}>
                ＋ {t.add_new_item}
              </button>
            </div>
            {menuItems.length === 0 ? (
              <div className="admin-table-wrap">
                <p className="empty-state">No menu items yet.</p>
              </div>
            ) : (
              groupedMenuItems.map((group) => (
                <div key={group.id} className="menu-category-group">
                  <h3 className="menu-category-heading">
                    {group.label}
                    <span className="category-count">{group.items.length}</span>
                  </h3>
                  <div className="admin-table-wrap">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Image</th>
                          <th>Name</th>
                          <th>Price (USD)</th>
                          <th>Price ({currency})</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {group.items.map(item => (
                          <tr key={item.name}>
                            <td>
                              <div className="table-img" style={{ backgroundImage: `url(${item.image})` }} />
                            </td>
                            <td className="bold">{item.name}</td>
                            <td>${item.price}</td>
                            <td>{formatPrice(item.price, currency)}</td>
                            <td>
                              <span className={`status-badge ${item.available ? "green" : "red"}`}>
                                {item.available ? t.available : t.out_of_stock}
                              </span>
                            </td>
                            <td>
                              <div className="action-btns">
                                <button className="edit-action" onClick={() => handleOpenItemModal(item)}>✏️</button>
                                <button className="delete-action" onClick={() => deleteMenuItem(item.name)}>🗑️</button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <div className="orders-mgmt-view">
            <h2>Order Tracking Queue</h2>
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Table</th>
                    <th>Items (Qty)</th>
                    <th>Special Note</th>
                    <th>Status</th>
                    <th>Order Time</th>
                    <th>Served Time</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="center empty-state">No orders in database.</td>
                    </tr>
                  ) : (
                    orders.map(order => (
                      <tr key={order.id}>
                        <td className="bold">{order.id}</td>
                        <td>{order.table}</td>
                        <td>
                          <div className="order-items-cell">
                            {order.items.map(it => (
                              <span key={it.name}>{it.name} (x{it.quantity})</span>
                            ))}
                          </div>
                        </td>
                        <td className="note-cell italic">{order.notes || "None"}</td>
                        <td>
                          <span className={`status-badge-lg status-${order.status}`}>
                            {t[order.status] || order.status}
                          </span>
                        </td>
                        <td>{new Date(order.timestamps.created).toLocaleTimeString()}</td>
                        <td>
                          {order.timestamps.served 
                            ? new Date(order.timestamps.served).toLocaleTimeString() 
                            : "-"}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* User Accounts Tab */}
        {activeTab === "users" && (
          <div className="users-mgmt-view">
            <div className="view-header">
              <h2>{t.user_mgmt}</h2>
              <button className="admin-add-btn" onClick={() => handleOpenUserModal()}>
                ＋ {t.add_user}
              </button>
            </div>
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Username</th>
                    <th>Role</th>
                    <th>Password</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.username}>
                      <td className="bold">{user.name}</td>
                      <td>{user.username}</td>
                      <td><span className="role-badge">{t[user.role] || user.role}</span></td>
                      <td><code>{user.password}</code></td>
                      <td>
                        <span className={`status-badge ${user.disabled ? "red" : "green"}`}>
                          {user.disabled ? t.disabled_label : "Active"}
                        </span>
                      </td>
                      <td>
                        <div className="action-btns">
                          <button className="edit-action" onClick={() => handleOpenUserModal(user)}>✏️</button>
                          <button 
                            className="toggle-action" 
                            onClick={() => updateUser(user.username, { disabled: !user.disabled })}
                          >
                            {user.disabled ? "🟢 Enable" : "🔴 Disable"}
                          </button>
                          {user.username !== "admin" && (
                            <button className="delete-action" onClick={() => deleteUser(user.username)}>🗑️</button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Feedback Tab */}
        {activeTab === "feedback" && (
          <div className="feedback-mgmt-view">
            <h2>Customer Feedbacks & Ratings</h2>
            <div className="feedbacks-list">
              {feedbacks.length === 0 ? (
                <p className="empty-state">No feedback submitted yet.</p>
              ) : (
                feedbacks.map(fb => (
                  <div key={fb.id} className="admin-feedback-card">
                    <div className="feedback-card-header">
                      <span className="feedback-type-badge">{fb.type}</span>
                      <span className="feedback-stars">{"★".repeat(fb.rating)}{"☆".repeat(5 - fb.rating)}</span>
                    </div>
                    <p className="feedback-comment">"{fb.comment}"</p>
                    <span className="feedback-time">{new Date(fb.timestamp).toLocaleString()}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </main>

      {/* Menu Item Form Modal */}
      {showItemModal && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-content">
            <h3>{editingItem ? t.edit_item : t.add_new_item}</h3>
            <form onSubmit={handleSaveItem}>
              <div className="form-grid">
                <div className="form-group">
                  <label>{t.name}</label>
                  <input
                    type="text"
                    required
                    value={itemForm.name}
                    onChange={(e) => setItemForm({ ...itemForm, name: e.target.value })}
                    disabled={!!editingItem}
                  />
                </div>
                <div className="form-group">
                  <label>{t.price} (USD)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={itemForm.price}
                    onChange={(e) => setItemForm({ ...itemForm, price: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>{t.prep_time} (mins)</label>
                  <input
                    type="number"
                    required
                    value={itemForm.prepTime}
                    onChange={(e) => setItemForm({ ...itemForm, prepTime: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <select
                    value={itemForm.category}
                    onChange={(e) => setItemForm({ ...itemForm, category: e.target.value })}
                  >
                    {MENU_CATEGORIES.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>{t.image_url}</label>
                <input
                  type="text"
                  value={itemForm.image}
                  onChange={(e) => setItemForm({ ...itemForm, image: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>{t.description}</label>
                <textarea
                  required
                  value={itemForm.description}
                  onChange={(e) => setItemForm({ ...itemForm, description: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Ingredients (comma separated)</label>
                <input
                  type="text"
                  placeholder="e.g. Beef, Tomato, Cheese"
                  value={itemForm.ingredients}
                  onChange={(e) => setItemForm({ ...itemForm, ingredients: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Allergens (comma separated)</label>
                <input
                  type="text"
                  placeholder="e.g. Gluten, Dairy"
                  value={itemForm.allergens}
                  onChange={(e) => setItemForm({ ...itemForm, allergens: e.target.value })}
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={() => setShowItemModal(false)}>
                  {t.cancel}
                </button>
                <button type="submit" className="save-btn">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* User Form Modal */}
      {showUserModal && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-content">
            <h3>{editingUser ? "Edit User" : t.add_user}</h3>
            <form onSubmit={handleSaveUser}>
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  required
                  value={userForm.name}
                  onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Username</label>
                <input
                  type="text"
                  required
                  value={userForm.username}
                  onChange={(e) => setUserForm({ ...userForm, username: e.target.value })}
                  disabled={!!editingUser}
                />
              </div>
              <div className="form-group">
                <label>{t.password}</label>
                <input
                  type="text"
                  required
                  value={userForm.password}
                  onChange={(e) => setUserForm({ ...userForm, password: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Role</label>
                <select
                  value={userForm.role}
                  onChange={(e) => setUserForm({ ...userForm, role: e.target.value })}
                >
                  <option value="admin">{t.admin}</option>
                  <option value="kitchen">{t.kitchen}</option>
                  <option value="waiter">{t.waiter}</option>
                </select>
              </div>
              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={() => setShowUserModal(false)}>
                  {t.cancel}
                </button>
                <button type="submit" className="save-btn">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
