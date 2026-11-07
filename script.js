
// SHOPPING CART DATA

let cart = JSON.parse(localStorage.getItem("sticksNCart")) || [];


// ELEMENTS

const cartButton = document.getElementById("cartButton");
const cartDrawer = document.getElementById("cartDrawer");
const cartOverlay = document.getElementById("cartOverlay");

const closeCart = document.getElementById("closeCart");
const continueShopping = document.getElementById("continueShopping");

const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");


// OPEN CART

function openCart() {
    cartDrawer.classList.add("active");
    cartOverlay.classList.add("active");
}


// CLOSE CART

function hideCart() {
    cartDrawer.classList.remove("active");
    cartOverlay.classList.remove("active");
}

cartButton.addEventListener("click", openCart);
closeCart.addEventListener("click", hideCart);
continueShopping.addEventListener("click", hideCart);
cartOverlay.addEventListener("click", hideCart);


// ESCAPE KEY

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        hideCart();
    }
});


// ADD PRODUCTS

document.querySelectorAll(".add-button").forEach(button => {

    button.addEventListener("click", () => {

        const name = button.dataset.name;
        const price = Number(button.dataset.price);

        const existingProduct = cart.find(
            item => item.name === name
        );

        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.push({
                name,
                price,
                quantity: 1
            });
        }

        updateCart();

        button.textContent = "ADDED ✓";

        setTimeout(() => {
            button.textContent = "ADD +";
        }, 1000);

    });

});


// UPDATE CART

function updateCart() {
localStorage.setItem("sticksNCart", JSON.stringify(cart));
    let totalQuantity = 0;
    let totalPrice = 0;

    cart.forEach(item => {
        totalQuantity += item.quantity;
        totalPrice += item.price * item.quantity;
    });

    cartCount.textContent = totalQuantity;
    cartTotal.textContent = "₹" + totalPrice.toLocaleString("en-IN");

    if (cart.length === 0) {

        cartItems.innerHTML =
            '<p class="empty-cart">Your cart is currently empty.</p>';

        return;
    }

    cartItems.innerHTML = cart.map((item, index) => `

        <div class="cart-item">

            <div>
                <h3>${item.name}</h3>

                <p>₹${item.price.toLocaleString("en-IN")}</p>

                <div class="quantity-controls">

                    <button data-action="decrease"
                            data-index="${index}">−</button>

                    <span>${item.quantity}</span>

                    <button data-action="increase"
                            data-index="${index}">+</button>

                </div>
            </div>

            <button class="remove-item"
                    data-action="remove"
                    data-index="${index}">
                REMOVE
            </button>

        </div>

    `).join("");

}


// CART QUANTITY AND REMOVE BUTTONS

cartItems.addEventListener("click", event => {

    const button = event.target.closest("button[data-action]");

    if (!button) return;

    const index = Number(button.dataset.index);
    const action = button.dataset.action;

    if (!cart[index]) return;

    if (action === "increase") {
        cart[index].quantity++;
    }

    if (action === "decrease") {
        cart[index].quantity--;

        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }
    }

    if (action === "remove") {
        cart.splice(index, 1);
    }

    updateCart();

});



// CHECKOUT PLACEHOLDER

document.getElementById("checkoutButton")
    .addEventListener("click", () => {

        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        alert(
            "Your cart is ready! Real checkout will be connected later."
        );

    });


// INITIALISE CART

updateCart();
function openProduct(name, price, description) {
    const url = new URL("product.html", window.location.href);

    url.searchParams.set("name", name);
    url.searchParams.set("price", price);
    url.searchParams.set("description", description);

    window.location.href = url.href;
}
