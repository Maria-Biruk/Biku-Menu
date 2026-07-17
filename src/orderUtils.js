// Shared helpers for grouping restaurant orders by table, used by the
// Waiter and Kitchen dashboards so staff can track multiple tables at once.

// Groups a flat order list into per-table buckets, sorted by table label
// (numeric-aware, so "Table 2" sorts before "Table 10").
export function groupOrdersByTable(orders) {
  const map = new Map();
  orders.forEach((order) => {
    const key = order.table || "Unassigned";
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(order);
  });

  return Array.from(map.entries())
    .map(([table, tableOrders]) => ({ table, orders: tableOrders }))
    .sort((a, b) =>
      a.table.localeCompare(b.table, undefined, { numeric: true }),
    );
}
