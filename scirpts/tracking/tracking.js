import { renderAmazonHeader } from '../shared/amazonHeader.js'
import { orders,removeOrder } from "../../data/orders.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption,calculateDeliveryDate } from "../../data/deliveryOptions.js";
import dayjs from 'https://cdn.jsdelivr.net/npm/dayjs@1/+esm';

function getParams() {
  const url = new URL(window.location.href);
  return {
    orderId: url.searchParams.get('orderId'),
    productId: url.searchParams.get('productId')
  };
}

function getWorkingDaysDiff(startDate, endDate) {
  let count = 0;
  let current = dayjs(startDate);

  while (current.isBefore(endDate, 'day')) {
    const day = current.day(); // 0 = Sun, 6 = Sat

    if (day !== 0 && day !== 6) {
      count++; // only Mon-Fri
    }

    current = current.add(1, 'day');
  }

  return count;
}
function getTrackingData() {
  const { orderId, productId } = getParams();

  const order = orders.find(o => o.id === orderId);

  if (!order) {
    document.querySelector('.js-order-tracking').innerHTML =
      '<h2>Order not found </h2>';
    throw new Error('Order not found');
  }

  const cartItem = order.cart.find(item => item.productId === productId);
  const product = getProduct(productId);
  const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);

  const orderTime = dayjs(order.orderTime);
const deliveryDate = calculateDeliveryDate(order.orderTime, deliveryOption);

  return { orderTime, deliveryDate, cartItem, product };
}
function getProgressPercent(orderTime, deliveryDate) {
  const totalDays = getWorkingDaysDiff(orderTime, deliveryDate);
  const daysPassed = getWorkingDaysDiff(orderTime, dayjs());

  let percent = (daysPassed / totalDays) * 100;

  if (percent > 100) percent = 100;
  if (percent < 0) percent = 0;

  return percent;
}

function renderTrackingPage() {
  const { orderTime, deliveryDate, cartItem, product } = getTrackingData();
  const percent = getProgressPercent(orderTime, deliveryDate);

  if (percent >= 100) {
    const { orderId } = getParams();
    removeOrder(orderId);
    window.location.href = "orders.html";
    return;
  }

  let statusHTML = '';

  if (percent < 33) {
    statusHTML = `
      <div class="progress-label current-status">Preparing</div>
      <div class="progress-label">Shipped</div>
      <div class="progress-label">Delivered</div>
    `;
  } else if (percent < 66) {
    statusHTML = `
      <div class="progress-label">Preparing</div>
      <div class="progress-label current-status">Shipped</div>
      <div class="progress-label">Delivered</div>
    `;
  } else {
    statusHTML = `
      <div class="progress-label">Preparing</div>
      <div class="progress-label">Shipped</div>
      <div class="progress-label current-status">Delivered</div>
    `;
  }

  const html = `
    <div class="order-tracking">
      <a class="back-to-orders-link link-primary" href="orders.html">
        View all orders
      </a>

      <div class="delivery-date">
        Arriving on ${deliveryDate}
      </div>

      <div class="product-info">
        ${product.name}
      </div>

      <div class="product-info">
        Quantity: ${cartItem.quantity}
      </div>

      <img class="product-image" src="${product.image}">

      <div class="progress-labels-container">
        ${statusHTML}
      </div>

      <div class="progress-bar-container">
        <div class="progress-bar" style="width:${percent}%"></div>
      </div>
    </div>
  `;

  document.querySelector('.js-order-tracking').innerHTML = html;
}

renderTrackingPage();
renderAmazonHeader(); 
  