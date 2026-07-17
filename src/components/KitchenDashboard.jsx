import React, { useState, useMemo } from "react";
import { useDatabase } from "../db";
import { translations } from "../i18n";
import { groupItemsByCategory } from "../menuCategories";
import { groupOrdersByTable } from "../orderUtils";

export default function KitchenDashboard({ language, onLogout }) {
  const {
    orders,
    menuItems,
    kitchenAcceptOrder,
    kitchenStartPreparing,
    kitchenMarkReady,
    toggleItemAvailability
  } = useDatabase();

  const groupedMenuItems = useMemo(
    () => groupItemsByCategory(menuItems),
    [menuItems],
  );

  const [activeSubTab, setActiveSubTab] = useState("queue"); // queue, availability

  const t = translations[language] || translations.en;

  // Filter orders for kitchen view: Pending, Accepted, Preparing, Ready
  // Sorted oldest first (creation time ascending)
  const activeOrders = orders
    .filter(o => ["Pending", "Accepted", "Preparing"].includes(o.status))
    .sort((a, b) => new Date(a.timestamps.created) - new Date(b.timestamps.created));

  const completedOrders = orders
    .filter(o => o.status === "Ready" || o.status === "Served" || o.status === "Completed")
    .slice(0, 10); // Show recent 10 completed orders

  const activeOrdersByTable = groupOrdersByTable(activeOrders);
  const completedOrdersByTable = groupOrdersByTable(completedOrders);

  // Preserve each order's overall priority rank (oldest first) even though
  // tickets are now visually grouped by table.
  const priorityRankById = new Map(activeOrders.map((o, i) => [o.id, i + 1]));

  const getActionButton = (order) => {
    switch (order.status) {
      case "Pending":
        return (
          <button className="kitchen-btn btn-accept" onClick={() => kitchenAcceptOrder(order.id)}>
            🤝 {t.accept_order}
          </button>
        );
      case "Accepted":
        return (
          <button className="kitchen-btn btn-prepare" onClick={() => kitchenStartPreparing(order.id)}>
            🔥 {t.start_prep}
          </button>
        );
      case "Preparing":
        return (
          <button className="kitchen-btn btn-ready" onClick={() => kitchenMarkReady(order.id)}>
            ✅ {t.mark_ready}
          </button>
        );
      default:
        return null;
    }
  };

  const getElapsedTime = (createdTime) => {
    const elapsedMs = Date.now() - new Date(createdTime).getTime();
    const mins = Math.floor(elapsedMs / 60000);
    if (mins < 1) return "Just now";
    return `${mins}m ago`;
  };

  return (
    <div className="kitchen-shell">
      {/* Kitchen Header */}
      <header className="kitchen-header">
        <div className="kitchen-title">
          <span className="chef-icon">👨‍🍳</span>
          <h2>{t.kitchen_dash}</h2>
        </div>
        <div className="kitchen-tabs">
          <button className={activeSubTab === "queue" ? "active" : ""} onClick={() => setActiveSubTab("queue")}>
            📋 {t.prep_queue} ({activeOrders.length})
          </button>
          <button className={activeSubTab === "availability" ? "active" : ""} onClick={() => setActiveSubTab("availability")}>
            🥦 {t.item_avail_title}
          </button>
        </div>
        <button className="logout-btn-header" onClick={onLogout}>
          {t.logout}
        </button>
      </header>

      {/* Main Area */}
      <main className="kitchen-body">
        {activeSubTab === "queue" ? (
          <div className="kitchen-queue-view">
            {activeOrders.length === 0 ? (
              <div className="kitchen-empty">
                <p>🎉 All clear! No pending orders.</p>
              </div>
            ) : (
              activeOrdersByTable.map(group => (
                <div key={group.table} className="kitchen-table-group">
                  <h3 className="kitchen-table-heading">
                    {group.table}
                    <span className="category-count">{group.orders.length}</span>
                  </h3>
                  <div className="kitchen-tickets-grid">
                    {group.orders.map(order => (
                      <div key={order.id} className={`kitchen-ticket status-${order.status}`}>
                        <div className="ticket-header">
                          <span className="ticket-id">{order.id}</span>
                          <span className="ticket-index">#{priorityRankById.get(order.id)}</span>
                        </div>

                        <div className="ticket-body">
                          <div className="ticket-time">
                            Received: {new Date(order.timestamps.created).toLocaleTimeString()} ({getElapsedTime(order.timestamps.created)})
                          </div>
                          <ul className="ticket-items">
                            {order.items.map(it => (
                              <li key={it.name}>
                                <span className="item-qty">{it.quantity}x</span>
                                <span className="item-name">{it.name}</span>
                              </li>
                            ))}
                          </ul>
                          {order.notes && (
                            <div className="ticket-notes">
                              <strong>Note:</strong> "{order.notes}"
                            </div>
                          )}
                        </div>

                        <div className="ticket-footer">
                          <span className={`status-badge-ticket state-${order.status}`}>
                            {t[order.status] || order.status}
                          </span>
                          {getActionButton(order)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}

            {/* Completed section */}
            {completedOrders.length > 0 && (
              <div className="kitchen-completed-section">
                <h3>Recently Completed</h3>
                {completedOrdersByTable.map(group => (
                  <div key={group.table} className="kitchen-table-group">
                    <h4 className="kitchen-table-heading">
                      {group.table}
                      <span className="category-count">{group.orders.length}</span>
                    </h4>
                    <div className="completed-tickets-row">
                      {group.orders.map(order => (
                        <div key={order.id} className="completed-ticket-pill">
                          <strong>{order.id}</strong> - {order.status}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          // Menu Item Availability Tab
          <div className="kitchen-availability-view">
            <h2>{t.item_avail_title}</h2>
            <p className="subtitle">Hide items that are out of ingredients. They will be removed from customer view immediately.</p>
            {groupedMenuItems.map((group) => (
              <div key={group.id} className="menu-category-group">
                <h3 className="menu-category-heading">
                  {group.label}
                  <span className="category-count">{group.items.length}</span>
                </h3>
                <div className="availability-grid">
                  {group.items.map(item => (
                    <div key={item.name} className={`avail-card ${item.available ? "in-stock" : "out-of-stock"}`}>
                      <div className="avail-img" style={{ backgroundImage: `url(${item.image})` }} />
                      <div className="avail-details">
                        <h4>{item.name}</h4>
                        <span className="avail-cat">{item.category}</span>
                      </div>
                      <div className="avail-action">
                        <button 
                          className={`avail-toggle-btn ${item.available ? "btn-hide" : "btn-show"}`}
                          onClick={() => toggleItemAvailability(item.name, !item.available)}
                        >
                          {item.available ? `🚫 ${t.hide_item}` : `🟢 ${t.show_item}`}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
