document.addEventListener('DOMContentLoaded', () => {
    fetch('/products')
        .then(response => response.json())
        .then(products => {
            const productList = document.getElementById('product-list');
            products.forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.className = 'product';
                productDiv.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <h2>${product.name}</h2>
                    <p>${product.price}</p>
                    <button data-id="${product.id}">Add to Cart</button>
                `;
                productList.appendChild(productDiv);
            });

            const buttons = document.querySelectorAll('.product button');
            buttons.forEach(button => {
                button.addEventListener('click', () => {
                    addToCart(button.dataset.id);
                });
            });
        });

    const cart = [];
    const cartCount = document.getElementById('cart-count');

    function addToCart(productId) {
        cart.push(productId);
        cartCount.textContent = cart.length;
    }
});

// document.addEventListener('DOMContentLoaded', () => {
//     fetch('/products')
//         .then(response => response.json())
//         .then(products => {
//             const productList = document.getElementById('product-list');
//             products.forEach(product => {
//                 const productDiv = document.createElement('div');
//                 productDiv.className = 'product';
//                 productDiv.innerHTML = `
//                     <img src="${product.image}" alt="${product.name}">
//                     <h2>${product.name}</h2>
//                     <p>${product.price}</p>
//                     <button data-id="${product.id}">Add to Cart</button>
//                 `;
//                 productList.appendChild(productDiv);
//             });

//             const buttons = document.querySelectorAll('.product button');
//             buttons.forEach(button => {
//                 button.addEventListener('click', () => {
//                     addToCart(button.dataset.id);
//                 });
//             });
//         });

//     const cart = [];
//     const cartCount = document.getElementById('cart-count');

//     function addToCart(productId) {
//         cart.push(productId);
//         cartCount.textContent = cart.length;
//     }
// });
