// Simple cart store. State lives here; UI subscribes via onChange.
const items = new Map(); // id -> { product, qty }
let listener = () => {};

export function onChange(fn) {
  listener = fn;
}

function notify() {
  listener(getItems());
}

export function addItem(product) {
  const entry = items.get(product.id);
  if (entry) entry.qty++;
  else items.set(product.id, { product, qty: 1 });
  notify();
}

export function changeQty(id, delta) {
  const entry = items.get(id);
  if (!entry) return;
  entry.qty += delta;
  if (entry.qty <= 0) items.delete(id);
  notify();
}

export function removeItem(id) {
  items.delete(id);
  notify();
}

export function getItems() {
  return [...items.values()];
}

export function getCount() {
  return getItems().reduce((sum, i) => sum + i.qty, 0);
}

export function getTotal() {
  return getItems().reduce((sum, i) => sum + i.product.price * i.qty, 0);
}
