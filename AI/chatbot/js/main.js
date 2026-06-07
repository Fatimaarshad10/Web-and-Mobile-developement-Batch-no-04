// App entry — wires data, cart store, and UI together.
import { products, categories } from "./data.js";
import { addItem, changeQty, removeItem, onChange } from "./cart.js";
import { renderFilters, renderProducts, renderCart, updateSummary } from "./ui.js";
import { initChatbot } from "./chatbot.js";

const $ = (id) => document.getElementById(id);

const el = {
  filters: $("filters"),
  grid: $("productGrid"),
  cartItems: $("cartItems"),
  cartCount: $("cartCount"),
  cartTotal: $("cartTotal"),
  cartBtn: $("cartBtn"),
  closeCart: $("closeCart"),
  drawer: $("cartDrawer"),
  overlay: $("overlay"),
};

let activeFilter = "All";

function showProducts() {
  const list = activeFilter === "All" ? products : products.filter((p) => p.category === activeFilter);
  renderProducts(el.grid, list, (id) => addItem(products.find((p) => p.id === id)));
}

function selectFilter(cat) {
  activeFilter = cat;
  renderFilters(el.filters, categories, activeFilter, selectFilter);
  showProducts();
}

// Cart drawer open/close
const toggleCart = (open) => {
  el.drawer.classList.toggle("open", open);
  el.overlay.classList.toggle("open", open);
};
el.cartBtn.onclick = () => toggleCart(true);
el.closeCart.onclick = () => toggleCart(false);
el.overlay.onclick = () => toggleCart(false);

// Re-render cart whenever the store changes
onChange((items) => {
  renderCart(el.cartItems, items, {
    onInc: (id) => changeQty(id, 1),
    onDec: (id) => changeQty(id, -1),
    onRemove: removeItem,
  });
  updateSummary(el.cartCount, el.cartTotal);
});

// Nav category links
document.querySelectorAll(".nav__link[data-filter]").forEach((link) => {
  link.onclick = () => selectFilter(link.dataset.filter);
});

// Initial render
selectFilter("All");
renderCart(el.cartItems, [], {});
initChatbot();
