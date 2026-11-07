
const params = new URLSearchParams(window.location.search);

const name = params.get("name") || "Everyday Essential";
const price = Number(params.get("price")) || 499;
const description = params.get("description") || "Discover something useful.";

document.getElementById("productName").textContent = name;
document.getElementById("productPrice").textContent =
   name === "Dont mess with the Don"
    ? "₹10M"
    : "₹" + price.toLocaleString("en-IN");
document.getElementById("productDescription").textContent = description;


const productNumbers = {
    "I like Old women": "01",
    "Dont mess with the Don": "02",
    "Patience": "03"
};

document.getElementById("productNumber").textContent =
    productNumbers[name] || "01";

const productImages = {
    "I like Old women": "images/product-1.png",
    "Dont mess with the Don": "images/product-2.png",
    "Patience": "images/product-3.png"
};

const detailImage = document.querySelector(".product-detail-image");

detailImage.style.backgroundImage =
    `url("${productImages[name] || productImages["I like Old women"]}")`;

detailImage.style.backgroundSize = "contain";
detailImage.style.backgroundPosition = "center";
detailImage.style.backgroundRepeat = "no-repeat";


let quantity = 1;

const quantityDisplay = document.getElementById("quantity");

document.getElementById("increaseQty").addEventListener("click", () => {
    quantity++;
    quantityDisplay.textContent = quantity;
});

document.getElementById("decreaseQty").addEventListener("click", () => {
    if (quantity > 1) {
        quantity--;
        quantityDisplay.textContent = quantity;
    }
});

document.getElementById("detailAdd").addEventListener("click", () => {
    let cart = JSON.parse(localStorage.getItem("sticksNCart")) || [];

    const existingProduct = cart.find(item => item.name === name);

    if (existingProduct) {
        existingProduct.quantity += quantity;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: quantity
        });
    }

    localStorage.setItem("sticksNCart", JSON.stringify(cart));

    alert("Added to your cart successfully!");

    window.location.href = "index.html";
});
