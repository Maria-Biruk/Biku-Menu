import React, { createContext, useContext, useState, useEffect } from "react";

const DatabaseContext = createContext(null);

const DEFAULT_USERS = [
  { username: "admin", password: "admin123", role: "admin", name: "Main Admin", disabled: false },
  { username: "kitchen", password: "kitchen123", role: "kitchen", name: "Chef Joseph", disabled: false },
  { username: "waiter", password: "waiter123", role: "waiter", name: "Waiter Abebe", disabled: false },
];

const INITIAL_MENU_SECTIONS = [
  {
    id: "burger",
    items: [
      { name: "Classic Beef Burger", description: "Beef patty, lettuce, tomato, house sauce", price: 15, rating: 4.5, image: "https://www.thefoodnearme.com/wp-content/uploads/2025/04/The-Ultimate-Classic-Cheeseburger-with-Perfect-Melted-Cheese-Drip-A-Complete-Guide.webp", allergens: ["Gluten", "Dairy"], ingredients: ["Beef patty", "Lettuce", "Tomato", "House sauce", "Burger bun"], prepTime: 12 },
      { name: "Cheese Burger", description: "Beef patty, melted cheddar, pickles, mustard", price: 16, rating: 4.6, image: "https://easychickenrecipes.com/wp-content/uploads/2023/06/grilled-chicken-sandwich-3-of-6-edited.jpg", allergens: ["Gluten", "Dairy"], ingredients: ["Beef patty", "Cheddar cheese", "Pickles", "Mustard", "Burger bun"], prepTime: 10 },
      { name: "Chicken Burger", description: "Grilled chicken breast, lettuce, mayo, tomato", price: 14, rating: 4.5, image: "https://api.photon.aremedia.net.au/wp-content/uploads/sites/12/media/53214/ed-burger.jpg?resize=1200%2C630", allergens: ["Gluten", "Dairy"], ingredients: ["Chicken breast", "Lettuce", "Mayo", "Tomato", "Burger bun"], prepTime: 15 },
      { name: "Double Beef Burger", description: "Two beef patties, double cheese, onion, ketchup", price: 18, rating: 4.7, image: "https://insanelygoodrecipes.com/wp-content/uploads/2024/08/Homemade-Mushroom-Swiss-Burger.jpg", allergens: ["Gluten", "Dairy"], ingredients: ["2x Beef patty", "Double Cheddar", "Onions", "Ketchup", "Burger bun"], prepTime: 18 },
      { name: "Mushroom Swiss Burger", description: "Beef patty, sautéed mushrooms, Swiss cheese", price: 17, rating: 4.6, image: "https://lilicooks.com/assets/images/1765201701258-d0lor5bp.webp", allergens: ["Gluten", "Dairy"], ingredients: ["Beef patty", "Mushrooms", "Swiss cheese", "Burger bun"], prepTime: 14 },
      { name: "BBQ Bacon Burger", description: "Beef patty, crispy bacon, BBQ sauce, cheddar", price: 18, rating: 4.7, image: "https://satisfyyourcravings.com/wp-content/uploads/2024/05/Spicy-Jalapeno-Cheeseburger-768x769.png", allergens: ["Gluten", "Dairy", "Pork"], ingredients: ["Beef patty", "Bacon", "BBQ Sauce", "Cheddar", "Burger bun"], prepTime: 15 },
      { name: "Spicy Jalapeño Burger", description: "Beef patty, jalapeños, pepper jack cheese, spicy mayo", price: 16, rating: 4.5, image: "https://www.noracooks.com/wp-content/uploads/2023/04/veggie-burgers-1-2.jpg", allergens: ["Gluten", "Dairy"], ingredients: ["Beef patty", "Jalapeños", "Pepper Jack", "Spicy Mayo", "Burger bun"], prepTime: 13 },
      { name: "Veggie Burger", description: "Veggie patty, lettuce, tomato, tahini sauce", price: 15, rating: 4.4, image: "https://www.truthrecipes.com/wp-content/uploads/2024/12/ezzeroual1_A_cutaway_view_of_the_Burger_King_Fish_Sandwich_show_db05f2d8-34fa-4138-a218-5014504d1ddc.png", allergens: ["Gluten"], ingredients: ["Veggie patty", "Lettuce", "Tomato", "Tahini", "Burger bun"], prepTime: 12 },
      { name: "Fish Burger", description: "Fried fish fillet, lettuce, tartar sauce", price: 17, rating: 4.6, image: "https://whaleycooks.com/wp-content/uploads/2026/02/temp_1771511143689.jpg", allergens: ["Gluten", "Fish"], ingredients: ["Fish fillet", "Lettuce", "Tartar sauce", "Burger bun"], prepTime: 14 },
      { name: "Ethiopian Spiced Burger", description: "Beef patty, berbere spice, mayo, red onion", price: 19, rating: 4.8, image: "https://images.unsplash.com/photo-1585238341710-4913d3a3a48f?auto=format&fit=crop&w=900&q=80", allergens: ["Gluten", "Dairy"], ingredients: ["Beef patty", "Berbere", "Mayo", "Red onion", "Burger bun"], prepTime: 14 },
      { name: "Egg & Bacon Burger", description: "Beef patty, fried egg, bacon, cheddar", price: 18, rating: 4.7, image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=900&q=80", allergens: ["Gluten", "Dairy", "Pork"], ingredients: ["Beef patty", "Fried egg", "Bacon", "Cheddar", "Burger bun"], prepTime: 16 },
      { name: "Habesha Lamb Burger", description: "Spiced lamb patty, berbere, awaze mayo, red onion", price: 20, rating: 4.9, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80", allergens: ["Gluten"], ingredients: ["Lamb patty", "Berbere", "Awaze", "Red onion", "Burger bun"], prepTime: 18 }
    ]
  },
  {
    id: "foods",
    items: [
      { name: "Doro Wat", description: "Chicken, berbere sauce, hard-boiled egg, onion", price: 18, rating: 4.9, image: "https://seeafricatoday.com/wp-content/uploads/2024/04/Doro-Wat-Ethiopian.jpg", allergens: ["Eggs"], ingredients: ["Chicken drumsticks", "Berbere", "Boiled egg", "Onions", "Injera"], prepTime: 25 },
      { name: "Tibs", description: "Sautéed meat, onion, garlic, rosemary", price: 20, rating: 4.8, image: "https://madebyranis.com/wp-content/uploads/2025/12/89eb058e-3d1e-40d0-bd4f-b2b0060e525ftl_vqrg4m.webp", allergens: [], ingredients: ["Beef chunks", "Onions", "Garlic", "Rosemary", "Jalapeño", "Injera"], prepTime: 15 },
      { name: "Kitfo", description: "Minced raw beef, mitmita spice, clarified butter", price: 22, rating: 4.9, image: "https://migrationology.com/wp-content/uploads/2013/10/kitfo1.jpg", allergens: ["Dairy"], ingredients: ["Minced beef", "Mitmita", "Clarified butter (Niter Kibbeh)", "Ayib cheese", "Injera"], prepTime: 12 },
      { name: "Shiro Wat", description: "Chickpea powder, garlic, onion, berbere", price: 15, rating: 4.7, image: "https://happyspicyhour.com/wp-content/uploads/2026/03/shiro-wat-ethiopian-chickpea-stew.webp", allergens: [], ingredients: ["Chickpea powder", "Garlic", "Onion", "Berbere spice", "Injera"], prepTime: 15 },
      { name: "Injera with Mixed Vegetables", description: "Injera, lentils, cabbage, collard greens", price: 16, rating: 4.8, image: "https://nummyrecipes.com/wp-content/uploads/2025/08/Beyaynetu.jpg", allergens: [], ingredients: ["Injera", "Red Lentils", "Yellow split peas", "Cabbage", "Collard greens", "Carrots"], prepTime: 15 },
      { name: "Gomen", description: "Collard greens, garlic, onion, spices", price: 12, rating: 4.6, image: "https://cookingwithalisa.com/wp-content/uploads/2021/02/Ethiopia-Gomen-plated-close-up-better.jpg", allergens: [], ingredients: ["Collard greens", "Garlic", "Onion", "Ginger", "Spices"], prepTime: 10 },
      { name: "Key Wat", description: "Beef, berbere sauce, onion, garlic", price: 19, rating: 4.8, image: "https://i.pinimg.com/originals/07/83/9c/07839c6832bd22b56d5af84f49bf69a5.jpg", allergens: [], ingredients: ["Beef", "Berbere", "Onion", "Garlic", "Injera"], prepTime: 20 },
      { name: "Fasting Combo Platter", description: "Lentils, shiro, gomen, injera", price: 17, rating: 4.7, image: "https://i.pinimg.com/originals/8a/61/d2/8a61d2da682bd6d83e042a5bf6bf33ce.jpg", allergens: [], ingredients: ["Injera", "Shiro", "Lentil stew", "Gomen", "Salad"], prepTime: 15 },
      { name: "Pasta", description: "Pasta, tomato sauce, herbs, parmesan", price: 16, rating: 4.6, image: "https://thumbs.dreamstime.com/b/tomato-spaghetti-black-plate-dark-slate-table-sauce-pasta-classic-italian-cuisine-dish-food-background-popular-186210056.jpg", allergens: ["Gluten", "Dairy"], ingredients: ["Pasta", "Tomato sauce", "Herbs", "Parmesan cheese"], prepTime: 12 },
      { name: "Grilled Fish", description: "Fish fillet, onion, tomato, spices", price: 21, rating: 4.8, image: "https://thumbs.dreamstime.com/b/platter-ethiopian-grilled-fish-salad-injera-bread-cuisine-whole-lemon-wedges-spongy-flat-205226614.jpg", allergens: ["Fish"], ingredients: ["Fish fillet", "Onions", "Tomatoes", "Spices", "Lemon"], prepTime: 18 }
    ]
  },
  {
    id: "pizza",
    items: [
      { name: "Margherita", description: "Tomato sauce, mozzarella, fresh basil", price: 14, rating: 4.5, image: "https://ohsweetbasil.com/wp-content/uploads/how-to-make-authentic-margherita-pizza-at-home-recipe-4.jpg", allergens: ["Gluten", "Dairy"], ingredients: ["Pizza dough", "Tomato sauce", "Mozzarella", "Fresh basil"], prepTime: 10 },
      { name: "Pepperoni", description: "Tomato sauce, mozzarella, pepperoni slices", price: 15, rating: 4.6, image: "https://static.vecteezy.com/system/resources/previews/060/302/560/non_2x/delicious-pepperoni-pizza-slice-isolated-on-transparent-background-png.png", allergens: ["Gluten", "Dairy"], ingredients: ["Pizza dough", "Tomato sauce", "Mozzarella", "Pepperoni"], prepTime: 11 },
      { name: "Vegetarian Special", description: "Bell peppers, mushrooms, olives, onion", price: 16, rating: 4.7, image: "https://kristineskitchenblog.com/wp-content/uploads/2024/12/veggie-pizza-recipe-09.jpg", allergens: ["Gluten", "Dairy"], ingredients: ["Pizza dough", "Tomato sauce", "Mozzarella", "Bell peppers", "Mushrooms", "Olives", "Onion"], prepTime: 12 },
      { name: "BBQ Chicken", description: "Grilled chicken, BBQ sauce, red onion, mozzarella", price: 17, rating: 4.8, image: "https://therecipemingle.com/wp-content/uploads/2025/04/salah_pu8659_BBQ_Chicken_Pizza_a_cheesy_smoky_and_slightly_ta_1d207187-119f-4bb2-8a86-42110ea48c6f_2.png", allergens: ["Gluten", "Dairy"], ingredients: ["Pizza dough", "BBQ sauce", "Grilled chicken", "Red onion", "Mozzarella"], prepTime: 13 },
      { name: "Four Cheese", description: "Mozzarella, gorgonzola, parmesan, provolone", price: 18, rating: 4.7, image: "https://kitchenatics.com/wp-content/uploads/2020/09/Cheese-pizza-1.jpg", allergens: ["Gluten", "Dairy"], ingredients: ["Pizza dough", "Mozzarella", "Gorgonzola", "Parmesan", "Provolone"], prepTime: 10 },
      { name: "Hawaiian", description: "Ham, pineapple, mozzarella", price: 16, rating: 4.5, image: "https://i.ytimg.com/vi/q_4GlkxWzas/maxresdefault.jpg", allergens: ["Gluten", "Dairy"], ingredients: ["Pizza dough", "Tomato sauce", "Mozzarella", "Ham", "Pineapple"], prepTime: 11 },
      { name: "Meat Lovers", description: "Pepperoni, sausage, bacon, ground beef", price: 19, rating: 4.8, image: "https://chasety.com/wp-content/uploads/2024/05/realchasecurtis_Meat_Lovers_Pizza_sitting_on_parchment_paper_on_dc92db32-1213-4e66-b7e1-0d34e0506af1.png", allergens: ["Gluten", "Dairy", "Pork"], ingredients: ["Pizza dough", "Tomato sauce", "Mozzarella", "Pepperoni", "Sausage", "Bacon", "Beef"], prepTime: 14 },
      { name: "Mushroom & Truffle", description: "Mushrooms, truffle oil, mozzarella, thyme", price: 20, rating: 4.9, image: "https://itsonly.recipes/images/recipeimages/savory-mushroom-truffle-pizza.webp", allergens: ["Gluten", "Dairy"], ingredients: ["Pizza dough", "Mozzarella", "Mushrooms", "Truffle oil", "Thyme"], prepTime: 13 }
    ]
  },
  {
    id: "soft-drinks",
    items: [
      { name: "Coca-Cola", description: "Classic cola served chilled", price: 3, rating: 4.5, image: "https://c8.alamy.com/comp/M4ETGJ/bottles-and-cans-of-coca-cola-M4ETGJ.jpg", allergens: [], ingredients: ["Carbonated Water", "Sugar", "Caramel Color", "Caffeine"], prepTime: 2 },
      { name: "Pepsi", description: "Refreshing cola with a crisp taste", price: 3, rating: 4.4, image: "https://upload.wikimedia.org/wikipedia/commons/d/dd/Pepsi_Can.jpg", allergens: [], ingredients: ["Carbonated Water", "Sugar", "Color", "Caffeine"], prepTime: 2 },
      { name: "Sprite", description: "Lemon-lime soda, crisp and refreshing", price: 3, rating: 4.5, image: "https://pngfre.com/wp-content/uploads/Sprite-24.png", allergens: [], ingredients: ["Carbonated Water", "Sugar", "Citric Acid", "Lemon/Lime Flavor"], prepTime: 2 },
      { name: "Fanta (Orange)", description: "Sweet orange soda", price: 3, rating: 4.4, image: "https://assets.stickpng.com/images/580b57fbd9996e24bc43c10f.png", allergens: [], ingredients: ["Carbonated Water", "Sugar", "Orange Flavor"], prepTime: 2 },
      { name: "Ambo Water", description: "Ethiopian sparkling mineral water", price: 2, rating: 4.6, image: "https://img.sewasew.com/definitions/6ea0bb334b724267820e02c1b81e774c_159_318", allergens: [], ingredients: ["Natural Sparkling Mineral Water"], prepTime: 1 }
    ]
  },
  {
    id: "juice",
    items: [
      { name: "Avocado Juice", description: "Avocado, milk, sugar", price: 6, rating: 4.8, image: "https://fitfoodiefinds.com/wp-content/uploads/2021/02/avocado-smoothie-7.jpg", allergens: ["Dairy"], ingredients: ["Fresh Avocado", "Milk", "Sugar", "Lime juice squeeze"], prepTime: 5 },
      { name: "Mango Juice", description: "Fresh mango, water, sugar", price: 5, rating: 4.7, image: "https://www.crazyvegankitchen.com/wp-content/uploads/2023/06/mango-juice-recipe.jpg", allergens: [], ingredients: ["Fresh Mango", "Water", "Sugar"], prepTime: 5 },
      { name: "Papaya Juice", description: "Fresh papaya, water, sugar", price: 5, rating: 4.6, image: "https://cooksavor.com/wp-content/uploads/2025/07/featured_papaya_juice_final_glass-1024x1024.jpg", allergens: [], ingredients: ["Fresh Papaya", "Water", "Sugar"], prepTime: 5 },
      { name: "Mixed Fruit Spris", description: "Layered avocado, mango, papaya juice", price: 7, rating: 4.9, image: "https://ethiopian-food.org/wp-content/uploads/2024/02/Spris-Ethiopian-Layered-Juice-Recipe.jpg", allergens: ["Dairy"], ingredients: ["Fresh Avocado", "Fresh Mango", "Fresh Papaya", "Lime Drizzle", "Optional Milk Layer"], prepTime: 8 }
    ]
  },
  {
    id: "desserts",
    items: [
      { name: "Baklava", description: "Phyllo dough, chopped nuts, honey syrup", price: 7, rating: 4.8, image: "https://www.modernhoney.com/wp-content/uploads/2023/03/Baklava-8-crop-scaled.jpg", allergens: ["Gluten", "Nuts"], ingredients: ["Phyllo pastry", "Walnuts/Pistachios", "Butter", "Honey Syrup"], prepTime: 5 },
      { name: "Fruit Salad", description: "Mixed seasonal fruits, honey drizzle", price: 6, rating: 4.6, image: "https://theforkedspoon.com/wp-content/uploads/2019/07/Fruit-Salad-3-700x1050.jpg", allergens: [], ingredients: ["Banana", "Mango", "Papaya", "Apple", "Strawberry", "Honey"], prepTime: 6 },
      { name: "Chocolate Cake", description: "Cocoa, flour, sugar, butter", price: 8, rating: 4.7, image: "https://www.cookingclassy.com/wp-content/uploads/2019/10/chocolate-cake-3.jpg", allergens: ["Gluten", "Dairy", "Eggs"], ingredients: ["Cocoa powder", "Wheat flour", "Sugar", "Butter", "Eggs"], prepTime: 5 }
    ]
  },
  {
    id: "hot-drinks",
    items: [
      { name: "Ethiopian Buna", description: "Roasted coffee beans, traditional ceremony brew", price: 4, rating: 4.9, image: "https://www.whatsoutaddis.com/wp-content/uploads/2023/01/EonRvPEXIAUWeZK.jpg", allergens: [], ingredients: ["Roasted Coffee Beans", "Water", "Incense styling (ceremony)"], prepTime: 10 },
      { name: "Macchiato", description: "Espresso, a touch of steamed milk", price: 4, rating: 4.7, image: "https://www.handycookbook.com/wp-content/uploads/2023/04/Macchiato-.jpeg", allergens: ["Dairy"], ingredients: ["Espresso shot", "Steamed milk", "Milk foam"], prepTime: 3 },
      { name: "Spiced Tea", description: "Black tea, cinnamon, cloves, cardamom", price: 3, rating: 4.6, image: "https://thebalemoya.com/cdn/shop/articles/ethiopiantea.png?v=1709920159", allergens: [], ingredients: ["Black tea leaves", "Cinnamon bark", "Cloves", "Cardamom", "Water"], prepTime: 4 }
    ]
  }
];

// Flatten the initial items and add standard fields
const INITIAL_MENU_ITEMS = INITIAL_MENU_SECTIONS.flatMap(section => 
  section.items.map(item => ({
    ...item,
    category: section.id,
    available: true,
  }))
);

export function DatabaseProvider({ children }) {
  const [menuItems, setMenuItems] = useState(() => {
    const data = localStorage.getItem("dm_menu_items");
    return data ? JSON.parse(data) : INITIAL_MENU_ITEMS;
  });

  const [users, setUsers] = useState(() => {
    const data = localStorage.getItem("dm_users");
    return data ? JSON.parse(data) : DEFAULT_USERS;
  });

  const [orders, setOrders] = useState(() => {
    const data = localStorage.getItem("dm_orders");
    return data ? JSON.parse(data) : [];
  });

  const [favorites, setFavorites] = useState(() => {
    const data = localStorage.getItem("dm_favorites");
    return data ? JSON.parse(data) : [];
  });

  const [feedbacks, setFeedbacks] = useState(() => {
    const data = localStorage.getItem("dm_feedbacks");
    return data ? JSON.parse(data) : [];
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const data = sessionStorage.getItem("dm_current_user");
    return data ? JSON.parse(data) : null;
  });

  // Save changes to localStorage helper
  const saveState = (key, value, setter) => {
    setter(value);
    localStorage.setItem(key, JSON.stringify(value));
  };

  // Listen for storage events (cross-tab synchronization)
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "dm_menu_items" && e.newValue) {
        setMenuItems(JSON.parse(e.newValue));
      } else if (e.key === "dm_orders" && e.newValue) {
        setOrders(JSON.parse(e.newValue));
      } else if (e.key === "dm_users" && e.newValue) {
        setUsers(JSON.parse(e.newValue));
      } else if (e.key === "dm_favorites" && e.newValue) {
        setFavorites(JSON.parse(e.newValue));
      } else if (e.key === "dm_feedbacks" && e.newValue) {
        setFeedbacks(JSON.parse(e.newValue));
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Customer Actions
  const placeOrder = (items, tableNo, notes) => {
    const newOrder = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      table: tableNo || "Table 5",
      items,
      notes: notes || "",
      status: "Pending",
      timestamps: {
        created: new Date().toISOString(),
        accepted: null,
        preparing: null,
        ready: null,
        served: null,
        completed: null,
      },
    };
    const updatedOrders = [newOrder, ...orders];
    saveState("dm_orders", updatedOrders, setOrders);
    return newOrder;
  };

  const cancelOrder = (orderId) => {
    const order = orders.find(o => o.id === orderId);
    if (!order || order.status !== "Pending") return false;
    const updatedOrders = orders.map(o => 
      o.id === orderId ? { ...o, status: "Cancelled", timestamps: { ...o.timestamps, completed: new Date().toISOString() } } : o
    );
    saveState("dm_orders", updatedOrders, setOrders);
    return true;
  };

  const confirmReceipt = (orderId) => {
    const order = orders.find(o => o.id === orderId);
    if (!order || order.status !== "Served") return false;
    const updatedOrders = orders.map(o => 
      o.id === orderId ? { ...o, status: "Completed", timestamps: { ...o.timestamps, completed: new Date().toISOString() } } : o
    );
    saveState("dm_orders", updatedOrders, setOrders);
    return true;
  };

  const toggleFavorite = (itemName) => {
    let updated;
    if (favorites.includes(itemName)) {
      updated = favorites.filter(name => name !== itemName);
    } else {
      updated = [...favorites, itemName];
    }
    saveState("dm_favorites", updated, setFavorites);
  };

  const addFeedback = (rating, comment, type) => {
    const newFeedback = {
      id: `FB-${Date.now()}`,
      rating,
      comment,
      type: type || "Suggestion",
      timestamp: new Date().toISOString(),
    };
    const updated = [newFeedback, ...feedbacks];
    saveState("dm_feedbacks", updated, setFeedbacks);
  };

  // Kitchen Actions
  const kitchenAcceptOrder = (orderId) => {
    const updatedOrders = orders.map(o => 
      o.id === orderId ? { ...o, status: "Accepted", timestamps: { ...o.timestamps, accepted: new Date().toISOString() } } : o
    );
    saveState("dm_orders", updatedOrders, setOrders);
  };

  const kitchenStartPreparing = (orderId) => {
    const updatedOrders = orders.map(o => 
      o.id === orderId ? { ...o, status: "Preparing", timestamps: { ...o.timestamps, preparing: new Date().toISOString() } } : o
    );
    saveState("dm_orders", updatedOrders, setOrders);
  };

  const kitchenMarkReady = (orderId) => {
    const updatedOrders = orders.map(o => 
      o.id === orderId ? { ...o, status: "Ready", timestamps: { ...o.timestamps, ready: new Date().toISOString() } } : o
    );
    saveState("dm_orders", updatedOrders, setOrders);
  };

  const kitchenMarkCompleted = (orderId) => {
    const updatedOrders = orders.map(o => 
      o.id === orderId ? { ...o, status: "Ready", timestamps: { ...o.timestamps, ready: new Date().toISOString() } } : o
    );
    saveState("dm_orders", updatedOrders, setOrders);
  };

  const toggleItemAvailability = (itemName, isAvailable) => {
    const updatedMenu = menuItems.map(item => 
      item.name === itemName ? { ...item, available: isAvailable } : item
    );
    saveState("dm_menu_items", updatedMenu, setMenuItems);
  };

  // Waiter Actions
  const waiterMarkServed = (orderId) => {
    const updatedOrders = orders.map(o => 
      o.id === orderId ? { ...o, status: "Served", timestamps: { ...o.timestamps, served: new Date().toISOString() } } : o
    );
    saveState("dm_orders", updatedOrders, setOrders);
  };

  // Admin CRUD for Menu Items
  const addMenuItem = (item) => {
    const updated = [...menuItems, { ...item, available: true }];
    saveState("dm_menu_items", updated, setMenuItems);
  };

  const updateMenuItem = (oldName, updatedItem) => {
    const updated = menuItems.map(item => 
      item.name === oldName ? { ...item, ...updatedItem } : item
    );
    saveState("dm_menu_items", updated, setMenuItems);
  };

  const deleteMenuItem = (itemName) => {
    const updated = menuItems.filter(item => item.name !== itemName);
    saveState("dm_menu_items", updated, setMenuItems);
  };

  // Admin CRUD for Users
  const addUser = (newUser) => {
    const updated = [...users, { ...newUser, disabled: false }];
    saveState("dm_users", updated, setUsers);
  };

  const updateUser = (username, updatedFields) => {
    const updated = users.map(u => 
      u.username === username ? { ...u, ...updatedFields } : u
    );
    saveState("dm_users", updated, setUsers);
  };

  const deleteUser = (username) => {
    const updated = users.filter(u => u.username !== username);
    saveState("dm_users", updated, setUsers);
  };

  // Authentication
  const login = (username, password) => {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      if (user.disabled) return { error: "Account disabled" };
      setCurrentUser(user);
      sessionStorage.setItem("dm_current_user", JSON.stringify(user));
      return { success: true, user };
    }
    return { error: "Invalid username or password" };
  };

  const logout = () => {
    setCurrentUser(null);
    sessionStorage.removeItem("dm_current_user");
  };

  return (
    <DatabaseContext.Provider
      value={{
        menuItems,
        users,
        orders,
        favorites,
        feedbacks,
        currentUser,
        placeOrder,
        cancelOrder,
        confirmReceipt,
        toggleFavorite,
        addFeedback,
        kitchenAcceptOrder,
        kitchenStartPreparing,
        kitchenMarkReady,
        kitchenMarkCompleted,
        toggleItemAvailability,
        waiterMarkServed,
        addMenuItem,
        updateMenuItem,
        deleteMenuItem,
        addUser,
        updateUser,
        deleteUser,
        login,
        logout
      }}
    >
      {children}
    </DatabaseContext.Provider>
  );
}

export function useDatabase() {
  const context = useContext(DatabaseContext);
  if (!context) {
    throw new Error("useDatabase must be used within a DatabaseProvider");
  }
  return context;
}
