const form = document.getElementById("register_form");
const error_messages = document.getElementById("error_messages");

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function containsXSS(text) {
    return text.match(/(<[^>]*>)(.*?)([^>]*>)/);
}

function displayError(error_element, error_message) {
    error_element.innerHTML += `<div class="highlighted">${error_message}</div>`;
}

form.addEventListener("submit", (event) => {
    event.defaultPrevented();

    
});
