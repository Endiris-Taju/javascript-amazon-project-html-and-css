
export let cart = [];

loadFromStorage();

export function loadFromStorage() {
  const cartFromStorage = localStorage.getItem('cart');

  const parsedCart = cartFromStorage
    ? JSON.parse(cartFromStorage)
    : null;

  if (parsedCart) {
    cart.length = 0;
    cart.push(...parsedCart);
  } else {
    cart.length = 0;
    cart.push(
      {
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: '1'
      },
      {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionId: '2'
      }
    );
  }
}

 function saveToStorage(){
  localStorage.setItem('cart', JSON.stringify(cart));
 };
 export function addToCart(productId){
    let matchingItem;
      cart.forEach((cartItem)=>{
        if(productId === cartItem.productId){
          matchingItem = cartItem;
        }
       // saveToStorage();
      });

      const quantitySelector= document.querySelector(`.js-quantity-selector-${productId}`);

      const quantity= quantitySelector ? Number(quantitySelector.value):1;

      if(matchingItem){
        matchingItem.quantity +=quantity;
      }else{
        cart.push({
        //shortcuts
        productId,
        quantity,
        deliveryOptionId:'1'
      });
    }
      saveToStorage();
   };
   

export function removeFromCart(productId) {
  cart = cart.filter(cartItem => cartItem.productId !== productId);
  saveToStorage();
}

    export function calculateCartQuantity(){
     let cartQuantity=0;
      cart.forEach((cartItem)=>{
        cartQuantity+=cartItem.quantity
   });

  return cartQuantity;
  }

 export function updateQuantity(productId, newQuantity) {
  const matchingItem = cart.find(cartItem => cartItem.productId === productId);
  if (!matchingItem) return;  

  matchingItem.quantity = newQuantity;
  saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  const matchingItem = cart.find(cartItem => cartItem.productId === productId);
  if (!matchingItem) return;  

  matchingItem.deliveryOptionId = deliveryOptionId;
  saveToStorage();
}

