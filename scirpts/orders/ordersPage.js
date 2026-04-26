
import { addToCart } from "../../data/cart.js";
import { orders } from "../../data/orders.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption ,calculateDeliveryDate} from "../../data/deliveryOptions.js";
import { formatCurrency } from "../utils/money.js";
import dayjs from 'https://cdn.jsdelivr.net/npm/dayjs@1/+esm';



 function renderOrders() {
  let ordersHTML = '';

  orders.forEach((order) => {
 
    let productsHTML = '';

    order.cart.forEach((cartItem) => {
      const product = getProduct(cartItem.productId);
      const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);

    const deliveryDate = calculateDeliveryDate(order.orderTime, deliveryOption);

      productsHTML += `
        <div class="product-image-container">
          <img src="${product.image}">
        </div>

        <div class="product-details">
          <div class="product-name">
            ${product.name}
          </div>

          <div class="product-delivery-date">
            Arriving on: ${deliveryDate}
          </div>

          <div class="product-quantity">
            Quantity: ${cartItem.quantity}
          </div>

          <button class="buy-again-button button-primary js-buy-again-button"
            data-product-id="${product.id}">
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
           <span class="js-added-to-cart-message js-added-message-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </span>
          </button>
        </div>

        <div class="product-actions">
          <a href="tracking.html?orderId=${order.id}&productId=${product.id}">
            <button class="track-package-button button-secondary">
              Track package
            </button>
          </a>
        </div>
      `;
    });

    ordersHTML += `
      <div class="order-container">

        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${dayjs(order.orderTime).format('MMMM D')}</div>
            </div>

            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>$${formatCurrency(order.totalCents)}</div>
            </div>
          </div>

          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${order.id}</div>
          </div>
        </div>

        <div class="order-details-grid">
          ${productsHTML}
        </div>

      </div>
    `;
  });

  document.querySelector('.js-orders-grid').innerHTML = ordersHTML;

document.querySelectorAll('.js-buy-again-button')
  .forEach((button) => {
    button.addEventListener('click', () => {

      const { productId } = button.dataset;
      addToCart(productId);

      const message = button.querySelector('.js-added-to-cart-message');
      message.classList.add('visible');
      setTimeout(() => {
        message.classList.remove('visible');
      }, 1000);
    //updateCartQuantityUI();
    });
  });
  
}
//renderAmazonHeader();
renderOrders();


