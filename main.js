// main.js

// LOAD PRODUCTS
let products = JSON.parse(localStorage.getItem("products")) || [];

const productContainer = document.querySelector(".product-container");

// DEFAULT PRODUCTS
const defaultProducts = [
  {
    name: "Nike Air Jordan",
    price: "2.500.000đ",
    image: "IMG/nike air jordan.jpg",
    category: "Sneaker",
  },

  {
    name: "Adidas Ultra Boost",
    price: "3.200.000đ",
    image: "IMG/Ultra Bosst.jpg",
    category: "Chạy Bộ",
  },

  {
    name: "Puma Sport",
    price: "1.900.000đ",
    image: "IMG/PUMA.jpg",
    category: "Thể Thao",
  },

  {
    name: "New Balance",
    price: "2.700.000đ",
    image: "IMG/Balance.jpg",
    category: "Sneaker",
  },

  {
    name: "Giày bóng đá Mizuno",
    price: "2.600.000đ",
    image: "IMG/Mizuno.jpg",
    category: "Bóng Đá",
  },

  {
    name: "VAN",
    price: "2.000.000đ",
    image: "IMG/VAN.jpg",
    category: "Sneaker",
  },

  {
    name: "MC QUEEN",
    price: "2.500.000đ",
    image: "IMG/MC QUEEN.jpg",
    category: "Giày Da",
  },

  {
    name: "NIKE",
    price: "3.000.000đ",
    image: "IMG/NIKE.jpg",
    category: "Bóng Đá",
  },
];

// SAVE PRODUCTS
if (products.length === 0) {
  localStorage.setItem("products", JSON.stringify(defaultProducts));

  products = defaultProducts;
}

// SEARCH HTML
const searchHTML = `

<div style="
  width:90%;
  margin:120px auto 40px;
  display:flex;
  gap:15px;
  flex-wrap:wrap;
">

  <input
    type="text"
    id="search-input"
    placeholder="Tìm kiếm sản phẩm..."
    style="
      flex:1;
      padding:15px;
      border:none;
      border-radius:10px;
      font-size:17px;
    "
  >

  <select
    id="category-filter"
    style="
      padding:15px;
      border:none;
      border-radius:10px;
      font-size:17px;
    "
  >
    <option value="all">Tất cả</option>

    <option value="Sneaker">Sneaker</option>

    <option value="Chạy Bộ">Chạy Bộ</option>

    <option value="Giày Da">Giày Da</option>

    <option value="Bóng Đá">Bóng Đá</option>

    <option value="Thể Thao">Thể Thao</option>

  </select>

</div>

`;

document.querySelector(".title").insertAdjacentHTML("beforebegin", searchHTML);

// SHOW PRODUCTS
function showProducts(list = products) {
  productContainer.innerHTML = "";

  list.forEach((item) => {
    productContainer.innerHTML += `

    <div class="product">

      <img src="${item.image}" alt="Giày" />

      <div class="product-info">

        <h3>${item.name}</h3>

        <p class="price">${item.price}</p>

        <p style="
          color: gray;
          margin-bottom: 15px;
          font-weight:bold;
        ">
          ${item.category || "Giày"}
        </p>

        <button
          class="btn"
          onclick="viewProduct(
            '${item.name}',
            '${item.price}',
            '${item.image}',
            '${item.category || "Giày"}'
          )">

          Xem Chi Tiết

        </button>

      </div>

    </div>

    `;
  });

  // EMPTY
  if (list.length === 0) {
    productContainer.innerHTML = `

      <h2 style="
        text-align:center;
        width:100%;
        color:red;
      ">
        Không tìm thấy sản phẩm
      </h2>

    `;
  }
}

// VIEW PRODUCT
function viewProduct(name, price, image, category) {
  window.location.href = `
  product.html
  ?name=${encodeURIComponent(name)}
  &price=${encodeURIComponent(price)}
  &image=${encodeURIComponent(image)}
  &category=${encodeURIComponent(category)}
  `;
}

// SEARCH
document
  .getElementById("search-input")
  .addEventListener("keyup", filterProducts);

document
  .getElementById("category-filter")
  .addEventListener("change", filterProducts);

// FILTER
function filterProducts() {
  const keyword = document.getElementById("search-input").value.toLowerCase();

  const category = document.getElementById("category-filter").value;

  const filtered = products.filter((item) => {
    const matchName = item.name.toLowerCase().includes(keyword);

    const matchCategory = category === "all" || item.category === category;

    return matchName && matchCategory;
  });

  showProducts(filtered);
}

// START
showProducts();
