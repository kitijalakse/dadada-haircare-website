// JavaScript Document


const languageButtons = document.querySelectorAll(".lang-btn");
const translatableElements = document.querySelectorAll("[data-en][data-lv]");
const translatableInputs = document.querySelectorAll("[data-placeholder-en][data-placeholder-lv]");

languageButtons.forEach(button => {
    button.addEventListener("click", function () {

        currentLanguage = button.dataset.lang;

        // Translate regular text elements
        translatableElements.forEach(element => {
            element.innerHTML = element.dataset[currentLanguage];
        });

        // Translate input placeholders
        translatableInputs.forEach(input => {
            input.placeholder = input.dataset[`placeholder${currentLanguage === "en" ? "En" : "Lv"}`];
        });

        // Update active language button
        languageButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        // Update product translations
        displayProducts();
    });
});

const navbar = document.querySelector(".navbar");
const hero = document.querySelector(".hero");

window.addEventListener("scroll", function () {
    if (window.scrollY > hero.offsetHeight) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

const newsletterForm = document.querySelector(".newsletter-form");

newsletterForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = newsletterForm.elements.name.value;
    const email = newsletterForm.elements.email.value;

    alert(`Thank you, ${name}! You have successfully signed up.`);
    
    newsletterForm.reset();
});


let currentLanguage = "en";
let products = [];

const productGrid = document.querySelector("#product-grid");

function displayProducts() {

    productGrid.innerHTML = "";

    products.forEach(product => {

        const productCard = `
            <div class="product-card">

                <div class="product-image">
                    <img src="${product.image}" alt="DADADA ${product.name[currentLanguage]}">
                </div>

                <div class="product-info">
                    <h3>${product.name[currentLanguage]}</h3>
                    <p>${product.description[currentLanguage]}</p>
                    <span class="product-price">€${product.price.toFixed(2)}</span>
                </div>

            </div>
        `;

        productGrid.innerHTML += productCard;

    });
}

fetch("products.json")
    .then(response => response.json())
    .then(data => {
        products = data.products;
        displayProducts();
    })
    .catch(error => {
        console.error("Error loading products:", error);
    });
