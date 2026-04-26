export let orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order) {
  orders.unshift(order); 
  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem('orders', JSON.stringify(orders));
}
export function removeOrder(orderId) {
  orders = orders.filter(order => order.id !== orderId);
  localStorage.setItem('orders', JSON.stringify(orders));
}