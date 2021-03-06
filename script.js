var productData = {
   "product": [
      {
         "id": 1,
         "title": "Product Name 1",
         "price": "$ 78",
         "size": "L"
      },
      {
         "id": 2,
         "title": "Product Name 2",
         "price": "$ 78",
         "size": "S"
      },
      {
         "id": 3,
         "title": "Product Name 3",
         "price": "$ 78",
         "size": "M"
      },
      {
         "id": 4,
         "title": "Product Name 4",
         "price": "$ 78",
         "size": "M"
      },
      {
         "id": 5,
         "title": "Product Name 5",
         "price": "$ 78",
         "size": "M"
      },
      {
         "id": 6,
         "title": "Product Name 6",
         "price": "$ 78",
         "size": "XL"
      },
      {
         "id": 7,
         "title": "Product Name 7",
         "price": "$ 78",
         "size": "XL"
      },
      {
         "id": 8,
         "title": "Product Name 8",
         "price": "$ 78",
         "size": "XL"
      },
      {
         "id": 9,
         "title": "Product Name 9",
         "price": "$ 78",
         "size": "XL"
      },
      {
         "id": 10,
         "title": "Product Name 10",
         "price": "$ 78",
         "size": "S"
      },
      {
         "id": 11,
         "title": "Product Name 11",
         "price": "$ 78",
         "size": "L"
      },
      {
         "id": 12,
         "title": "Product Name 12",
         "price": "$ 78",
         "size": "L"
      },
      {
         "id": 13,
         "title": "Product Name 13",
         "price": "$ 78",
         "size": "M"
      },
      {
         "id": 14,
         "title": "Product Name 14",
         "price": "$ 78",
         "size": "M"
      },
      {
         "id": 15,
         "title": "Product Name 15",
         "price": "$ 78",
         "size": "L"
      },
      {
         "id": 16,
         "title": "Product Name 16",
         "price": "$ 78",
         "size": "S"
      },
      {
         "id": 17,
         "title": "Product Name 17",
         "price": "$ 78",
         "size": "S"
      }
   ]
}

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
   productData.product.map(data => loadProduct(data));

   // //! Using fetch
   // fetch('./data.json')
   //    .then(res => res.json())
   //    .then(data => {
   //       data.map((loadProduct))
   //    });

   //! Initially display all products
   filterProduct("all");

   //! Add to cart
   let addCart = document.getElementsByClassName('add-cart');
   for (let i = 0; i < addCart.length; i++) {
      let button = addCart[i];
      button.addEventListener('click', addCartClicked);
   }

   //! Quantity Changes
   let quantityInputs = document.getElementsByClassName('cart-quantity');
   for (let i = 0; i < quantityInputs.length; i++) {
      const input = quantityInputs[i];
      input.addEventListener('change', quantityChanged);
   }

   //! Remove items from cart
   const removeCartButton = document.getElementsByClassName('cart-remove');
   for (let i = 0; i < removeCartButton.length; i++) {
      let button = removeCartButton[i];
      button.addEventListener('click', removeCartItem);
   }

   //! Buy Button
   document.getElementsByClassName('btn-buy')[0].addEventListener('click', buyButtonClicked);
};

//! Adding Product Lists
function loadProduct(data) {

   let div = document.createElement('div')
   div.classList.add('pro', data.size)

   let productContainer = document.getElementsByClassName('pro-container')[0]

   let productContent = `
                  <span id="free">Free Shipping</span>

                  <img src="./img/card6.png" alt="product" class="product-img">

                  <div class="des">
                     <h5 class="product-title">${data.title}</h5>
                     <h4 class="price">${data.price}</h4>
                     <span>Size: ${data.size}</span>
                  </div>

                  <button class="btn add-cart">
                     Add To Cart
                  </button>
`
   div.innerHTML = productContent
   productContainer.append(div);
}

//! Filter Products by Sizes
function filterProduct(value) {
   let buttons = document.querySelectorAll(".size-btn");
   buttons.forEach((button) => {
      if (value.toUpperCase() == button.innerText.toUpperCase()) {
         console.log(button.innerText);
         button.classList.add("size-active");
      } else {
         button.classList.remove("size-active");
      }
   });

   let elements = document.querySelectorAll(".pro");
   elements.forEach((element) => {
      if (value == "all") {
         element.classList.remove("hide");
      } else {
         if (element.classList.contains(value)) {
            element.classList.remove("hide");
         } else {
            element.classList.add("hide");
         }
      }
   });
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
      total = Math.round(total * 100) / 100; //! for decimal prices

      document.getElementsByClassName('total-price')[0].innerText = '$' + total;
   }
}

//! Quantity Changed
function quantityChanged(event) {
   let input = event.target;
   if (isNaN(input.value) || input.value <= 0) {
      input.value = 1;
   }
   updateTotal();
}

//! Remove Cart Items
function removeCartItem(event) {
   let buttonClicked = event.target;
   buttonClicked.parentElement.remove();
   updateTotal();
}

//! buyButtonClicked
function buyButtonClicked(event) {
   alert('Ordered Placed')

   let cartContent = document.getElementsByClassName('cart-content')[0]

   while (cartContent.hasChildNodes()) {
      cartContent.removeChild(cartContent.firstChild)
   }
   updateTotal();
}
