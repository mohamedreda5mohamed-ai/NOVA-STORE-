const products = [
  {
    id: 1,
    name: "سماعة لاسلكية",
    description: "سماعة بلوتوث بجودة صوت ممتازة.",
    price: 450,
    category: "electronics",
    icon: "🎧"
  },

  {
    id: 2,
    name: "ساعة ذكية",
    description: "ساعة ذكية بتصميم عصري.",
    price: 850,
    category: "electronics",
    icon: "⌚"
  },

  {
    id: 3,
    name: "كيبورد ميكانيكي",
    description: "كيبورد مناسب للألعاب والبرمجة.",
    price: 1200,
    category: "electronics",
    icon: "⌨️"
  },

  {
    id: 4,
    name: "ماوس لاسلكي",
    description: "ماوس سريع ومريح للاستخدام اليومي.",
    price: 350,
    category: "electronics",
    icon: "🖱️"
  },

  {
    id: 5,
    name: "تيشيرت أسود",
    description: "تيشيرت مريح بتصميم بسيط.",
    price: 300,
    category: "clothes",
    icon: "👕"
  },

  {
    id: 6,
    name: "هودي",
    description: "هودي مناسب للخروج والاستخدام اليومي.",
    price: 650,
    category: "clothes",
    icon: "🧥"
  },

  {
    id: 7,
    name: "شنطة ظهر",
    description: "شنطة عملية للابتوب والأغراض اليومية.",
    price: 550,
    category: "other",
    icon: "🎒"
  },

  {
    id: 8,
    name: "زجاجة مياه",
    description: "زجاجة مياه عملية للاستخدام اليومي.",
    price: 180,
    category: "other",
    icon: "🥤"
  }
];


let cart =
  JSON.parse(localStorage.getItem("novaCart")) || [];


const productsGrid =
  document.getElementById("productsGrid");


function displayProducts(list = products) {

  productsGrid.innerHTML = "";

  list.forEach(product => {

    const productElement =
      document.createElement("div");

    productElement.className = "product";

    productElement.innerHTML = `

      <div class="product-image">
        ${product.icon}
      </div>

      <div class="product-info">

        <h3>
          ${product.name}
        </h3>

        <p>
          ${product.description}
        </p>

        <div class="product-bottom">

          <span class="price">
            ${product.price.toLocaleString("ar-EG")} ج.م
          </span>

          <button
            class="add-btn"
            onclick="addToCart(${product.id})"
          >
            أضف للسلة
          </button>

        </div>

      </div>
    `;

    productsGrid.appendChild(productElement);
  });
}


function filterProducts(category, button) {

  document
    .querySelectorAll(".category")
    .forEach(btn => {
      btn.classList.remove("active");
    });

  button.classList.add("active");


  if (category === "all") {

    displayProducts(products);

    return;
  }


  const filtered =
    products.filter(
      product => product.category === category
    );


  displayProducts(filtered);
}


function addToCart(productId) {

  const product =
    products.find(
      product => product.id === productId
    );


  cart.push(product);

  saveCart();

  updateCart();

  openCart();
}


function removeFromCart(index) {

  cart.splice(index, 1);

  saveCart();

  updateCart();
}


function updateCart() {

  const cartItems =
    document.getElementById("cartItems");

  const cartCount =
    document.getElementById("cartCount");

  const cartTotal =
    document.getElementById("cartTotal");


  cartCount.textContent =
    cart.length;


  if (cart.length === 0) {

    cartItems.innerHTML = `
      <div class="empty-cart">
        السلة فارغة 🛒
      </div>
    `;

    cartTotal.textContent =
      "0 ج.م";

    return;
  }


  let total = 0;

  cartItems.innerHTML = "";


  cart.forEach((product, index) => {

    total += product.price;


    const item =
      document.createElement("div");

    item.className = "cart-item";


    item.innerHTML = `

      <div class="cart-item-icon">
        ${product.icon}
      </div>

      <div class="cart-item-info">

        <h4>
          ${product.name}
        </h4>

        <p>
          ${product.price.toLocaleString("ar-EG")} ج.م
        </p>

      </div>

      <button
        class="remove-btn"
        onclick="removeFromCart(${index})"
      >
        حذف
      </button>
    `;


    cartItems.appendChild(item);
  });


  cartTotal.textContent =
    `${total.toLocaleString("ar-EG")} ج.م`;
}


function openCart() {

  document
    .getElementById("cartOverlay")
    .classList.add("show");

  updateCart();
}


function closeCart(event) {

  if (
    event &&
    event.target !==
    document.getElementById("cartOverlay")
  ) {
    return;
  }


  document
    .getElementById("cartOverlay")
    .classList.remove("show");
}


function saveCart() {

  localStorage.setItem(
    "novaCart",
    JSON.stringify(cart)
  );
}


function orderWhatsApp() {

  if (cart.length === 0) {

    alert("السلة فارغة.");

    return;
  }


  let message =
    "السلام عليكم، أريد طلب:%0A%0A";


  let total = 0;


  cart.forEach((product, index) => {

    message +=
      `${index + 1}- ${product.name} - ${product.price} ج.م%0A`;

    total += product.price;
  });


  message +=
    `%0Aالإجمالي: ${total} ج.م`;


  /*
    غيّر الرقم التالي إلى رقم واتساب صاحب المتجر.
    مثال مصر:
    01205626780
  */

  const phone =
    "201000000000";


  const url =
    `https://wa.me/${phone}?text=${message}`;


  window.open(url, "_blank");
}


displayProducts();

updateCart();