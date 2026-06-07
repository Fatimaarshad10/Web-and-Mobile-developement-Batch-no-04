// Rendering helpers — pure DOM, no business logic.
import { getTotal, getCount } from "./cart.js";

const money = (n) => `$${n.toFixed(2)}`;

export function renderFilters(el, categories, active, onSelect) {
  el.innerHTML = "";
  categories.forEach((cat) => {
    const btn = document.createElement("button");
    btn.className = "filter" + (cat === active ? " active" : "");
    btn.textContent = cat;
    btn.onclick = () => onSelect(cat);
    el.appendChild(btn);
  });
}

export function renderProducts(el, products, onAdd) {
  el.innerHTML = products
    .map(
      (p) => `
      <article class="card">
        <img class="card__img" src="${p.img}" alt="${p.name}" loading="lazy" />
        <div class="card__body">
          <span class="card__cat">${p.category}</span>
          <h3 class="card__name">${p.name}</h3>
          <div class="card__row">
            <span class="card__price">${money(p.price)}</span>
            <button class="card__add" data-id="${p.id}">Add to Cart</button>
          </div>
        </div>
      </article>`
    )
    .join("");

  el.querySelectorAll(".card__add").forEach((btn) => {
    btn.onclick = () => onAdd(Number(btn.dataset.id));
  });
}

export function renderCart(el, items, { onInc, onDec, onRemove }) {
  if (!items.length) {
    el.innerHTML = `<p class="cart__empty">Your cart is empty.</p>`;
    return;
  }
  el.innerHTML = items
    .map(
      ({ product, qty }) => `
      <div class="cart-item">
        <img class="cart-item__img" src="${product.img}" alt="${product.name}" />
        <div class="cart-item__info">
          <div class="cart-item__name">${product.name}</div>
          <div class="cart-item__price">${money(product.price)}</div>
          <div class="cart-item__qty">
            <button data-dec="${product.id}">−</button>
            <span>${qty}</span>
            <button data-inc="${product.id}">+</button>
          </div>
        </div>
        <button class="cart-item__remove" data-rm="${product.id}">Remove</button>
      </div>`
    )
    .join("");

  el.querySelectorAll("[data-inc]").forEach((b) => (b.onclick = () => onInc(Number(b.dataset.inc))));
  el.querySelectorAll("[data-dec]").forEach((b) => (b.onclick = () => onDec(Number(b.dataset.dec))));
  el.querySelectorAll("[data-rm]").forEach((b) => (b.onclick = () => onRemove(Number(b.dataset.rm))));
}

export function updateSummary(countEl, totalEl) {
  countEl.textContent = getCount();
  totalEl.textContent = money(getTotal());
}
