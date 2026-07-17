import React, { useState, useEffect, useMemo } from "react";
import "./App.css";
import { DatabaseProvider, useDatabase } from "./db";
import { translations, formatPrice } from "./i18n";

import AuthPage from "./components/AuthPage";
import AdminDashboard from "./components/AdminDashboard";
import KitchenDashboard from "./components/KitchenDashboard";
import WaiterDashboard from "./components/WaiterDashboard";

// Minimal line-style icons for the bottom navigation (replaces cartoonish emoji)
function NavSvgIcon({ children }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

function HomeIcon() {
  return (
    <NavSvgIcon>
      <path d="M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z" />
    </NavSvgIcon>
  );
}

function HeartIcon() {
  return (
    <NavSvgIcon>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </NavSvgIcon>
  );
}

function OrdersIcon() {
  return (
    <NavSvgIcon>
      <rect x="4" y="4" width="16" height="17" rx="2" />
      <path d="M9 4V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1" />
      <line x1="8" y1="10" x2="16" y2="10" />
      <line x1="8" y1="14" x2="16" y2="14" />
      <line x1="8" y1="18" x2="13" y2="18" />
    </NavSvgIcon>
  );
}

function FeedbackIcon() {
  return (
    <NavSvgIcon>
      <path d="M21 11.5a8.4 8.4 0 0 1-1.8 5.2L20 21l-4.3-1.2a8.4 8.4 0 0 1-3.7.9 8.5 8.5 0 1 1 9-9.2z" />
    </NavSvgIcon>
  );
}

function SettingsIcon() {
  return (
    <NavSvgIcon>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </NavSvgIcon>
  );
}

// Original Section Navigation
function SectionNav({ activeCategory, setActiveCategory, onScrollNav, t }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const sections = [
    { id: "hero", label: "Home" },
    { id: "burger", label: "Burgers" },
    { id: "foods", label: "Foods" },
    { id: "pizza", label: "Pizza" },
    { id: "soft-drinks", label: "Soft Drinks" },
    { id: "juice", label: "Juice" },
    { id: "desserts", label: "Desserts" },
    { id: "hot-drinks", label: "Hot Drinks" },
  ];

  return (
    <nav className="site-nav">
      <div className="site-name">
        <span className="brand">Digital</span>
        <span className="brand-accent">Menu</span>
      </div>

      <button
        type="button"
        className="nav-toggle"
        aria-label="Toggle navigation menu"
        aria-expanded={mobileNavOpen}
        onClick={() => setMobileNavOpen((open) => !open)}
      >
        <span className="nav-toggle-icon">☰</span>
      </button>

      <div className={mobileNavOpen ? "links open" : "links"}>
        {sections.map((section) => (
          <button
            key={section.id}
            className={
              activeCategory === section.id ||
              (section.id === "hero" && activeCategory === "all")
                ? "nav-link active"
                : "nav-link"
            }
            onClick={() => {
              if (section.id === "hero") {
                setActiveCategory("all");
                onScrollNav("hero");
              } else {
                setActiveCategory(section.id);
                onScrollNav(section.id);
              }
              setMobileNavOpen(false);
            }}
            type="button"
          >
            {section.label}
          </button>
        ))}
      </div>
    </nav>
  );
}

// Original Menu Card Design with Favorites overlay and Order triggers
function MenuCard({
  item,
  isFav,
  onToggleFav,
  onClick,
  onOrderClick,
  t,
  currency,
}) {
  return (
    <article className="menu-card" onClick={() => onClick(item)}>
      <div
        className="card-image"
        style={{ backgroundImage: `url(${item.image})` }}
      >
        {!item.available && (
          <span
            className="badge"
            style={{ background: "#ef4444", color: "white" }}
          >
            {t.out_of_stock}
          </span>
        )}
        <button
          className={`fav-btn ${isFav ? "is-fav" : ""}`}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            zIndex: 5,
          }}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFav(item.name);
          }}
          type="button"
          aria-label="Toggle Favorite"
        >
          ♥
        </button>
      </div>
      <div className="card-body">
        <h3>{item.name}</h3>
        <p>{item.description}</p>
        <div className="card-footer">
          <span className="card-price">
            {formatPrice(item.price, currency)}
          </span>
          {item.available ? (
            <button
              className="order-btn"
              onClick={(e) => {
                e.stopPropagation();
                onOrderClick(e, item);
              }}
              type="button"
            >
              Order
            </button>
          ) : (
            <span className="out-label">{t.out_of_stock}</span>
          )}
        </div>
      </div>
    </article>
  );
}

