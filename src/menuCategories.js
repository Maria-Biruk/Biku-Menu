// Shared category list used across the customer menu and staff dashboards.
// Keep this as the single source of truth for category ids/labels/order.
export const MENU_CATEGORIES = [
  { id: "burger", label: "Burgers" },
  { id: "foods", label: "Foods" },
  { id: "pizza", label: "Pizza" },
  { id: "soft-drinks", label: "Soft Drinks" },
  { id: "juice", label: "Juice" },
  { id: "desserts", label: "Desserts" },
  { id: "hot-drinks", label: "Hot Drinks" },
];

// Groups a flat menu item list into category buckets, preserving
// MENU_CATEGORIES order and skipping empty categories. Any item with an
// unrecognized category id is placed into a trailing "Other" group.
export function groupItemsByCategory(items) {
  const groups = MENU_CATEGORIES.map((cat) => ({
    ...cat,
    items: items.filter((item) => item.category === cat.id),
  })).filter((group) => group.items.length > 0);

  const knownIds = new Set(MENU_CATEGORIES.map((cat) => cat.id));
  const otherItems = items.filter((item) => !knownIds.has(item.category));
  if (otherItems.length > 0) {
    groups.push({ id: "other", label: "Other", items: otherItems });
  }

  return groups;
}
