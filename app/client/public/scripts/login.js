const form = document.getElementById("login_form");
const error_messages = document.getElementById("error_messages");

function displayError(error_element, error_message) {
    error_element.innerHTML += `<div class="highlighted">${error_message}</div>`;
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const { email, username, password, password_confirm } = form.elements;

    error_messages.innerHTML = "";

    

    alert("Logged in")
    form.reset();

});