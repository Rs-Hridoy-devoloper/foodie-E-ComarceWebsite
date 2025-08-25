// swiper js
    var swiper = new Swiper(".mySwiper", {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,

      navigation: {
        nextEl: "#next",
        prevEl: "#prev",
      },
    });


// Open cart tab on cart icon click
document.addEventListener('DOMContentLoaded', function () {
  const cartIcon = document.getElementById('cart-icon');
  const cartTab = document.getElementById('cart-tab');
  const closeCart = document.getElementById('close-cart');
  const cartItemsContainer = document.getElementById('cart-items') || cartTab.querySelector('.space-y-6');

  if (cartIcon && cartTab) {
    cartIcon.addEventListener('click', function (e) {
      e.preventDefault();
      cartTab.classList.remove('hidden');
    });
  }

  if (closeCart && cartTab) {
    closeCart.addEventListener('click', function () {
      cartTab.classList.add('hidden');
    });
  }

  // Add to Cart with Quantity Logic
  document.querySelectorAll('.add-to-cart-btn').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const title = btn.getAttribute('data-title');
      const price = btn.getAttribute('data-price');
      const imgSrc = btn.getAttribute('data-img');
      if (!title || !price || !imgSrc) return;

      // Check if item already exists in cart
      const existingItem = Array.from(cartItemsContainer.children).find(item =>
        item.querySelector('h4')?.textContent === title
      );

      if (existingItem) {
        const quantitySpan = existingItem.querySelector('span');
        quantitySpan.textContent = parseInt(quantitySpan.textContent) + 1;
      } else {
        const cartItem = document.createElement('div');
        cartItem.className = "flex items-center justify-between";
        cartItem.innerHTML = `
          <div class="flex items-center gap-4">
            <img src="${imgSrc}" alt="${title}" class="w-12 h-12 object-contain">
            <div>
              <h4 class="font-semibold">${title}</h4>
              <p class="text-gray-700 text-sm">$${price}</p>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <button class="w-6 h-6 rounded bg-gray-200 cursor-pointer text-xl leading-none flex items-center justify-center">−</button>
            <span>1</span>
            <button class="w-6 h-6 rounded bg-gray-200 cursor-pointer text-xl leading-none flex items-center justify-center">+</button>
          </div>
        `;
        cartItemsContainer.appendChild(cartItem);
      }
    });
  });
});
