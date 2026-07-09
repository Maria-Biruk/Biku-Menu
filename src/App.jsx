import { useMemo, useState } from "react";
import "./App.css";

const sections = [
  { id: "hero", label: "Home" },
  { id: "burger", label: "Burger" },
  { id: "foods", label: "Foods" },
  { id: "pizza", label: "Pizza" },
  { id: "soft-drinks", label: "Soft Drinks" },
  { id: "juice", label: "Juice" },
  { id: "desserts", label: "Desserts" },
  { id: "hot-drinks", label: "Hot Drinks" },
];

const menuSections = [
  {
    id: "burger",
    title: "Burgers",
    subtitle: "Crafted to perfection",
    items: [
      {
        name: "Classic Beef Burger",
        description: "Beef patty, lettuce, tomato, house sauce",
        price: "$15",
        rating: "4.5",
        image:
          "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Cheese Burger",
        description: "Beef patty, melted cheddar, pickles, mustard",
        price: "$16",
        rating: "4.6",
        image:
          "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Chicken Burger",
        description: "Grilled chicken breast, lettuce, mayo, tomato",
        price: "$14",
        rating: "4.5",
        image:
          "https://images.unsplash.com/photo-1555939594-58d7cb561adf?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Double Beef Burger",
        description: "Two beef patties, double cheese, onion, ketchup",
        price: "$18",
        rating: "4.7",
        image:
          "https://images.unsplash.com/photo-1563758033-f403bf289096?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Mushroom Swiss Burger",
        description: "Beef patty, sautéed mushrooms, Swiss cheese",
        price: "$17",
        rating: "4.6",
        image:
          "https://images.unsplash.com/photo-1585238341710-4913d3a3a48f?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "BBQ Bacon Burger",
        description: "Beef patty, crispy bacon, BBQ sauce, cheddar",
        price: "$18",
        rating: "4.7",
        image:
          "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Spicy Jalapeño Burger",
        description: "Beef patty, jalapeños, pepper jack cheese, spicy mayo",
        price: "$16",
        rating: "4.5",
        image:
          "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Veggie Burger",
        description: "Veggie patty, lettuce, tomato, tahini sauce",
        price: "$15",
        rating: "4.4",
        image:
          "https://images.unsplash.com/photo-1555939594-58d7cb561adf?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Fish Burger",
        description: "Fried fish fillet, lettuce, tartar sauce",
        price: "$17",
        rating: "4.6",
        image:
          "https://images.unsplash.com/photo-1563758033-f403bf289096?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Ethiopian Spiced Burger",
        description: "Beef patty, berbere spice, mayo, red onion",
        price: "$19",
        rating: "4.8",
        image:
          "https://images.unsplash.com/photo-1585238341710-4913d3a3a48f?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Egg & Bacon Burger",
        description: "Beef patty, fried egg, bacon, cheddar",
        price: "$18",
        rating: "4.7",
        image:
          "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Habesha Lamb Burger",
        description: "Spiced lamb patty, berbere, awaze mayo, red onion",
        price: "$20",
        rating: "4.9",
        image:
          "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80",
      },
    ],
  },
  {
    id: "foods",
    title: "Foods",
    subtitle: "The heart of the table",
    items: [
      {
        name: "Doro Wat",
        description: "Chicken, berbere sauce, hard-boiled egg, onion",
        price: "$18",
        rating: "4.9",
        image:
          "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Tibs",
        description: "Sautéed meat, onion, garlic, rosemary",
        price: "$20",
        rating: "4.8",
        image:
          "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Kitfo",
        description: "Minced raw beef, mitmita spice, clarified butter",
        price: "$22",
        rating: "4.9",
        image:
          "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Shiro Wat",
        description: "Chickpea powder, garlic, onion, berbere",
        price: "$15",
        rating: "4.7",
        image:
          "https://images.unsplash.com/photo-1599599810694-d01d0c08e07f?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Injera with Mixed Vegetables",
        description: "Injera, lentils, cabbage, collard greens",
        price: "$16",
        rating: "4.8",
        image:
          "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Gomen",
        description: "Collard greens, garlic, onion, spices",
        price: "$12",
        rating: "4.6",
        image:
          "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Key Wat",
        description: "Beef, berbere sauce, onion, garlic",
        price: "$19",
        rating: "4.8",
        image:
          "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Fasting Combo Platter",
        description: "Lentils, shiro, gomen, injera",
        price: "$17",
        rating: "4.7",
        image:
          "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Pasta",
        description: "Pasta, tomato sauce, herbs, parmesan",
        price: "$16",
        rating: "4.6",
        image:
          "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Grilled Fish",
        description: "Fish fillet, onion, tomato, spices",
        price: "$21",
        rating: "4.8",
        image:
          "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Firfir",
        description: "Torn injera, berbere sauce, onion, clarified butter",
        price: "$16",
        rating: "4.7",
        image:
          "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Zilzil Tibs",
        description: "Thin-sliced beef strips, rosemary, garlic, jalapeño",
        price: "$22",
        rating: "4.9",
        image:
          "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=900&q=80",
      },
    ],
  },
  {
    id: "pizza",
    title: "Pizza",
    subtitle: "Wood-fired classics",
    items: [
      {
        name: "Margherita",
        description: "Tomato sauce, mozzarella, fresh basil",
        price: "$14",
        rating: "4.5",
        image:
          "https://images.unsplash.com/photo-1542281286-9e0a16bb7366?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Pepperoni",
        description: "Tomato sauce, mozzarella, pepperoni slices",
        price: "$15",
        rating: "4.6",
        image:
          "https://images.unsplash.com/photo-1571407-918a92e00e5f?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Vegetarian Special",
        description: "Bell peppers, mushrooms, olives, onion",
        price: "$16",
        rating: "4.7",
        image:
          "https://images.unsplash.com/photo-1542281286-9e0a16bb7366?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "BBQ Chicken",
        description: "Grilled chicken, BBQ sauce, red onion, mozzarella",
        price: "$17",
        rating: "4.8",
        image:
          "https://images.unsplash.com/photo-1571407-918a92e00e5f?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Four Cheese",
        description: "Mozzarella, gorgonzola, parmesan, provolone",
        price: "$18",
        rating: "4.7",
        image:
          "https://images.unsplash.com/photo-1542281286-9e0a16bb7366?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Hawaiian",
        description: "Ham, pineapple, mozzarella",
        price: "$16",
        rating: "4.5",
        image:
          "https://images.unsplash.com/photo-1571407-918a92e00e5f?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Meat Lovers",
        description: "Pepperoni, sausage, bacon, ground beef",
        price: "$19",
        rating: "4.8",
        image:
          "https://images.unsplash.com/photo-1542281286-9e0a16bb7366?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Mushroom & Truffle",
        description: "Mushrooms, truffle oil, mozzarella, thyme",
        price: "$20",
        rating: "4.9",
        image:
          "https://images.unsplash.com/photo-1571407-918a92e00e5f?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Spicy Beef",
        description: "Spiced ground beef, chili flakes, onion, mozzarella",
        price: "$17",
        rating: "4.6",
        image:
          "https://images.unsplash.com/photo-1542281286-9e0a16bb7366?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Ethiopian Special",
        description: "Spiced minced meat, awaze sauce, onion, mozzarella",
        price: "$21",
        rating: "4.9",
        image:
          "https://images.unsplash.com/photo-1571407-918a92e00e5f?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Spinach & Feta Pizza",
        description: "Spinach, feta cheese, garlic, olive oil",
        price: "$18",
        rating: "4.7",
        image:
          "https://images.unsplash.com/photo-1542281286-9e0a16bb7366?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Ethiopian Vegetarian Pizza",
        description: "Shiro spread, mozzarella, jalapeño, onion",
        price: "$19",
        rating: "4.8",
        image:
          "https://images.unsplash.com/photo-1571407-918a92e00e5f?auto=format&fit=crop&w=900&q=80",
      },
    ],
  },
  {
    id: "soft-drinks",
    title: "Soft Drinks",
    subtitle: "Ice-cold refreshment",
    items: [
      {
        name: "Coca-Cola",
        description: "Classic cola served chilled",
        price: "$3",
        rating: "4.5",
        image:
          "https://images.unsplash.com/photo-1505577058444-a3dab4c70455?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Pepsi",
        description: "Refreshing cola with a crisp taste",
        price: "$3",
        rating: "4.4",
        image:
          "https://images.unsplash.com/photo-1459191730420-5f9b7f95b68d?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Sprite",
        description: "Lemon-lime soda, crisp and refreshing",
        price: "$3",
        rating: "4.5",
        image:
          "https://images.unsplash.com/photo-1505577058444-a3dab4c70455?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Fanta (Orange)",
        description: "Sweet orange soda",
        price: "$3",
        rating: "4.4",
        image:
          "https://images.unsplash.com/photo-1459191730420-5f9b7f95b68d?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Mirinda",
        description: "Citrus flavored soft drink",
        price: "$3",
        rating: "4.3",
        image:
          "https://images.unsplash.com/photo-1505577058444-a3dab4c70455?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Ambo Water",
        description: "Ethiopian sparkling mineral water",
        price: "$2",
        rating: "4.6",
        image:
          "https://images.unsplash.com/photo-1459191730420-5f9b7f95b68d?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Highland Water",
        description: "Ethiarian still mineral water",
        price: "$2",
        rating: "4.5",
        image:
          "https://images.unsplash.com/photo-1505577058444-a3dab4c70455?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Schweppes",
        description: "Tonic or soda water",
        price: "$3",
        rating: "4.4",
        image:
          "https://images.unsplash.com/photo-1459191730420-5f9b7f95b68d?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Fanta Lemon",
        description: "Refreshing lemon soda",
        price: "$3",
        rating: "4.4",
        image:
          "https://images.unsplash.com/photo-1505577058444-a3dab4c70455?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Coca-Cola Zero",
        description: "Zero sugar cola",
        price: "$3",
        rating: "4.5",
        image:
          "https://images.unsplash.com/photo-1459191730420-5f9b7f95b68d?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Diet Coke",
        description: "Sugar-free cola",
        price: "$3",
        rating: "4.4",
        image:
          "https://images.unsplash.com/photo-1505577058444-a3dab4c70455?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "7UP",
        description: "Lemon-lime soda",
        price: "$3",
        rating: "4.4",
        image:
          "https://images.unsplash.com/photo-1459191730420-5f9b7f95b68d?auto=format&fit=crop&w=900&q=80",
      },
    ],
  },
  {
    id: "desserts",
    title: "Desserts",
    subtitle: "A sweet conclusion",
    items: [
      {
        name: "Baklava",
        description: "Phyllo dough, chopped nuts, honey syrup",
        price: "$7",
        rating: "4.8",
        image:
          "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Fruit Salad",
        description: "Mixed seasonal fruits, honey drizzle",
        price: "$6",
        rating: "4.6",
        image:
          "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Chocolate Cake",
        description: "Cocoa, flour, sugar, butter",
        price: "$8",
        rating: "4.7",
        image:
          "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Ice Cream",
        description: "Milk, cream, sugar, vanilla",
        price: "$5",
        rating: "4.5",
        image:
          "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Kolo",
        description: "Roasted barley, chickpeas, peanuts",
        price: "$4",
        rating: "4.4",
        image:
          "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Ethiopian Honey Cake",
        description: "Flour, honey, butter, spices",
        price: "$7",
        rating: "4.8",
        image:
          "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Cheesecake",
        description: "Cream cheese, sugar, graham cracker crust",
        price: "$8",
        rating: "4.7",
        image:
          "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Tiramisu",
        description: "Mascarpone, coffee, cocoa, ladyfingers",
        price: "$9",
        rating: "4.9",
        image:
          "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Crepes with Honey",
        description: "Crepe batter, honey, butter",
        price: "$6",
        rating: "4.6",
        image:
          "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Fruit & Cream Parfait",
        description: "Fresh fruit, whipped cream, granola",
        price: "$7",
        rating: "4.7",
        image:
          "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Ethiopian Sambusa",
        description: "Fried pastry, date filling, cinnamon",
        price: "$6",
        rating: "4.8",
        image:
          "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Panna Cotta",
        description: "Cream, sugar, vanilla, gelatin",
        price: "$8",
        rating: "4.7",
        image:
          "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80",
      },
    ],
  },
  {
    id: "juice",
    title: "Juice",
    subtitle: "Freshly pressed daily",
    items: [
      {
        name: "Avocado Juice",
        description: "Avocado, milk, sugar",
        price: "$6",
        rating: "4.8",
        image:
          "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Mango Juice",
        description: "Fresh mango, water, sugar",
        price: "$5",
        rating: "4.7",
        image:
          "https://images.unsplash.com/photo-1524594154904-6fd1bcffb8a2?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Papaya Juice",
        description: "Fresh papaya, water, sugar",
        price: "$5",
        rating: "4.6",
        image:
          "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Mixed Fruit Spris",
        description: "Layered avocado, mango, papaya juice",
        price: "$7",
        rating: "4.9",
        image:
          "https://images.unsplash.com/photo-1524594154904-6fd1bcffb8a2?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Orange Juice",
        description: "Fresh squeezed oranges",
        price: "$4",
        rating: "4.7",
        image:
          "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Guava Juice",
        description: "Fresh guava, water, sugar",
        price: "$5",
        rating: "4.6",
        image:
          "https://images.unsplash.com/photo-1524594154904-6fd1bcffb8a2?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Pineapple Juice",
        description: "Fresh pineapple, water, sugar",
        price: "$5",
        rating: "4.7",
        image:
          "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Watermelon Juice",
        description: "Fresh watermelon, water",
        price: "$4",
        rating: "4.6",
        image:
          "https://images.unsplash.com/photo-1524594154904-6fd1bcffb8a2?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Strawberry Juice",
        description: "Fresh strawberries, water, sugar",
        price: "$6",
        rating: "4.8",
        image:
          "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Banana Juice",
        description: "Banana, milk, sugar",
        price: "$5",
        rating: "4.7",
        image:
          "https://images.unsplash.com/photo-1524594154904-6fd1bcffb8a2?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Lemon Juice",
        description: "Fresh lemon, water, sugar",
        price: "$4",
        rating: "4.6",
        image:
          "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Tamarind Juice",
        description: "Tamarind pulp, water, sugar",
        price: "$5",
        rating: "4.7",
        image:
          "https://images.unsplash.com/photo-1524594154904-6fd1bcffb8a2?auto=format&fit=crop&w=900&q=80",
      },
    ],
  },
  {
    id: "hot-drinks",
    title: "Hot Drinks",
    subtitle: "Heated to perfection",
    items: [
      {
        name: "Ethiopian Buna",
        description: "Roasted coffee beans, traditional ceremony brew",
        price: "$4",
        rating: "4.9",
        image:
          "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Macchiato",
        description: "Espresso, a touch of steamed milk",
        price: "$4",
        rating: "4.7",
        image:
          "https://images.unsplash.com/photo-1510626176961-4b2ec2ec83b5?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Cappuccino",
        description: "Espresso, steamed milk, milk foam",
        price: "$4",
        rating: "4.7",
        image:
          "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Espresso",
        description: "Concentrated brewed coffee shot",
        price: "$3",
        rating: "4.7",
        image:
          "https://images.unsplash.com/photo-1510626176961-4b2ec2ec83b5?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Latte",
        description: "Espresso, steamed milk, light foam",
        price: "$5",
        rating: "4.7",
        image:
          "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Black Tea",
        description: "Brewed black tea leaves",
        price: "$3",
        rating: "4.5",
        image:
          "https://images.unsplash.com/photo-1510626176961-4b2ec2ec83b5?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Spiced Tea",
        description: "Black tea, cinnamon, cloves, cardamom",
        price: "$3",
        rating: "4.6",
        image:
          "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Hot Chocolate",
        description: "Cocoa, milk, sugar",
        price: "$4",
        rating: "4.8",
        image:
          "https://images.unsplash.com/photo-1510626176961-4b2ec2ec83b5?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Ginger Tea",
        description: "Fresh ginger, hot water, honey",
        price: "$3",
        rating: "4.5",
        image:
          "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Herbal Tea",
        description: "Koseret herb leaves, hot water",
        price: "$3",
        rating: "4.6",
        image:
          "https://images.unsplash.com/photo-1510626176961-4b2ec2ec83b5?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Turkish Coffee",
        description: "Finely ground coffee, cardamom, sugar",
        price: "$4",
        rating: "4.8",
        image:
          "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Chamomile Tea",
        description: "Dried chamomile flowers, hot water, honey",
        price: "$3",
        rating: "4.7",
        image:
          "https://images.unsplash.com/photo-1510626176961-4b2ec2ec83b5?auto=format&fit=crop&w=900&q=80",
      },
    ],
  },
];

