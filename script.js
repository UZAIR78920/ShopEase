const products = [
  {
    name: "Studio Wireless Headphones",
    category: "Electronics",
    price: 89,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=720&q=85",
  },
  {
    name: "Everyday Wristwatch",
    category: "Accessories",
    price: 120,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=720&q=85",
  },
  {
    name: "Classic Leather Sneakers",
    category: "Clothing",
    price: 74,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=720&q=85",
  },
  {
    name: "Instant Film Camera",
    category: "Electronics",
    price: 96,
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=720&q=85",
  },
  {
    name: "Soft Cotton T-Shirt",
    category: "Clothing",
    price: 32,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=720&q=85",
  },
  {
    name: "Minimal Table Lamp",
    category: "Home",
    price: 58,
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=720&q=85",
  },
  {
    name: "Pocket Bluetooth Speaker",
    category: "Electronics",
    price: 49,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=720&q=85",
  },
  {
    name: "Everyday Canvas Tote",
    category: "Accessories",
    price: 28,
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=720&q=85",
  },
];

const productGrid = document.querySelector("#product-grid");
const productCount = document.querySelector("#product-count");
const emptyState = document.querySelector("#empty-state");
const filterButtons = document.querySelectorAll(".filter-button");
const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

function createProductCard(product) {
  const card = document.createElement("article");
  card.className = "product-card";

  const imageWrap = document.createElement("div");
  imageWrap.className = "product-image-wrap";

  const image = document.createElement("img");
  image.className = "product-image";
  image.src = product.image;
  image.alt = product.name;
  image.loading = "lazy";
  imageWrap.append(image);

  const category = document.createElement("span");
  category.className = "product-category";
  category.textContent = product.category;
  imageWrap.append(category);

  const info = document.createElement("div");
  info.className = "product-info";

  const details = document.createElement("div");
  const name = document.createElement("h2");
  name.className = "product-name";
  name.textContent = product.name;

  const rating = document.createElement("p");
  rating.className = "product-rating";
  rating.setAttribute("aria-label", `Rated ${product.rating} out of 5`);

  const star = document.createElement("span");
  star.className = "rating-star";
  star.setAttribute("aria-hidden", "true");
  star.textContent = "★";

  const ratingValue = document.createElement("span");
  ratingValue.setAttribute("aria-hidden", "true");
  ratingValue.textContent = product.rating.toFixed(1);
  rating.append(star, ratingValue);
  details.append(name, rating);

  const price = document.createElement("p");
  price.className = "product-price";
  price.textContent = priceFormatter.format(product.price);

  info.append(details, price);
  card.append(imageWrap, info);
  return card;
}

function renderProducts(category = "All") {
  const visibleProducts =
    category === "All"
      ? products
      : products.filter((product) => product.category === category);

  productGrid.replaceChildren(...visibleProducts.map(createProductCard));
  productCount.textContent = `${visibleProducts.length} ${
    visibleProducts.length === 1 ? "product" : "products"
  }`;
  emptyState.hidden = visibleProducts.length > 0;
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const category = button.dataset.category;
    filterButtons.forEach((filterButton) => {
      const isActive = filterButton === button;
      filterButton.classList.toggle("is-active", isActive);
      filterButton.setAttribute("aria-pressed", String(isActive));
    });
    renderProducts(category);
  });
});

renderProducts();