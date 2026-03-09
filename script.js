// global array
let phones = [];

// load products from JSON
fetch("data/products.json")
  .then(response => response.json())
  .then(data => {
    phones = data;
    displayProducts(phones);

    //dropdowns dynamically
    dropdownMenu();

  })
  .catch(error => console.log("Error loading products:", error));


// display products function
const displayProducts = (products) => {

  const container = document.getElementById("product-container");

  // clear previous cards
  container.innerHTML = "";

  products.forEach(phone => {

    let specsList = "";

    // loop for specs
    phone.specs.forEach(spec => {
      specsList += `<li>${spec}</li>`;
    });

    // create card
    const card = `
      <div class="col-sm-3 mb-3">
        <div class="card border-${phone.color}">
          <div class="card-body">
            <h5 class="card-title text-${phone.color}">
              ${phone.model}
            </h5>
            <ul class="card-text">
              ${specsList}
            </ul>
          </div>
        </div>
      </div>
    `;

    container.innerHTML += card;

  });

};

//Dynamic Dropdown
const dropdownMenu = () => {

    const iphoneMenu = document.getElementById("iphone-menu");
    const samsungMenu = document.getElementById("samsung-menu");
    const xiaomiMenu = document.getElementById("xiaomi-menu");

    phones.forEach(phone =>{
        const item = document.createElement("li");
        item.innerHTML = `<a class="dropdown-item" href="#" data-id="${phone.id}">${phone.model}</a>`;

        if (phone.brand === "Apple") iphoneMenu.appendChild(item);
        if (phone.brand === "Samsung") samsungMenu.appendChild(item);
        if (phone.brand === "Xiaomi") xiaomiMenu.appendChild(item);
    });

};

// Filter products when dropdown item clicked
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("dropdown-item") && e.target.dataset.id) {
    const id = e.target.dataset.id;
    const filtered = phones.filter(phone => phone.id === id);
    displayProducts(filtered);
  }
});

// Get search input and form
const searchInput = document.getElementById("search-input");
const searchForm = document.getElementById("search-form");

// Live search as you type
searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase().trim();

  // Filter phones by brand or model
  const filtered = phones.filter(phone =>
    phone.model.toLowerCase().includes(query) ||
    phone.brand.toLowerCase().includes(query)
  );

  displayProducts(filtered);
});

// Optional: prevent form submission from reloading page
searchForm.addEventListener("submit", (e) => e.preventDefault());