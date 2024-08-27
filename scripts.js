// Array to store product information
const products = [
    { name: 'Produkt 1', description: 'Opis Produktu 1', image: 'https://via.placeholder.com/150' },
    { name: 'Produkt 2', description: 'Opis Produktu 2', image: 'https://via.placeholder.com/150' },
    { name: 'Produkt 3', description: 'Opis Produktu 3', image: 'https://via.placeholder.com/150' },
    // Add more products as needed
];

// Function to render products dynamically
function renderProducts() {
    const productList = document.getElementById('product-list');
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product dark-mode';
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h2>${product.name}</h2>
            <p>${product.description}</p>
            <button>View Details</button>
        `;
        productList.appendChild(productDiv);
    });
}

// Call the renderProducts function to add products to the page
renderProducts();

// Function to toggle theme
function toggleTheme() {
    const body = document.body;
    const header = document.querySelector('header');
    const themeSwitch = document.querySelector('.theme-switch');
    const products = document.querySelectorAll('.product');
    const footer = document.querySelector('footer');

    body.classList.toggle('light-mode');
    body.classList.toggle('dark-mode');
    header.classList.toggle('light-mode');
    header.classList.toggle('dark-mode');
    themeSwitch.classList.toggle('light-mode');
    themeSwitch.classList.toggle('dark-mode');
    footer.classList.toggle('light-mode');
    footer.classList.toggle('dark-mode');

    products.forEach(product => {
        product.classList.toggle('light-mode');
        product.classList.toggle('dark-mode');
    });
}
