var productData = {
   "product": [
      {
         "id": 1,
         "title": "Product Name",
         "price": "$ 78"
      },
      {
         "id": 2,
         "title": "Product Name",
         "price": "$ 78"
      },
      {
         "id": 3,
         "title": "Product Name",
         "price": "$ 78"
      },
      {
         "id": 4,
         "title": "Product Name",
         "price": "$ 78"
      },
      {
         "id": 5,
         "title": "Product Name",
         "price": "$ 78"
      },
      {
         "id": 6,
         "title": "Product Name",
         "price": "$ 78"
      },
      {
         "id": 7,
         "title": "Product Name",
         "price": "$ 78"
      },
      {
         "id": 8,
         "title": "Product Name",
         "price": "$ 78"
      },
      {
         "id": 9,
         "title": "Product Name",
         "price": "$ 78"
      },
      {
         "id": 10,
         "title": "Product Name",
         "price": "$ 78"
      }
   ]
}

//! Cart
const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const closeCart = document.querySelector("#close-cart");

//! Open Cart
cartIcon.onclick = () => {
   cart.classList.add("active");
};

//! Close Cart
closeCart.onclick = () => {
   cart.classList.remove("active");
};

//! Cart Working JS
if (document.readyState == 'loading') {
   document.addEventListener('DOMContentLoaded', ready);
} else {
   ready();
}

//! ready function
function ready() {

   //! Adding Product Lists
   productData.product.forEach(data => loadProduct(data));

   //! Remove items from cart
   const removeCartButton = document.getElementsByClassName('cart-remove');
   for (let i = 0; i < removeCartButton.length; i++) {
      let button = removeCartButton[i];
      button.addEventListener('click', removeCartItem);
   }

   //! Quantity Changes
   let quantityInputs = document.getElementsByClassName('cart-quantity');
   for (let i = 0; i < quantityInputs.length; i++) {
      const input = quantityInputs[i];
      input.addEventListener('change', quantityChanged);
   }

   //! Add to cart
   let addCart = document.getElementsByClassName('add-cart');
   for (let i = 0; i < addCart.length; i++) {
      let button = addCart[i];
      button.addEventListener('click', addCartClicked);
   }
};

//! Remove Cart Items
function removeCartItem(event) {
   let buttonClicked = event.target;
   buttonClicked.parentElement.remove();
   updateTotal();
}

//! Quantity Changed
function quantityChanged(event) {
   let input = event.target;
   if (isNaN(input.value) || input.value <= 0) {
      input.value = 1;
   }
   updateTotal();
}



//! Add to Cart
function addCartClicked(event) {
   let shopProducts = event.target.parentElement;

   let title = shopProducts.getElementsByClassName('product-title')[0].innerText;
   let price = shopProducts.getElementsByClassName('price')[0].innerText;
   let productImg = shopProducts.getElementsByClassName('product-img')[0].src;

   addProductToCart(title, price, productImg);
   updateTotal();
}

function addProductToCart(title, price, productImg) {
   let cartShopBox = document.createElement('div');
   cartShopBox.classList.add('cart-box')

   let cartItems = document.getElementsByClassName('cart-content')[0]
   let cartItemsNames = document.getElementsByClassName('cart-product-title')

   let cartBoxContent = `
                  <img src="${productImg}" alt="img" class="product-img">
                  <div class="detail-box">
                  <div class="cart-product-title">${title}</div>
                  <div class="cart-price">${price}</div>
                  <input type="number" value="1" class="cart-quantity">
                  </div>
                  <!-- ! Remove Cart -->
                  <i class="bx bxs-trash-alt cart-remove"></i>
`

   cartShopBox.innerHTML = cartBoxContent
   cartItems.append(cartShopBox);

   cartShopBox.
      getElementsByClassName('cart-remove')[0].
      addEventListener('click', removeCartItem)

   cartShopBox.
      getElementsByClassName('cart-quantity')[0].
      addEventListener('change', quantityChanged)
}

//! Update Total
function updateTotal() {
   let cartContent = document.getElementsByClassName('cart-content')[0];
   let cartBoxes = document.getElementsByClassName('cart-box');

   let total = 0;

   for (let i = 0; i < cartBoxes.length; i++) {
      let cartBox = cartBoxes[i];
      let priceElement = cartBox.getElementsByClassName('cart-price')[0];
      let quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];

      let price = parseFloat(priceElement.innerText.replace('$', ''));

      let quantity = quantityElement.value;

      total = total + (price * quantity);
      total = Math.round(total * 100) / 100;

      document.getElementsByClassName('total-price')[0].innerText = '$' + total;
   }

}

//! Adding Product Lists
function loadProduct(data) {

   let div = document.createElement('div')
   div.classList.add('pro')

   let productContainer = document.getElementsByClassName('pro-container')[0]

   let productContent = `
                  <span id="free">Free Shipping</span>

                  <img src="./img/card6.png" alt="product" class="product-img">

                  <div class="des">
                     <h5 class="product-title">${data.title}</h5>
                     <h4 class="price">${data.price}</h4>
                     <span>or 9 x $1.21</span>
                  </div>

                  <button class="btn add-cart">
                     Add To Cart
                  </button>
`

   div.innerHTML = productContent
   productContainer.append(div);

}

