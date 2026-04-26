import { calculateCartQuantity } from "../../data/cart.js";

export function updateCartQuantityUI(){
  const cartQuantity = calculateCartQuantity();
  const cartEl = document.querySelector('.js-cart-quantity');
  if (cartEl) cartEl.innerHTML = cartQuantity;
}