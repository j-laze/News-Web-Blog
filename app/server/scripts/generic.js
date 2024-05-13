function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function containsXSS(text) {
  return text.match(/(<[^>]*>)(.*?)([^>]*>)/);
}

function replaceXSS(text) {
  return text.replace(/(<[^>]*>)(.*?)([^>]*>)/, "");
}

function isStrongPassword(password) {
  return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!?_@#$%^&*]).{8,}$/.test(
    password
  );
}

module.exports = {
  isValidEmail,
  containsXSS,
  replaceXSS,
  isStrongPassword,
};
