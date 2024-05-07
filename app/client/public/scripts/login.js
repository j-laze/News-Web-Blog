const form = document.getElementById("login_form");
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
    event.preventDefault();

    const { email, username, password, password_confirm } = form.elements;

    error_messages.innerHTML = "";

    //* Check for valid email address pattern
    if (!email.value.trim() || !isValidEmail(email.value)) {
        displayError(error_messages, "Invalid Email Address or Password.");
        form.reset();
        return;
    }

    //* Check that the password contain html tags
    if (containsXSS(email.value).length > 0 || containsXSS(password.value).length > 0) {
        console.log(containsXSS(email.value))
        displayError(error_messages, "Invalid Email Address or Password.");
        form.reset();
        return;
    }

    alert("Logged in")
    form.reset();

});