function AppContent() {
  const {
    menuItems,
    orders,
    favorites,
    currentUser,
    placeOrder,
    cancelOrder,
    confirmReceipt,
    toggleFavorite,
    addFeedback,
    logout,
  } = useDatabase();

  // Navigation & Views
  // The staff/admin login is intentionally not linked anywhere in the UI.
  // Staff reach it only by visiting the /portal URL directly.
  const [activeTab, setActiveTab] = useState(() =>
    typeof window !== "undefined" &&
    window.location.pathname.replace(/\/+$/, "") === "/portal"
      ? "auth"
      : "menu",
  ); // menu, favorites, orders, feedback, settings, auth
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState(() => {
    const stored = localStorage.getItem("dm_view_mode");
    if (stored) return stored;
    // Default to the list layout on mobile-sized screens, since the
    // grid/list toggle is hidden there and list reads best on small widths.
    if (typeof window !== "undefined" && window.innerWidth <= 850) {
      return "list";
    }
    return "grid"; // grid (original) or list
  });

  // Modals & Details
  const [selectedItem, setSelectedItem] = useState(null);
  const [checkoutItem, setCheckoutItem] = useState(null);
  const [orderQuantity, setOrderQuantity] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [tableNumber, setTableNumber] = useState("Table 5");

  // Settings states
  const [language, setLanguage] = useState(
    () => localStorage.getItem("dm_lang") || "en",
  );
  const [currency, setCurrency] = useState(
    () => localStorage.getItem("dm_currency") || "USD",
  );
  const [darkMode, setDarkMode] = useState(() => {
    const val = localStorage.getItem("dm_dark_mode");
    return val ? val === "true" : true;
  });
  const [notifications, setNotifications] = useState(true);
  const [showNotificationBanner, setShowNotificationBanner] = useState(null);

  // Feedback states
  const [feedbackRating, setFeedbackRating] = useState(5);
  const [feedbackComment, setFeedbackComment] = useState("");
  const [feedbackType, setFeedbackType] = useState("Suggestion");
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  // Expanded sections state for original See More layout
  const [expandedSections, setExpandedSections] = useState({});

  const t = translations[language] || translations.en;

  // Persist settings
  useEffect(() => {
    localStorage.setItem("dm_view_mode", viewMode);
  }, [viewMode]);

  useEffect(() => {
    localStorage.setItem("dm_lang", language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem("dm_currency", currency);
  }, [currency]);

  useEffect(() => {
    localStorage.setItem("dm_dark_mode", darkMode);
    document.body.className = darkMode ? "dark-theme" : "light-theme";
  }, [darkMode]);

  // Keep the address bar in sync with the (unlinked) staff portal route.
  // Visiting /portal directly opens the staff login; leaving it restores "/".
  useEffect(() => {
    if (typeof window === "undefined") return;
    const path = window.location.pathname.replace(/\/+$/, "");
    if (activeTab === "auth" && path !== "/portal") {
      window.history.pushState({}, "", "/portal");
    } else if (activeTab !== "auth" && path === "/portal") {
      window.history.pushState({}, "", "/");
    }
  }, [activeTab]);

  // Status updates audio + banner
  const [prevStatuses, setPrevStatuses] = useState({});
  useEffect(() => {
    if (orders.length > 0) {
      orders.forEach((o) => {
        const prev = prevStatuses[o.id];
        if (prev && prev !== o.status) {
          triggerNotification(
            `Order ${o.id} status updated to: ${t[o.status] || o.status}!`,
          );
        }
      });
      const statuses = {};
      orders.forEach((o) => {
        statuses[o.id] = o.status;
      });
      setPrevStatuses(statuses);
    }
  }, [orders]);

  const triggerNotification = (message) => {
    if (notifications) {
      setShowNotificationBanner(message);
      try {
        const audioCtx = new (
          window.AudioContext || window.webkitAudioContext
        )();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        oscillator.type = "sine";
        oscillator.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
        oscillator.frequency.setValueAtTime(880, audioCtx.currentTime + 0.15); // A5
        gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(
          0.01,
          audioCtx.currentTime + 0.4,
        );
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.4);
      } catch (e) {
        console.log("Audio API issue: ", e);
      }
      setTimeout(() => {
        setShowNotificationBanner(null);
      }, 4000);
    }
  };

  const handleScrollNav = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const toggleExpanded = (sectionId) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const handleCardClick = (item) => {
    setSelectedItem(item);
  };

  const handleQuickOrder = (e, item) => {
    e.stopPropagation();
    setCheckoutItem(item);
    setOrderQuantity(1);
    setSpecialInstructions("");
  };

  const handleModalOrder = (item) => {
    setSelectedItem(null);
    setCheckoutItem(item);
  };

  const handleConfirmOrder = () => {
    if (!checkoutItem) return;
    const orderItems = [
      {
        name: checkoutItem.name,
        price: checkoutItem.price,
        quantity: orderQuantity,
        image: checkoutItem.image,
      },
    ];
    placeOrder(orderItems, tableNumber, specialInstructions);
    setCheckoutItem(null);
    setActiveTab("orders");
    triggerNotification("Order placed successfully!");
  };

  const submitFeedbackForm = (e) => {
    e.preventDefault();
    addFeedback(feedbackRating, feedbackComment, feedbackType);
    setFeedbackSubmitted(true);
    setFeedbackComment("");
    setTimeout(() => {
      setFeedbackSubmitted(false);
    }, 4000);
  };

  // Reconstruct Menu Sections dynamically matching original layout categories
  const sectionsList = [
    { id: "burger", title: "Burgers", subtitle: "Crafted to perfection" },
    { id: "foods", title: "Foods", subtitle: "The heart of the table" },
    { id: "pizza", title: "Pizza", subtitle: "Wood-fired classics" },
    {
      id: "soft-drinks",
      title: "Soft Drinks",
      subtitle: "Ice-cold refreshment",
    },
    { id: "juice", title: "Juice", subtitle: "Freshly pressed daily" },
    { id: "desserts", title: "Desserts", subtitle: "A sweet conclusion" },
    { id: "hot-drinks", title: "Hot Drinks", subtitle: "Heated to perfection" },
  ];

  // Group items by category, respecting active item visibility edits
  const dynamicMenuSections = sectionsList.map((sec) => ({
    ...sec,
    items: menuItems.filter((item) => {
      // Hidden items are omitted from guest view
      if (!item.available && !currentUser) return false;
      return item.category === sec.id;
    }),
  }));

  // Render Dashboard
  if (currentUser) {
    return (
      <div className="app-shell-container">
        {currentUser.role === "admin" && (
          <AdminDashboard
            language={language}
            currency={currency}
            onLogout={() => logout()}
          />
        )}
        {currentUser.role === "kitchen" && (
          <KitchenDashboard language={language} onLogout={() => logout()} />
        )}
        {currentUser.role === "waiter" && (
          <WaiterDashboard language={language} onLogout={() => logout()} />
        )}
      </div>
    );
  }

  return (
    <div className="app-shell">
      {showNotificationBanner && (
        <div className="notification-banner">
          <span className="bell-pulse">🔔</span>
          <span className="banner-msg">{showNotificationBanner}</span>
        </div>
      )}

      {/* Render Sticky SectionNav at the top when in Customer Menu Tab */}
      {activeTab === "menu" && (
        <SectionNav
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          onScrollNav={handleScrollNav}
          t={t}
        />
      )}

      <main className="guest-main">
        {/* CUSTOMER MENU TAB */}
        {activeTab === "menu" && (
          <div className="menu-view-container">
            {/* Search Header */}
            <div className="search-filter-section">
              <div className="search-bar-wrap">
                <span className="search-icon">🔍</span>
                <input
                  type="text"
                  placeholder={t.search_placeholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button
                    className="clear-search"
                    onClick={() => setSearchQuery("")}
                  >
                    ×
                  </button>
                )}
                {/* Embedded Grid/List layout toggle inside search row */}
                <div className="view-toggle" style={{ marginLeft: "8px" }}>
                  <button
                    className={viewMode === "grid" ? "active" : ""}
                    onClick={() => setViewMode("grid")}
                    title={t.grid_view}
                  >
                    🎛️
                  </button>
                  <button
                    className={viewMode === "list" ? "active" : ""}
                    onClick={() => setViewMode("list")}
                    title={t.list_view}
                  >
                    ☰
                  </button>
                </div>
              </div>
            </div>

            {/* Search results always render as a flat filtered list, honoring the grid/list toggle */}
            {searchQuery ? (
              <div className={`dishes-container view-${viewMode}`}>
                {menuItems
                  .filter((item) => {
                    if (!item.available && !currentUser) return false;
                    const matchesCategory =
                      activeCategory === "all" ||
                      item.category === activeCategory;
                    const matchesSearch =
                      item.name
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                      item.description
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase());
                    return matchesCategory && matchesSearch;
                  })
                  .map((item) => {
                    const isFav = favorites.includes(item.name);
                    if (viewMode === "list") {
                      return (
                        <article
                          key={item.name}
                          className="dish-card list-item"
                          onClick={() => handleCardClick(item)}
                        >
                          <div
                            className="list-img"
                            style={{ backgroundImage: `url(${item.image})` }}
                          >
                            {!item.available && (
                              <span className="avail-badge out">
                                {t.out_of_stock}
                              </span>
                            )}
                          </div>
                          <div className="list-body">
                            <div className="list-header">
                              <div>
                                <h3>{item.name}</h3>
                                <span className="list-cat-label">
                                  {item.category}
                                </span>
                              </div>
                              <button
                                className={`fav-btn ${isFav ? "is-fav" : ""}`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleFavorite(item.name);
                                }}
                              >
                                ♥
                              </button>
                            </div>
                            <p className="list-desc">{item.description}</p>
                            <div className="list-footer">
                              <span className="dish-price">
                                {formatPrice(item.price, currency)}
                              </span>
                              <div className="list-actions">
                                <span className="list-prep-time">
                                  ⏱️ {item.prepTime} {t.mins}
                                </span>
                                {item.available ? (
                                  <button
                                    className="order-btn"
                                    onClick={(e) => handleQuickOrder(e, item)}
                                  >
                                    {t.order_now}
                                  </button>
                                ) : (
                                  <span className="out-label">
                                    {t.out_of_stock}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </article>
                      );
                    } else {
                      // Grid flat view for searches
                      return (
                        <article
                          key={item.name}
                          className="dish-card grid-item"
                          onClick={() => handleCardClick(item)}
                        >
                          <div
                            className="dish-img-wrap"
                            style={{ backgroundImage: `url(${item.image})` }}
                          >
                            {!item.available && (
                              <span className="avail-badge out">
                                {t.out_of_stock}
                              </span>
                            )}
                            <button
                              className={`fav-btn ${isFav ? "is-fav" : ""}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleFavorite(item.name);
                              }}
                            >
                              ♥
                            </button>
                          </div>
                          <div className="dish-info">
                            <h3>{item.name}</h3>
                            <div className="dish-meta">
                              <span className="dish-price">
                                {formatPrice(item.price, currency)}
                              </span>
                              {item.available ? (
                                <button
                                  className="quick-add-btn"
                                  onClick={(e) => handleQuickOrder(e, item)}
                                >
                                  {t.quick_order}
                                </button>
                              ) : (
                                <span className="out-label">
                                  {t.out_of_stock}
                                </span>
                              )}
                            </div>
                          </div>
                        </article>
                      );
                    }
                  })}
              </div>
            ) : (
              // ORIGINAL CUSTOMER VIEW (Alternating layout, Hero, See More, Footer, Offer banner)
              <div className="original-view-wrapper">
                <section id="hero" className="hero-section">
                  <div className="hero-copy">
                    <p className="hero-small">Biku Fine Restaurant</p>
                    <h1>Delicious Food, Unforgettable Moments</h1>
                    <p>
                      A perfect blend of taste, art, and ambiance. Crafted to
                      delight your senses with traditional Habesha hospitality.
                    </p>
                  </div>
                </section>

                {/* Alternating Sections list */}
                {dynamicMenuSections
                  .filter(
                    (sec) =>
                      activeCategory === "all" || sec.id === activeCategory,
                  )
                  .map((section, index) => {
                    const swapColumns = [
                      "foods",
                      "soft-drinks",
                      "juice",
                    ].includes(section.id);
                    const isExpanded = expandedSections[section.id] || false;
                    const initialItemsCount = 2;
                    const displayItems = isExpanded
                      ? section.items
                      : section.items.slice(0, initialItemsCount);
                    const isOddSection = index % 2 === 0;

                    if (section.items.length === 0) return null;

                    if (viewMode === "list") {
                      return (
                        <section
                          key={section.id}
                          id={section.id}
                          className="menu-section"
                        >
                          <div className="section-hero">
                            <span className="course-label">
                              Course {index + 1}.
                            </span>
                            <h2>{section.title}</h2>
                            <p>{section.subtitle}</p>
                          </div>
                          <div className="dishes-container view-list section-list-items">
                            {section.items.map((item) => {
                              const isFav = favorites.includes(item.name);
                              return (
                                <article
                                  key={item.name}
                                  className="dish-card list-item"
                                  onClick={() => handleCardClick(item)}
                                >
                                  <div
                                    className="list-img"
                                    style={{
                                      backgroundImage: `url(${item.image})`,
                                    }}
                                  >
                                    {!item.available && (
                                      <span className="avail-badge out">
                                        {t.out_of_stock}
                                      </span>
                                    )}
                                  </div>
                                  <div className="list-body">
                                    <div className="list-header">
                                      <div>
                                        <h3>{item.name}</h3>
                                        <span className="list-cat-label">
                                          {item.category}
                                        </span>
                                      </div>
                                      <button
                                        className={`fav-btn ${isFav ? "is-fav" : ""}`}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          toggleFavorite(item.name);
                                        }}
                                      >
                                        ♥
                                      </button>
                                    </div>
                                    <p className="list-desc">
                                      {item.description}
                                    </p>
                                    <div className="list-footer">
                                      <span className="dish-price">
                                        {formatPrice(item.price, currency)}
                                      </span>
                                      <div className="list-actions">
                                        <span className="list-prep-time">
                                          ⏱️ {item.prepTime} {t.mins}
                                        </span>
                                        {item.available ? (
                                          <button
                                            className="order-btn"
                                            onClick={(e) =>
                                              handleQuickOrder(e, item)
                                            }
                                          >
                                            {t.order_now}
                                          </button>
                                        ) : (
                                          <span className="out-label">
                                            {t.out_of_stock}
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </article>
                              );
                            })}
                          </div>
                        </section>
                      );
                    }

                    return (
                      <section
                        key={section.id}
                        id={section.id}
                        className="menu-section"
                      >
                        <div className="section-hero">
                          <span className="course-label">
                            Course {index + 1}.
                          </span>
                          <h2>{section.title}</h2>
                          <p>{section.subtitle}</p>
                        </div>
                        <div
                          className={`section-body ${swapColumns ? "swap" : ""}`}
                        >
                          {swapColumns ? (
                            <>
                              <div className="cards-column">
                                <div
                                  className={`cards-grid small-cards ${isOddSection ? "two-columns" : ""}`}
                                >
                                  {displayItems.map((item) => (
                                    <MenuCard
                                      key={item.name}
                                      item={item}
                                      isFav={favorites.includes(item.name)}
                                      onToggleFav={toggleFavorite}
                                      onClick={handleCardClick}
                                      onOrderClick={handleQuickOrder}
                                      t={t}
                                      currency={currency}
                                    />
                                  ))}
                                </div>
                                {section.items.length > initialItemsCount && (
                                  <button
                                    className="see-more"
                                    type="button"
                                    onClick={() => toggleExpanded(section.id)}
                                  >
                                    {isExpanded ? "See Less" : "See More"}
                                  </button>
                                )}
                              </div>
                              <div
                                className="section-feature-image"
                                style={{
                                  backgroundImage: `url(${section.items[0].image})`,
                                }}
                              />
                            </>
                          ) : (
                            <>
                              <div
                                className="section-feature-image"
                                style={{
                                  backgroundImage: `url(${section.items[0].image})`,
                                }}
                              />
                              <div className="cards-column">
                                <div
                                  className={`cards-grid small-cards ${isOddSection ? "two-columns" : ""}`}
                                >
                                  {displayItems.map((item) => (
                                    <MenuCard
                                      key={item.name}
                                      item={item}
                                      isFav={favorites.includes(item.name)}
                                      onToggleFav={toggleFavorite}
                                      onClick={handleCardClick}
                                      onOrderClick={handleQuickOrder}
                                      t={t}
                                      currency={currency}
                                    />
                                  ))}
                                </div>
                                {section.items.length > initialItemsCount && (
                                  <button
                                    className="see-more"
                                    type="button"
                                    onClick={() => toggleExpanded(section.id)}
                                  >
                                    {isExpanded ? "See Less" : "See More"}
                                  </button>
                                )}
                              </div>
                            </>
                          )}
                        </div>
                      </section>
                    );
                  })}

                {/* Special Offer section */}
                <section className="special-offer-section">
                  <div className="offer-copy">
                    <span className="offer-label">Special Offer</span>
                    <h2>Get 20% Off On Your First Order</h2>
                    <p>
                      Claim your welcome discount when dining at Biku Fine.
                      Savor our traditional stews, custom burgers, and
                      handcrafted pizzas.
                    </p>
                  </div>
                  <div className="offer-features">
                    <div className="offer-features-row">
                      <div>
                        <strong>Fresh Ingredients</strong>
                        <span>Farm to table selections daily</span>
                      </div>
                      <div>
                        <strong>Expert Chefs</strong>
                        <span>Passionate cooking staff</span>
                      </div>
                      <div>
                        <strong>Cozy Ambiance</strong>
                        <span>Perfect dining table space</span>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Site Footer */}
                <footer className="site-footer">
                  <div className="footer-container">
                    <div className="footer-brand">
                      <h3>Biku Fine</h3>
                      <p>
                        A modern dining experience designed around seasonal
                        flavors, thoughtfully composed dishes, and relaxed
                        hospitality.
                      </p>
                    </div>
                    <div className="footer-links">
                      <div className="footer-column">
                        <h4>Quick Links</h4>
                        <nav aria-label="Footer navigation">
                          <a href="#hero">Home</a>
                          <a href="#burger">Burgers</a>
                          <a href="#foods">Foods</a>
                          <a href="#pizza">Pizza</a>
                        </nav>
                      </div>
                      <div className="footer-column">
                        <h4>More</h4>
                        <nav aria-label="Footer navigation">
                          <a href="#soft-drinks">Drinks</a>
                          <a href="#juice">Juice</a>
                          <a href="#desserts">Desserts</a>
                          <a href="#hot-drinks">Coffee</a>
                        </nav>
                      </div>
                      <div className="footer-column">
                        <h4>Contact</h4>
                        <p>hello@bikufine.com</p>
                        <p>+251 911 123 456</p>
                      </div>
                    </div>
                  </div>
                  <div className="footer-bottom">
                    <p>© 2026 Biku Fine Digital Menu. All rights reserved.</p>
                  </div>
                </footer>
              </div>
            )}
          </div>
        )}

        {/* FAVORITES PAGE */}
        {activeTab === "favorites" && (
          <div className="favorites-view">
            <h2>{t.fav_title}</h2>
            {favorites.length === 0 ? (
              <div className="empty-state">
                <span className="heart-empty">🖤</span>
                <p>{t.no_fav}</p>
              </div>
            ) : (
              <div className="dishes-container view-grid">
                {menuItems
                  .filter(
                    (item) => favorites.includes(item.name) && item.available,
                  )
                  .map((item) => (
                    <article
                      key={item.name}
                      className="dish-card grid-item"
                      onClick={() => handleCardClick(item)}
                    >
                      <div
                        className="dish-img-wrap"
                        style={{ backgroundImage: `url(${item.image})` }}
                      >
                        <button
                          className="fav-btn is-fav"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(item.name);
                          }}
                        >
                          ♥
                        </button>
                      </div>
                      <div className="dish-info">
                        <h3>{item.name}</h3>
                        <div className="dish-meta">
                          <span className="dish-price">
                            {formatPrice(item.price, currency)}
                          </span>
                          <button
                            className="quick-add-btn"
                            onClick={(e) => handleQuickOrder(e, item)}
                          >
                            {t.quick_order}
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
              </div>
            )}
          </div>
        )}

        {/* ORDERS PAGE */}
        {activeTab === "orders" && (
          <div className="orders-view">
            <h2>{t.orders}</h2>
            {orders.length === 0 ? (
              <div className="empty-state">
                <span className="basket-empty">🛒</span>
                <p>{t.no_orders}</p>
              </div>
            ) : (
              <div className="orders-container">
                <div className="orders-section">
                  <h3>🔄 {t.current_orders}</h3>
                  {orders.filter(
                    (o) => !["Completed", "Cancelled"].includes(o.status),
                  ).length === 0 ? (
                    <p className="no-orders-sub">No active orders right now.</p>
                  ) : (
                    orders
                      .filter(
                        (o) => !["Completed", "Cancelled"].includes(o.status),
                      )
                      .map((order) => (
                        <div key={order.id} className="customer-order-card">
                          <div className="order-header-row">
                            <span className="order-id">{order.id}</span>
                            <span
                              className={`status-badge-lg status-${order.status}`}
                            >
                              {t[order.status] || order.status}
                            </span>
                          </div>
                          <div className="order-details-body">
                            <div className="order-time-row">
                              <span>
                                {t.table_num}: {order.table}
                              </span>
                              <span>
                                {new Date(
                                  order.timestamps.created,
                                ).toLocaleTimeString()}
                              </span>
                            </div>
                            <ul className="order-items-summary">
                              {order.items.map((it) => (
                                <li key={it.name}>
                                  {it.name} (x{it.quantity}) -{" "}
                                  {formatPrice(
                                    it.price * it.quantity,
                                    currency,
                                  )}
                                </li>
                              ))}
                            </ul>
                            <div className="status-timeline">
                              <div
                                className={`timeline-step ${["Pending", "Accepted", "Preparing", "Ready", "Served"].includes(order.status) ? "done" : ""}`}
                              >
                                <div className="step-dot" />
                                <span className="step-label">{t.Pending}</span>
                              </div>
                              <div
                                className={`timeline-step ${["Accepted", "Preparing", "Ready", "Served"].includes(order.status) ? "done" : ""}`}
                              >
                                <div className="step-dot" />
                                <span className="step-label">{t.Accepted}</span>
                              </div>
                              <div
                                className={`timeline-step ${["Preparing", "Ready", "Served"].includes(order.status) ? "done" : ""}`}
                              >
                                <div className="step-dot" />
                                <span className="step-label">
                                  {t.Preparing}
                                </span>
                              </div>
                              <div
                                className={`timeline-step ${["Ready", "Served"].includes(order.status) ? "done" : ""}`}
                              >
                                <div className="step-dot" />
                                <span className="step-label">{t.Ready}</span>
                              </div>
                              <div
                                className={`timeline-step ${["Served"].includes(order.status) ? "done" : ""}`}
                              >
                                <div className="step-dot" />
                                <span className="step-label">{t.Served}</span>
                              </div>
                            </div>
                            <div className="order-card-actions">
                              {order.status === "Pending" && (
                                <button
                                  className="cancel-order-btn"
                                  onClick={() => cancelOrder(order.id)}
                                >
                                  {t.cancel_order}
                                </button>
                              )}
                              {order.status === "Served" && (
                                <button
                                  className="confirm-order-btn"
                                  onClick={() => confirmReceipt(order.id)}
                                >
                                  {t.confirm_received}
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                  )}
                </div>
                <div className="orders-section past-orders">
                  <h3>📜 {t.past_orders}</h3>
                  {orders.filter((o) =>
                    ["Completed", "Cancelled"].includes(o.status),
                  ).length === 0 ? (
                    <p className="no-orders-sub">
                      No previous orders recorded.
                    </p>
                  ) : (
                    orders
                      .filter((o) =>
                        ["Completed", "Cancelled"].includes(o.status),
                      )
                      .map((order) => (
                        <div
                          key={order.id}
                          className="customer-order-card past"
                        >
                          <div className="order-header-row">
                            <span className="order-id">{order.id}</span>
                            <span
                              className={`status-badge-lg status-${order.status}`}
                            >
                              {t[order.status] || order.status}
                            </span>
                          </div>
                          <div className="order-details-body">
                            <div className="order-time-row">
                              <span>
                                {t.table_num}: {order.table}
                              </span>
                              <span>
                                {new Date(
                                  order.timestamps.created,
                                ).toLocaleDateString()}{" "}
                                {new Date(
                                  order.timestamps.created,
                                ).toLocaleTimeString()}
                              </span>
                            </div>
                            <ul className="order-items-summary">
                              {order.items.map((it) => (
                                <li key={it.name}>
                                  {it.name} (x{it.quantity}) -{" "}
                                  {formatPrice(
                                    it.price * it.quantity,
                                    currency,
                                  )}
                                </li>
                              ))}
                            </ul>
                            <div className="order-completion-status">
                              {order.status === "Completed" ? (
                                <p className="green">✓ {t.receipt_confirmed}</p>
                              ) : (
                                <p className="red">✗ {t.order_cancelled}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* FEEDBACK PAGE */}
        {activeTab === "feedback" && (
          <div className="feedback-view-container">
            <h2>{t.feedback}</h2>
            <div className="feedback-card">
              <h3>{t.rate_us}</h3>
              {feedbackSubmitted ? (
                <div className="feedback-success-msg">
                  <span>🎉</span>
                  <p>{t.feedback_success}</p>
                </div>
              ) : (
                <form onSubmit={submitFeedbackForm}>
                  <div className="rating-selector">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        className={
                          feedbackRating >= star ? "star filled" : "star"
                        }
                        onClick={() => setFeedbackRating(star)}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                  <div className="form-group">
                    <label>Feedback Type</label>
                    <div className="type-options">
                      {["Suggestion", "Issue Report", "Compliment"].map(
                        (type) => (
                          <button
                            key={type}
                            type="button"
                            className={
                              feedbackType === type
                                ? "type-tab active"
                                : "type-tab"
                            }
                            onClick={() => setFeedbackType(type)}
                          >
                            {type === "Suggestion" && t.type_suggestion}
                            {type === "Issue Report" && t.type_issue}
                            {type === "Compliment" && t.type_compliment}
                          </button>
                        ),
                      )}
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Comment</label>
                    <textarea
                      placeholder={t.feedback_placeholder}
                      value={feedbackComment}
                      onChange={(e) => setFeedbackComment(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="feedback-submit-btn">
                    {t.submit_feedback}
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

        {/* SETTINGS PAGE */}
        {activeTab === "settings" && (
          <div className="settings-view-container">
            <h2>{t.settings}</h2>
            <div className="settings-card">
              <div className="setting-row">
                <div className="setting-info">
                  <h3>{t.language}</h3>
                  <p>Choose your preferred language</p>
                </div>
                <div className="setting-control">
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                  >
                    <option value="en">English</option>
                    <option value="am">አማርኛ (Amharic)</option>
                    <option value="om">Afaan Oromo</option>
                  </select>
                </div>
              </div>
              <div className="setting-row">
                <div className="setting-info">
                  <h3>{t.currency}</h3>
                  <p>Prices convert automatically</p>
                </div>
                <div className="setting-control">
                  <div className="currency-selector">
                    <button
                      className={currency === "USD" ? "active" : ""}
                      onClick={() => setCurrency("USD")}
                    >
                      USD ($)
                    </button>
                    <button
                      className={currency === "ETB" ? "active" : ""}
                      onClick={() => setCurrency("ETB")}
                    >
                      ETB (Br)
                    </button>
                  </div>
                </div>
              </div>
              <div className="setting-row">
                <div className="setting-info">
                  <h3>{t.dark_mode}</h3>
                  <p>Toggle display theme</p>
                </div>
                <div className="setting-control">
                  <button
                    className="toggle-theme-btn"
                    onClick={() => setDarkMode(!darkMode)}
                  >
                    {darkMode ? `🌙 ${t.dark_mode}` : `☀️ ${t.light_mode}`}
                  </button>
                </div>
              </div>
              <div className="setting-row">
                <div className="setting-info">
                  <h3>{t.notifications}</h3>
                  <p>Receive live updates on your order</p>
                </div>
                <div className="setting-control">
                  <button
                    className={`toggle-switch-btn ${notifications ? "on" : "off"}`}
                    onClick={() => setNotifications(!notifications)}
                  >
                    {notifications ? "Enabled" : "Disabled"}
                  </button>
                </div>
              </div>
              <div className="about-section-settings">
                <h3>📜 {t.about_us}</h3>
                <p>{t.about_desc}</p>
                <div className="settings-contact">
                  <h4>📞 {t.contact_info}</h4>
                  <p>Email: hello@bikufine.com</p>
                  <p>Phone: +251 911 123 456</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* AUTH LOGIN PAGE */}
        {activeTab === "auth" && (
          <AuthPage
            language={language}
            onBackToGuest={() => setActiveTab("menu")}
          />
        )}
      </main>

      {/* BOTTOM NAVIGATION */}
      <nav className="bottom-nav">
        <button
          className={activeTab === "menu" ? "nav-item active" : "nav-item"}
          onClick={() => {
            setActiveTab("menu");
            setSelectedItem(null);
          }}
        >
          <span className="nav-icon">
            <HomeIcon />
          </span>
          <span className="nav-label">{t.home}</span>
        </button>
        <button
          className={activeTab === "favorites" ? "nav-item active" : "nav-item"}
          onClick={() => {
            setActiveTab("favorites");
            setSelectedItem(null);
          }}
        >
          <span className="nav-icon">
            <HeartIcon />
          </span>
          <span className="nav-label">{t.favorites}</span>
        </button>
        <button
          className={activeTab === "orders" ? "nav-item active" : "nav-item"}
          onClick={() => {
            setActiveTab("orders");
            setSelectedItem(null);
          }}
        >
          <span className="nav-icon">
            <OrdersIcon />
          </span>
          <span className="nav-label">{t.orders}</span>
        </button>
        <button
          className={activeTab === "feedback" ? "nav-item active" : "nav-item"}
          onClick={() => {
            setActiveTab("feedback");
            setSelectedItem(null);
          }}
        >
          <span className="nav-icon">
            <FeedbackIcon />
          </span>
          <span className="nav-label">{t.feedback}</span>
        </button>
        <button
          className={activeTab === "settings" ? "nav-item active" : "nav-item"}
          onClick={() => {
            setActiveTab("settings");
            setSelectedItem(null);
          }}
        >
          <span className="nav-icon">
            <SettingsIcon />
          </span>
          <span className="nav-label">{t.settings}</span>
        </button>
      </nav>

      {/* ITEM DETAILS MODAL */}
      {selectedItem && (
        <div className="modal-overlay" onClick={() => setSelectedItem(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setSelectedItem(null)}
            >
              ×
            </button>
            <div
              className="modal-image"
              style={{ backgroundImage: `url(${selectedItem.image})` }}
            />
            <div className="modal-details">
              <div className="modal-header-row">
                <h2>{selectedItem.name}</h2>
                <span className="modal-category">{selectedItem.category}</span>
              </div>
              <p className="modal-description">{selectedItem.description}</p>
              <div className="modal-metadata-grid">
                <div>
                  <strong>⏱️ {t.estimated_time}:</strong>
                  <span>
                    {selectedItem.prepTime || 15} {t.mins}
                  </span>
                </div>
                <div>
                  <strong>Availability:</strong>
                  <span className={selectedItem.available ? "green" : "red"}>
                    {selectedItem.available ? t.available : t.out_of_stock}
                  </span>
                </div>
              </div>
              {selectedItem.ingredients &&
                selectedItem.ingredients.length > 0 && (
                  <div className="modal-ingredients-section">
                    <h4>🥒 {t.ingredients}</h4>
                    <div className="ingredients-pills">
                      {selectedItem.ingredients.map((ing) => (
                        <span key={ing} className="ing-pill">
                          {ing}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              {selectedItem.allergens && selectedItem.allergens.length > 0 && (
                <div className="modal-allergens-section">
                  <h4>⚠️ {t.allergens}</h4>
                  <div className="allergens-pills">
                    {selectedItem.allergens.map((all) => (
                      <span key={all} className="all-pill">
                        {all}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              <div className="modal-footer-row">
                <span className="modal-price">
                  {formatPrice(selectedItem.price, currency)}
                </span>
                <div className="modal-actions-wrap">
                  <button
                    className={`fav-toggle-modal-btn ${favorites.includes(selectedItem.name) ? "favorited" : ""}`}
                    onClick={() => toggleFavorite(selectedItem.name)}
                  >
                    {favorites.includes(selectedItem.name)
                      ? `♥ ${t.remove_fav}`
                      : `♡ ${t.add_to_fav}`}
                  </button>
                  {selectedItem.available ? (
                    <button
                      className="modal-order-btn"
                      onClick={() => handleModalOrder(selectedItem)}
                    >
                      {t.order_now}
                    </button>
                  ) : (
                    <span className="out-badge-modal">{t.out_of_stock}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* QUICK ORDER MODAL */}
      {checkoutItem && (
        <div className="modal-overlay" onClick={() => setCheckoutItem(null)}>
          <div
            className="modal-content checkout-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setCheckoutItem(null)}
            >
              ×
            </button>
            <h3>🛒 {t.order_conf}</h3>
            <div className="checkout-summary-card">
              <div className="checkout-item-row">
                <div
                  className="checkout-item-img"
                  style={{ backgroundImage: `url(${checkoutItem.image})` }}
                />
                <div className="checkout-item-details">
                  <h4>{checkoutItem.name}</h4>
                  <p>{formatPrice(checkoutItem.price, currency)}</p>
                </div>
              </div>
              <div className="checkout-form-row quantity-selector-row">
                <label>{t.quantity}</label>
                <div className="qty-picker">
                  <button
                    onClick={() =>
                      setOrderQuantity((prev) => Math.max(1, prev - 1))
                    }
                  >
                    −
                  </button>
                  <span>{orderQuantity}</span>
                  <button onClick={() => setOrderQuantity((prev) => prev + 1)}>
                    +
                  </button>
                </div>
              </div>
              <div className="checkout-form-row">
                <label>{t.table_num}</label>
                <select
                  value={tableNumber}
                  onChange={(e) => setTableNumber(e.target.value)}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                    <option key={n} value={`Table ${n}`}>
                      Table {n}
                    </option>
                  ))}
                </select>
              </div>
              <div className="checkout-form-row">
                <label>Kitchen Notes (Optional)</label>
                <input
                  type="text"
                  placeholder={t.special_notes}
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                />
              </div>
              <div className="checkout-total-row">
                <span>Total:</span>
                <strong>
                  {formatPrice(checkoutItem.price * orderQuantity, currency)}
                </strong>
              </div>
              <div className="checkout-actions">
                <button
                  className="checkout-cancel-btn"
                  onClick={() => setCheckoutItem(null)}
                >
                  {t.cancel}
                </button>
                <button
                  className="checkout-submit-btn"
                  onClick={handleConfirmOrder}
                >
                  🚀 {t.place_order_btn}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <DatabaseProvider>
      <AppContent />
    </DatabaseProvider>
  );
}

export default App;
