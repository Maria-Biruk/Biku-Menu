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
          "https://www.thefoodnearme.com/wp-content/uploads/2025/04/The-Ultimate-Classic-Cheeseburger-with-Perfect-Melted-Cheese-Drip-A-Complete-Guide.webp",
      },
      {
        name: "Cheese Burger",
        description: "Beef patty, melted cheddar, pickles, mustard",
        price: "$16",
        rating: "4.6",
        image:
          "https://easychickenrecipes.com/wp-content/uploads/2023/06/grilled-chicken-sandwich-3-of-6-edited.jpg",
      },
      {
        name: "Chicken Burger",
        description: "Grilled chicken breast, lettuce, mayo, tomato",
        price: "$14",
        rating: "4.5",
        image:
          "https://api.photon.aremedia.net.au/wp-content/uploads/sites/12/media/53214/ed-burger.jpg?resize=1200%2C630",
      },
      {
        name: "Double Beef Burger",
        description: "Two beef patties, double cheese, onion, ketchup",
        price: "$18",
        rating: "4.7",
        image:
          "https://insanelygoodrecipes.com/wp-content/uploads/2024/08/Homemade-Mushroom-Swiss-Burger.jpg",
      },
      {
        name: "Mushroom Swiss Burger",
        description: "Beef patty, sautéed mushrooms, Swiss cheese",
        price: "$17",
        rating: "4.6",
        image:
          "https://lilicooks.com/assets/images/1765201701258-d0lor5bp.webp",
      },
      {
        name: "BBQ Bacon Burger",
        description: "Beef patty, crispy bacon, BBQ sauce, cheddar",
        price: "$18",
        rating: "4.7",
        image:
          "https://satisfyyourcravings.com/wp-content/uploads/2024/05/Spicy-Jalapeno-Cheeseburger-768x769.png",
      },
      {
        name: "Spicy Jalapeño Burger",
        description: "Beef patty, jalapeños, pepper jack cheese, spicy mayo",
        price: "$16",
        rating: "4.5",
        image:
          "https://www.noracooks.com/wp-content/uploads/2023/04/veggie-burgers-1-2.jpg",
      },
      {
        name: "Veggie Burger",
        description: "Veggie patty, lettuce, tomato, tahini sauce",
        price: "$15",
        rating: "4.4",
        image:
          "https://www.truthrecipes.com/wp-content/uploads/2024/12/ezzeroual1_A_cutaway_view_of_the_Burger_King_Fish_Sandwich_show_db05f2d8-34fa-4138-a218-5014504d1ddc.png",
      },
      {
        name: "Fish Burger",
        description: "Fried fish fillet, lettuce, tartar sauce",
        price: "$17",
        rating: "4.6",
        image:
          "https://whaleycooks.com/wp-content/uploads/2026/02/temp_1771511143689.jpg",
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
          "https://seeafricatoday.com/wp-content/uploads/2024/04/Doro-Wat-Ethiopian.jpg",
      },
      {
        name: "Tibs",
        description: "Sautéed meat, onion, garlic, rosemary",
        price: "$20",
        rating: "4.8",
        image:
          "https://madebyranis.com/wp-content/uploads/2025/12/89eb058e-3d1e-40d0-bd4f-b2b0060e525ftl_vqrg4m.webp",
      },
      {
        name: "Kitfo",
        description: "Minced raw beef, mitmita spice, clarified butter",
        price: "$22",
        rating: "4.9",
        image:
          "https://migrationology.com/wp-content/uploads/2013/10/kitfo1.jpg",
      },
      {
        name: "Shiro Wat",
        description: "Chickpea powder, garlic, onion, berbere",
        price: "$15",
        rating: "4.7",
        image:
          "https://happyspicyhour.com/wp-content/uploads/2026/03/shiro-wat-ethiopian-chickpea-stew.webp",
      },
      {
        name: "Injera with Mixed Vegetables",
        description: "Injera, lentils, cabbage, collard greens",
        price: "$16",
        rating: "4.8",
        image:
          "https://nummyrecipes.com/wp-content/uploads/2025/08/Beyaynetu.jpg",
      },
      {
        name: "Gomen",
        description: "Collard greens, garlic, onion, spices",
        price: "$12",
        rating: "4.6",
        image:
          "https://cookingwithalisa.com/wp-content/uploads/2021/02/Ethiopia-Gomen-plated-close-up-better.jpg",
      },
      {
        name: "Key Wat",
        description: "Beef, berbere sauce, onion, garlic",
        price: "$19",
        rating: "4.8",
        image:
          "https://i.pinimg.com/originals/07/83/9c/07839c6832bd22b56d5af84f49bf69a5.jpg",
      },
      {
        name: "Fasting Combo Platter",
        description: "Lentils, shiro, gomen, injera",
        price: "$17",
        rating: "4.7",
        image:
          "https://i.pinimg.com/originals/8a/61/d2/8a61d2da682bd6d83e042a5bf6bf33ce.jpg",
      },
      {
        name: "Pasta",
        description: "Pasta, tomato sauce, herbs, parmesan",
        price: "$16",
        rating: "4.6",
        image:
          "https://thumbs.dreamstime.com/b/tomato-spaghetti-black-plate-dark-slate-table-sauce-pasta-classic-italian-cuisine-dish-food-background-popular-186210056.jpg",
      },
      {
        name: "Grilled Fish",
        description: "Fish fillet, onion, tomato, spices",
        price: "$21",
        rating: "4.8",
        image:
          "https://thumbs.dreamstime.com/b/platter-ethiopian-grilled-fish-salad-injera-bread-cuisine-whole-lemon-wedges-spongy-flat-205226614.jpg",
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
          "https://ohsweetbasil.com/wp-content/uploads/how-to-make-authentic-margherita-pizza-at-home-recipe-4.jpg",
      },
      {
        name: "Pepperoni",
        description: "Tomato sauce, mozzarella, pepperoni slices",
        price: "$15",
        rating: "4.6",
        image:
          "https://static.vecteezy.com/system/resources/previews/060/302/560/non_2x/delicious-pepperoni-pizza-slice-isolated-on-transparent-background-png.png",
      },
      {
        name: "Vegetarian Special",
        description: "Bell peppers, mushrooms, olives, onion",
        price: "$16",
        rating: "4.7",
        image:
          "https://kristineskitchenblog.com/wp-content/uploads/2024/12/veggie-pizza-recipe-09.jpg",
      },
      {
        name: "BBQ Chicken",
        description: "Grilled chicken, BBQ sauce, red onion, mozzarella",
        price: "$17",
        rating: "4.8",
        image:
          "https://therecipemingle.com/wp-content/uploads/2025/04/salah_pu8659_BBQ_Chicken_Pizza_a_cheesy_smoky_and_slightly_ta_1d207187-119f-4bb2-8a86-42110ea48c6f_2.png",
      },
      {
        name: "Four Cheese",
        description: "Mozzarella, gorgonzola, parmesan, provolone",
        price: "$18",
        rating: "4.7",
        image:
          "https://kitchenatics.com/wp-content/uploads/2020/09/Cheese-pizza-1.jpg",
      },
      {
        name: "Hawaiian",
        description: "Ham, pineapple, mozzarella",
        price: "$16",
        rating: "4.5",
        image:
          "https://i.ytimg.com/vi/q_4GlkxWzas/maxresdefault.jpg",
      },
      {
        name: "Meat Lovers",
        description: "Pepperoni, sausage, bacon, ground beef",
        price: "$19",
        rating: "4.8",
        image:
          "https://chasety.com/wp-content/uploads/2024/05/realchasecurtis_Meat_Lovers_Pizza_sitting_on_parchment_paper_on_dc92db32-1213-4e66-b7e1-0d34e0506af1.png",
      },
      {
        name: "Mushroom & Truffle",
        description: "Mushrooms, truffle oil, mozzarella, thyme",
        price: "$20",
        rating: "4.9",
        image:
          "https://itsonly.recipes/images/recipeimages/savory-mushroom-truffle-pizza.webp",
      },
      {
        name: "Spicy Beef",
        description: "Spiced ground beef, chili flakes, onion, mozzarella",
        price: "$17",
        rating: "4.6",
        image:
          "https://embed.widencdn.net/img/beef/gxsxp5i3do/1540x1284px/spicy-nacho-beef-pizza-square.eps?keep=c",
      },
      {
        name: "Ethiopian Special",
        description: "Spiced minced meat, awaze sauce, onion, mozzarella",
        price: "$21",
        rating: "4.9",
        image:
          "https://i.ytimg.com/vi/tCevxpUD0WU/maxresdefault.jpg",
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
          "https://c8.alamy.com/comp/M4ETGJ/bottles-and-cans-of-coca-cola-M4ETGJ.jpg",
      },
      {
        name: "Pepsi",
        description: "Refreshing cola with a crisp taste",
        price: "$3",
        rating: "4.4",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/d/dd/Pepsi_Can.jpg",
      },
      {
        name: "Sprite",
        description: "Lemon-lime soda, crisp and refreshing",
        price: "$3",
        rating: "4.5",
        image:
          "https://pngfre.com/wp-content/uploads/Sprite-24.png",
      },
      {
        name: "Fanta (Orange)",
        description: "Sweet orange soda",
        price: "$3",
        rating: "4.4",
        image:
          "https://assets.stickpng.com/images/580b57fbd9996e24bc43c10f.png",
      },
      {
        name: "Mirinda",
        description: "Citrus flavored soft drink",
        price: "$3",
        rating: "4.3",
        image:
          "https://5.imimg.com/data5/SELLER/Default/2025/9/546826979/QI/CY/HT/69827317/750-ml-mirinda-orange-soft-drink-1000x1000.jpg",
      },
      {
        name: "Ambo Water",
        description: "Ethiopian sparkling mineral water",
        price: "$2",
        rating: "4.6",
        image:
          "https://img.sewasew.com/definitions/6ea0bb334b724267820e02c1b81e774c_159_318",
      },
      {
        name: "Highland Water",
        description: "Ethiarian still mineral water",
        price: "$2",
        rating: "4.5",
        image:
          "https://www.thebottleclub.com/cdn/shop/files/highland-spring-still-water-bottle-multipack-24-x-330-ml-water-32878829895795.jpg?v=1703682387",
      },
      {
        name: "Schweppes",
        description: "Tonic or soda water",
        price: "$3",
        rating: "4.4",
        image:
          "https://www.coca-cola.com/content/dam/onexp/za/en/schweppes-last-version/schweppes-tonic-water.png",
      },
      {
        name: "Fanta Lemon",
        description: "Refreshing lemon soda",
        price: "$3",
        rating: "4.4",
        image:
          "https://www.kff.co.uk/images_products/HD_059905_FANTA-Lemon-1.jpg",
      },
      {
        name: "Coca-Cola Zero",
        description: "Zero sugar cola",
        price: "$3",
        rating: "4.5",
        image:
          "https://www.pngkit.com/png/full/364-3641413_a-selection-of-coca-cola-zero-bottles-and.png",
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
          "https://www.modernhoney.com/wp-content/uploads/2023/03/Baklava-8-crop-scaled.jpg",
      },
      {
        name: "Fruit Salad",
        description: "Mixed seasonal fruits, honey drizzle",
        price: "$6",
        rating: "4.6",
        image:
          "https://theforkedspoon.com/wp-content/uploads/2019/07/Fruit-Salad-3-700x1050.jpg",
      },
      {
        name: "Chocolate Cake",
        description: "Cocoa, flour, sugar, butter",
        price: "$8",
        rating: "4.7",
        image:
          "https://www.cookingclassy.com/wp-content/uploads/2019/10/chocolate-cake-3.jpg",
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
          "https://deliciosareceta.com/wp-content/uploads/2026/02/Beorns-Spiced-Mead-Honey-Cake-image_1.webp",
      },
      {
        name: "Cheesecake",
        description: "Cream cheese, sugar, graham cracker crust",
        price: "$8",
        rating: "4.7",
        image:
          "https://www.wholesomeyum.com/wp-content/uploads/2017/03/wholesomeyum-Keto-Cheesecake-Recipe-Low-Carb-Sugar-Free-Cheesecake.jpg",
      },
      {
        name: "Tiramisu",
        description: "Mascarpone, coffee, cocoa, ladyfingers",
        price: "$9",
        rating: "4.9",
        image:
          "https://sointofood.com/wp-content/uploads/2025/08/tiramisu-cake-slice-847x1024.webp",
      },
      {
        name: "Crepes with Honey",
        description: "Crepe batter, honey, butter",
        price: "$6",
        rating: "4.6",
        image:
          "https://imperialpdx.com/wp-content/uploads/2026/01/honey-lavender-cream-crepes-with-honey-drizzle-featured.jpg",
      },
      {
        name: "Fruit & Cream Parfait",
        description: "Fresh fruit, whipped cream, granola",
        price: "$7",
        rating: "4.7",
        image:
          "https://walkingonsunshinerecipes.com/wp-content/uploads/2024/07/first-hero-photo-Fruit-Parfait-Recipe-with-Whipped-Cream-1.jpg.webp",
      },
      {
        name: "Ethiopian Sambusa",
        description: "Fried pastry, date filling, cinnamon",
        price: "$6",
        rating: "4.8",
        image:
          "https://ohsosweetrecipes.sfo3.digitaloceanspaces.com/wp-content/uploads/2025/09/12191132/Sweet-Dessert-Samosa2.png",
      },
      {
        name: "Panna Cotta",
        description: "Cream, sugar, vanilla, gelatin",
        price: "$8",
        rating: "4.7",
        image:
          "https://www.cookingclassy.com/wp-content/uploads/2021/05/panna-cotta-01.jpg",
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
          "https://fitfoodiefinds.com/wp-content/uploads/2021/02/avocado-smoothie-7.jpg",
      },
      {
        name: "Mango Juice",
        description: "Fresh mango, water, sugar",
        price: "$5",
        rating: "4.7",
        image:
          "https://www.crazyvegankitchen.com/wp-content/uploads/2023/06/mango-juice-recipe.jpg",
      },
      {
        name: "Papaya Juice",
        description: "Fresh papaya, water, sugar",
        price: "$5",
        rating: "4.6",
        image:
          "https://cooksavor.com/wp-content/uploads/2025/07/featured_papaya_juice_final_glass-1024x1024.jpg",
      },
      {
        name: "Mixed Fruit Spris",
        description: "Layered avocado, mango, papaya juice",
        price: "$7",
        rating: "4.9",
        image:
  "https://ethiopian-food.org/wp-content/uploads/2024/02/Spris-Ethiopian-Layered-Juice-Recipe.jpg",
      },
      {
        name: "Orange Juice",
        description: "Fresh squeezed oranges",
        price: "$4",
        rating: "4.7",
        image:
          "https://www.kitchentreaty.com/wp-content/uploads/2025/03/fresh-squeezed-orange-juice-1.jpg",
      },
      {
        name: "Guava Juice",
        description: "Fresh guava, water, sugar",
        price: "$5",
        rating: "4.6",
        image:
          "https://pub-2b91fb1422a24c67b7a354f5f807eb0c.r2.dev/2026/01/guava-nectar-recipe-sweet-tangy-flavor-in-every-glass.jpg",
      },
      {
        name: "Pineapple Juice",
        description: "Fresh pineapple, water, sugar",
        price: "$5",
        rating: "4.7",
        image:
        "https://3.bp.blogspot.com/-T6UUfH6AxMQ/VVL_2it1NGI/AAAAAAAA2DY/uimHcVCSwOU/s1600/pure%2Bpineapple%2Bjuice.jpg",
      },
      {
        name: "Watermelon Juice",
        description: "Fresh watermelon, water",
        price: "$4",
        rating: "4.6",
        image:
          "https://insanelygoodrecipes.com/wp-content/uploads/2022/10/Refreshing-Watermelon-Smoothie-in-a-Glass.jpg",
      },
      {
        name: "Strawberry Juice",
        description: "Fresh strawberries, water, sugar",
        price: "$6",
        rating: "4.8",
        image:
          "https://cdn3.foodviva.com/static-content/food-images/juice-recipes/strawberry-juice-recipe/strawberry-juice-recipe.jpg",
      },
      {
        name: "Banana Juice",
        description: "Banana, milk, sugar",
        price: "$5",
        rating: "4.7",
        image:
          "https://foodtasia.com/wp-content/uploads/2021/07/banana-milkshake-39c.jpg",
      },
      {
        name: "Lemon Juice",
        description: "Fresh lemon, water, sugar",
        price: "$4",
        rating: "4.6",
        image:
          "https://plantbasedfolk.com/wp-content/uploads/2022/08/Lemon-Mint-Juice.jpg",
      },
      {
        name: "Tamarind Juice",
        description: "Tamarind pulp, water, sugar",
        price: "$5",
        rating: "4.7",
        image:
          "https://www.foxyfolksy.com/wp-content/uploads/2022/07/tamarind-juice.jpg",
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
          "https://www.whatsoutaddis.com/wp-content/uploads/2023/01/EonRvPEXIAUWeZK.jpg",
      },
      {
        name: "Macchiato",
        description: "Espresso, a touch of steamed milk",
        price: "$4",
        rating: "4.7",
        image:
          "https://www.handycookbook.com/wp-content/uploads/2023/04/Macchiato-.jpeg",
      },
      {
        name: "Cappuccino",
        description: "Espresso, steamed milk, milk foam",
        price: "$4",
        rating: "4.7",
        image:
        "https://images.wallpaperscraft.com/image/single/coffee_cappuccino_cup_136699_3840x2160.jpg",
      },
      {
        name: "Espresso",
        description: "Concentrated brewed coffee shot",
        price: "$3",
        rating: "4.7",
        image:
          "https://i5.walmartimages.com/seo/Espresso-Cups-Set-2-4-OZ-Double-Spouts-Cups-Espresso-Shot-Glasses-Milk-Cup-Handle-Clear-Glass-Espresso-Accessories-Espresso-Machine-Small_4f14cb95-44a0-4137-be88-828cd9ca457e.a1d88154d4917f8b339b16dd8730bb02.jpeg",
      },
      {
        name: "Latte",
        description: "Espresso, steamed milk, light foam",
        price: "$5",
        rating: "4.7",
        image:
          "https://www.latteartguide.com/wp-content/uploads/2023/05/Curved-cup-latte-art-scaled.jpg",
      },
      {
        name: "Black Tea",
        description: "Brewed black tea leaves",
        price: "$3",
        rating: "4.5",
        image:
          "https://imgcdn.stablediffusionweb.com/2024/3/20/801cbf80-ee76-4113-aa7c-6fe0dfa65129.jpg",
      },
      {
        name: "Spiced Tea",
        description: "Black tea, cinnamon, cloves, cardamom",
        price: "$3",
        rating: "4.6",
        image:
          "https://thebalemoya.com/cdn/shop/articles/ethiopiantea.png?v=1709920159",
      },
      {
        name: "Hot Chocolate",
        description: "Cocoa, milk, sugar",
        price: "$4",
        rating: "4.8",
        image:
          "https://vintagekitchennotes.com/wp-content/uploads/2023/11/Hot-chocolate-with-cream.jpeg",
      },
      {
        name: "Ginger Tea",
        description: "Fresh ginger, hot water, honey",
        price: "$3",
        rating: "4.5",
        image:
          "https://image.freepik.com/free-photo/glass-cup-hot-ginger-tea-with-ginger-rhizome-sliced-isolated-white-background_252965-22.jpg",
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
        <span className="brand">Digital</span>
        <span className="brand-accent">Menu</span>
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
            <p className="hero-small">Digital Menu</p>
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
          const isOddSection = index % 2 === 0;

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
                      <div className={`cards-grid small-cards ${isOddSection ? 'two-columns' : ''}`}>
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
                      <div className={`cards-grid small-cards ${isOddSection ? 'two-columns' : ''}`}>
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
          <div className="footer-container">
            <div className="footer-brand">
              <h3>Digital Menu</h3>
              <p>
                A modern dining experience designed around seasonal flavors,
                thoughtfully composed dishes, and relaxed hospitality.
              </p>
            </div>
            <div className="footer-links">
              <div className="footer-column">
                <h4>Quick Links</h4>
                <nav aria-label="Footer navigation">
                  <a href="#hero">Home</a>
                  <a href="#burger">Burger</a>
                  <a href="#foods">Foods</a>
                  <a href="#pizza">Pizza</a>
                </nav>
              </div>
              <div className="footer-column">
                <h4>More</h4>
                <nav aria-label="Footer navigation">
                  <a href="#soft-drinks">Soft Drinks</a>
                  <a href="#juice">Juice</a>
                  <a href="#desserts">Desserts</a>
                  <a href="#hot-drinks">Hot Drinks</a>
                </nav>
              </div>
              <div className="footer-column">
                <h4>Contact</h4>
                <p>hello@bikufine.com</p>
                <p>+251 911 123 456</p>
                <p>Open daily 11am–10pm</p>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2026 Digital Menu. All rights reserved.</p>
            <div className="footer-social">
              <a href="#" aria-label="Facebook">Facebook</a>
              <a href="#" aria-label="Instagram">Instagram</a>
              <a href="#" aria-label="Twitter">Twitter</a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;
