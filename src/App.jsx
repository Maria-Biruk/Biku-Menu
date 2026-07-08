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
        name: "Wagyu Classic Burger",
        description:
          "A5 wagyu patty, aged cheddar, caramelized onion, brioche bun",
        price: "$22",
        rating: "4.9",
        badge: "Signature",
        image:
          "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Truffle Mushroom Burger",
        description: "Black truffle aioli, wild mushrooms, gruyère, arugula",
        price: "$19",
        rating: "4.8",
        badge: "New",
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
        name: "Grilled Salmon",
        description: "Atlantic salmon, lemon butter, asparagus, microgreens",
        price: "$24",
        rating: "4.8",
        badge: "Signature",
        image:
          "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Ribeye Steak",
        description: "12oz ribeye, rosemary potatoes, compound herb butter",
        price: "$29",
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
        name: "Margherita Pizza",
        description: "San Marzano tomato, fresh mozzarella, basil",
        price: "$16",
        rating: "4.5",
        image:
          "https://images.unsplash.com/photo-1542281286-9e0a16bb7366?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Truffle & Prosciutto Pizza",
        description: "Prosciutto di Parma, arugula, truffle paste, mozzarella",
        price: "$19",
        rating: "4.8",
        badge: "Signature",
        image:
          "https://images.unsplash.com/photo-1542281286-9e0a16bb7366?auto=format&fit=crop&w=900&q=80",
      },
    ],
  },
  {
    id: "soft-drinks",
    title: "Soft Drinks",
    subtitle: "Ice-cold refreshment",
    items: [
      {
        name: "Classic Cola",
        description: "Chilled cola served over ice with a fresh lime wedge",
        price: "$4",
        rating: "4.5",
        image:
          "https://images.unsplash.com/photo-1505577058444-a3dab4c70455?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Lemon Lime Soda",
        description: "Sparkling lemon-lime soda, crisp and refreshing",
        price: "$4",
        rating: "4.4",
        badge: "New",
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
        name: "Classic Tiramisu",
        description: "Mascarpone, espresso-soaked ladyfingers, cocoa dust",
        price: "$9",
        rating: "4.6",
        image:
          "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Chocolate Lava Cake",
        description: "Dark chocolate fondant, vanilla bean ice cream",
        price: "$10",
        rating: "4.8",
        badge: "Signature",
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
        name: "Fresh Orange Juice",
        description: "Cold-pressed Valencia oranges, served over ice",
        price: "$6",
        rating: "4.7",
        image:
          "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Green Detox Juice",
        description: "Kale, spinach, green apple, ginger, lemon",
        price: "$7",
        rating: "4.6",
        badge: "New",
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
        name: "Espresso Shot",
        description: "Double espresso pulled to order",
        price: "$3",
        rating: "4.7",
        image:
          "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Honey Lavender Latte",
        description: "Steamed milk, honey, lavender syrup, espresso",
        price: "$6",
        rating: "4.8",
        badge: "Signature",
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

  const hero = useMemo(
    () => ({
      title: "A quiet room, served in courses.",
      description:
        "Twenty-two seats. One kitchen. A seasonal expression of modern European cuisine, guided by what arrives at our door each morning.",
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
                        {section.items.map((item) => (
                          <MenuCard key={item.name} item={item} />
                        ))}
                      </div>
                      <button className="see-more" type="button">
                        See More
                      </button>
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
                        {section.items.map((item) => (
                          <MenuCard key={item.name} item={item} />
                        ))}
                      </div>
                      <button className="see-more" type="button">
                        See More
                      </button>
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
              <p className="offer-label">Special Offer</p>
              <h2>Get 20% Off On Your Order</h2>
              <p className="offer-banner-copy">
                Enjoy a limited-time discount on your next menu selection.
              </p>
            </div>
          </div>
          <div className="offer-copy">
            <p>
              Fresh ingredients, premium service, and unforgettable flavor
              await.
            </p>
          </div>
          <div className="offer-features offer-features-row">
            <div>
              <strong>Fresh ingredients</strong>
              <span>Farm to table quality</span>
            </div>
            <div>
              <strong>Expert chefs</strong>
              <span>Passionate & experienced</span>
            </div>
            <div>
              <strong>Cozy ambience</strong>
              <span>Perfect for every meal</span>
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
