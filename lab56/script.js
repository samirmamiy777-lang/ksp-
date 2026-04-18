let cart = [];

const filterButtons = document.querySelectorAll('[data-filter]');
const productElements = document.querySelectorAll('.product');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const category = button.dataset.filter;
        productElements.forEach(product => {
            if (category === 'all' || product.dataset.category === category) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    });
});

const addToCartButtons = document.querySelectorAll('.add-to-cart');

addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const name = button.dataset.name;
        const price = Number(button.dataset.price);
        cart.push({ name, price });
        renderCart();
        saveCart();
    });
});

const renderCart = () => {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Корзина пуста</p>';
        cartTotal.textContent = 'Итого: 0 ₽';
        saveCart();
        return;
    }

    let html = '<ul>';
    let total = 0;
    cart.forEach((item, index) => {
        total += item.price;
        html += `<li>${item.name} - ${item.price} ₽ 
            <button class="remove-item" data-index="${index}">Удалить</button></li>`;
    });
    html += '</ul>';
    cartItems.innerHTML = html;
    cartTotal.textContent = `Итого: ${total} ₽`;

    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', () => {
            const index = button.dataset.index;
            cart.splice(index, 1);
            renderCart();
            saveCart();
        });
    });
    
    saveCart();
};

document.getElementById('clear-cart')?.addEventListener('click', () => {
    cart = [];
    renderCart();
    saveCart();
});

document.getElementById('checkout')?.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Корзина пуста');
    } else {
        alert('Покупка успешно выполнена!');
        cart = [];
        renderCart();
        saveCart();
    }
});

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function loadCart() {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
        cart = JSON.parse(savedCart);
        renderCart();
    }
}

loadCart();