function SectionNav({ active, onSelect }) {
  return (
    <nav className="site-nav">
      <div className="site-name">
        <span className="brand">Biku</span>
        <span className="brand-accent">Fine</span>
      </div>
      <div className="links">
        {sections.slice(1).map((section) => (
          <button
            key={section.id}
            className={active === section.id ? "nav-link active" : "nav-link"}
            onClick={() => onSelect(section.id)}
            type="button"
          >
            {section.label}
          </button>
        ))}
      </div>
      <button className="search-button" type="button" aria-label="Search menu">
        <span />
      </button>
    </nav>
  );
}

function MenuCard({ item }) {
  return (
    <article className="menu-card">
      <div
        className="card-image"
        style={{ backgroundImage: `url(${item.image})` }}
      >
        {item.badge && <span className="badge">{item.badge}</span>}
      </div>
      <div className="card-body">
        <h3>{item.name}</h3>
        <p>{item.description}</p>
        <div className="card-footer">
          <span className="rating">★★★★★</span>
          <span className="rating-value">({item.rating})</span>
          <span className="price">{item.price}</span>
        </div>
      </div>
    </article>
  );
}

function App() {
  const [activeSection, setActiveSection] = useState("hero");
  const [expandedSections, setExpandedSections] = useState({});

  const hero = useMemo(
    () => ({
      title: "Delicious Food, Unforgettable Moments",
      description:
        "A perfect blend of taste, art, and ambiance. Crafted to delight your senses.",
    }),
    [],
  );

  const handleNav = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(id);
    }
  };

  const toggleExpanded = (sectionId) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  return (
    <div className="app-shell">
      <SectionNav active={activeSection} onSelect={handleNav} />
      <main>
        <section id="hero" className="hero-section">
          <div className="hero-copy">
            <p className="hero-small">Biku Fine</p>
            <h1>{hero.title}</h1>
            <p>{hero.description}</p>
          </div>
        </section>

        {menuSections.map((section, index) => {
          const swapColumns = ["foods", "soft-drinks", "juice"].includes(
            section.id,
          );
          const isExpanded = expandedSections[section.id] || false;
          const initialItemsCount = 2;
          const displayItems = isExpanded
            ? section.items
            : section.items.slice(0, initialItemsCount);

          return (
            <section key={section.id} id={section.id} className="menu-section">
              <div className="section-hero">
                <span className="course-label">Course {index + 1}.</span>
                <h2>{section.title}</h2>
                <p>{section.subtitle}</p>
              </div>
              <div className="section-body">
                {swapColumns ? (
                  <>
                    <div className="cards-column">
                      <div className="cards-grid small-cards">
                        {displayItems.map((item) => (
                          <MenuCard key={item.name} item={item} />
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
                      <div className="cards-grid small-cards">
                        {displayItems.map((item) => (
                          <MenuCard key={item.name} item={item} />
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

        <section className="special-offer-section">
          <div
            className="offer-banner"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80')",
            }}
          >
            <div className="offer-banner-overlay">
              <h2>Get 20% Off On Your First Order</h2>
              <button className="book-table-btn" type="button">
                BOOK TABLE
              </button>
            </div>
          </div>
          <div className="offer-features offer-features-row">
            <div>
              <strong>Fresh Ingredients</strong>
              <span>Farm to table</span>
            </div>
            <div>
              <strong>Expert Chefs</strong>
              <span>Passionate & experienced</span>
            </div>
            <div>
              <strong>Cozy Ambiance</strong>
              <span>Perfect for everyone</span>
            </div>
          </div>
        </section>

        <footer className="site-footer">
          <div className="footer-grid">
            <div className="footer-brand">
              <p className="footer-title">Biku Fine</p>
              <p className="footer-text">
                A modern dining experience designed around seasonal flavors,
                thoughtfully composed dishes, and relaxed hospitality.
              </p>
            </div>
            <div className="footer-section">
              <p className="footer-heading">Explore</p>
              <nav aria-label="Footer navigation">
                <a href="#hero">Home</a>
                <a href="#burger">Burger</a>
                <a href="#pizza">Pizza</a>
                <a href="#desserts">Desserts</a>
              </nav>
            </div>
            <div className="footer-section">
              <p className="footer-heading">Contact</p>
              <p>hello@bikufine.com</p>
              <p>Open daily 11am–10pm</p>
            </div>
          </div>
          <div className="footer-note">
            © 2026 Biku Fine. Crafted with care.
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;
