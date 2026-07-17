import React from "react";
import { useDatabase } from "../db";
import { translations } from "../i18n";
import { groupOrdersByTable } from "../orderUtils";

export default function WaiterDashboard({ language, onLogout }) {
  const { orders, waiterMarkServed } = useDatabase();

  const t = translations[language] || translations.en;

  // Ready queue: orders that are cooked by the kitchen but not yet served
  const readyOrders = orders.filter(o => o.status === "Ready");

  // Served queue: orders that this waiter served recently
  const servedOrders = orders.filter(o => o.status === "Served" || o.status === "Completed");

  const readyByTable = groupOrdersByTable(readyOrders);
  const servedByTable = groupOrdersByTable(servedOrders);

  return (
    <div className="waiter-shell">
      {/* Waiter Header */}
      <header className="waiter-header">
        <div className="waiter-title">
          <span className="waiter-icon">🛎️</span>
          <h2>{t.waiter_dash}</h2>
        </div>
        <button className="logout-btn-header" onClick={onLogout}>
          {t.logout}
        </button>
      </header>

      {/* Main Waiter Work Area */}
      <main className="waiter-body">
        <div className="waiter-grid">
          {/* Left Column: Ready to Serve Queue */}
          <section className="waiter-queue-section">
            <h3>🛎️ {t.ready_queue} ({readyOrders.length})</h3>
            {readyOrders.length === 0 ? (
              <div className="waiter-empty">
                <p>📭 No orders waiting to be served. Rest for a bit!</p>
              </div>
            ) : (
              readyByTable.map(group => (
                <div key={group.table} className="waiter-table-group">
                  <h4 className="waiter-table-heading">
                    {group.table}
                    <span className="category-count">{group.orders.length}</span>
                  </h4>
                  <div className="waiter-cards-list">
                    {group.orders.map(order => (
                      <div key={order.id} className="waiter-order-card">
                        <div className="waiter-card-header">
                          <span className="waiter-order-id">{order.id}</span>
                        </div>

                        <div className="waiter-card-body">
                          <div className="waiter-time">
                            Ready since: {order.timestamps.ready ? new Date(order.timestamps.ready).toLocaleTimeString() : "Just now"}
                          </div>
                          <ul className="waiter-items-list">
                            {order.items.map(it => (
                              <li key={it.name}>
                                <strong>{it.quantity}x</strong> {it.name}
                              </li>
                            ))}
                          </ul>
                          {order.notes && (
                            <div className="waiter-notes">
                              <em>Note:</em> "{order.notes}"
                            </div>
                          )}
                        </div>

                        <div className="waiter-card-footer">
                          <button
                            className="waiter-serve-btn"
                            onClick={() => waiterMarkServed(order.id)}
                          >
                            🍽️ {t.mark_served}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </section>

          {/* Right Column: Served History */}
          <section className="waiter-history-section">
            <h3>✅ Served History (Recent)</h3>
            <div className="waiter-history-list">
              {servedOrders.length === 0 ? (
                <p className="empty-history">No orders served in this session.</p>
              ) : (
                servedByTable.map(group => (
                  <div key={group.table} className="waiter-table-group">
                    <h4 className="waiter-table-heading">
                      {group.table}
                      <span className="category-count">{group.orders.length}</span>
                    </h4>
                    {group.orders.map(order => (
                      <div key={order.id} className="waiter-history-item">
                        <div className="history-info">
                          <span className="history-id">{order.id}</span>
                          <span className="history-time">
                            {order.timestamps.served ? new Date(order.timestamps.served).toLocaleTimeString() : ""}
                          </span>
                        </div>
                        <div className="history-items-summary">
                          {order.items.map(it => `${it.name} (x${it.quantity})`).join(", ")}
                        </div>
                        <div className="history-status">
                          <span className={`status-badge state-${order.status}`}>{order.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
