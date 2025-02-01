const aboutSwiper = new Swiper('.about .swiper', {
    loop: true,
    pagination: {
        el: '.about .swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.about .swiper-button-next',
        prevEl: '.about .swiper-button-prev',
    },
    autoplay: {
        delay: 5000,
    },
});

const mainSwiper = new Swiper('.mySwiper', {
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        renderBullet: (index, className) => `<span class="${className}">${index + 1}</span>`
    },
});

const cartIcon = document.getElementById('cart-icon');
const cart = document.querySelector('.cart');
const closeShopping = document.querySelector('.closeShopping');
const addToCartButtons = document.querySelectorAll('.btn');
const cartList = document.querySelector('.listCard');
const quantityBadge = document.querySelector('.quantity');
const totalPriceElement = document.querySelector('.total');

let total = 0;

cartIcon.addEventListener('click', () => cart.classList.toggle('active'));
closeShopping.addEventListener('click', () => cart.classList.remove('active'));

addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const productCard = button.closest('.card');
        const productName = productCard.querySelector('.card-title').textContent;
        const productPrice = parseFloat(productCard.querySelector('.price h3').textContent.replace('$', ''));
        const productImage = productCard.querySelector('img').src;

        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <div><img src="${productImage}" alt="${productName}" style="width: 60px; height: 60px;"></div>
            <div>${productName}</div>
            <div>$${productPrice}</div>
            <div><button class="remove-btn">Remove</button></div>
        `;
        cartList.appendChild(listItem);

        listItem.querySelector('.remove-btn').addEventListener('click', () => {
            cartList.removeChild(listItem);
            total -= productPrice;
            updateCart();
        });

        total += productPrice;
        updateCart();
    });
});

const updateCart = () => {
    quantityBadge.textContent = cartList.children.length;
    totalPriceElement.textContent = `$${total.toFixed(2)}`;
};
