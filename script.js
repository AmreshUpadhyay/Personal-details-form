const form = document.querySelector("form");
const name = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const age = document.getElementById("age");
const occupation = document.getElementById("occupation");
const address = document.getElementById("address");
const idProof = document.getElementById("idProof");

const nameRegex = /^[A-Za-z]{3,}(?: [A-Za-z]+){0,4}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const phoneRegex = /^[6-9]\d{9}$/;
const ageRegex = /^(1[89]|[2-9]\d|100)$/;
const occupationRegex = /^(?!.*\s{2,})[A-Za-z&/-]+(?: [A-Za-z&/-]+){0,4}$/;
const addressRegex = /^(?!.*\s{2,})[A-Za-z0-9#.,/\-]+(?: [A-Za-z0-9#.,/\-]+){2,99}$/;

function ensureWrapper(input) {
  if (input.parentElement.classList.contains("input-wrapper")) {
    return input.parentElement;
  }
  const wrapper = document.createElement("div");
  wrapper.classList.add("input-wrapper");
  input.parentElement.insertBefore(wrapper, input);
  wrapper.appendChild(input);
  return wrapper;
}

function showError(input, message) {
  const wrapper = ensureWrapper(input);

  let error = wrapper.querySelector("small");
  if (!error) {
    error = document.createElement("small");
    wrapper.appendChild(error);
  }

  error.textContent = message;
  error.style.color = "red";

  input.classList.add("error");
  input.classList.remove("success");
}

function clearError(input) {
  const wrapper = ensureWrapper(input);

  const error = wrapper.querySelector("small");
  if (error) {
    error.textContent = "";
  }

  input.classList.remove("error");
  input.classList.add("success");
}

function validate(input, regex, message) {
  const value = input.value.trim();

  if (value === "") {
    showError(input, "This field is required");
    return false;
  }

  if (!regex.test(value)) {
    showError(input, message);
    return false;
  }

  clearError(input);
  return true;
}

name.addEventListener("input", () => {
  validate(name, nameRegex, "Enter a valid name");
});

email.addEventListener("input", () => {
  validate(email, emailRegex, "Enter a valid email");
});

phone.addEventListener("input", () => {
  phone.value = phone.value.replace(/\D/g, "");
  validate(phone, phoneRegex, "Enter a valid Indian phone number");
});

age.addEventListener("input", () => {
  age.value = age.value.replace(/\D/g, "");
  validate(age, ageRegex, "Age must be between 18 and 100");
});

occupation.addEventListener("input", () => {
  validate(occupation, occupationRegex, "Enter a valid occupation");
});

address.addEventListener("input", () => {
  validate(address, addressRegex, "Enter a valid address");
});

idProof.addEventListener("change", () => {
  const file = idProof.files[0];

  if (!file) {
    showError(idProof, "Please upload an ID proof");
    return;
  }

  const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
  const maxSize = 2 * 1024 * 1024;

  if (!allowedTypes.includes(file.type)) {
    showError(idProof, "Only PDF, JPG and PNG files are allowed");
    idProof.value = "";
    return;
  }

  if (file.size > maxSize) {
    showError(idProof, "Maximum file size is 2 MB");
    idProof.value = "";
    return;
  }

  clearError(idProof);
});
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const isValid =
    validate(name, nameRegex, "Enter a valid name") &&
    validate(email, emailRegex, "Enter a valid email") &&
    validate(phone, phoneRegex, "Enter a valid Indian phone number") &&
    validate(age, ageRegex, "Age must be between 18 and 100") &&
    validate(occupation, occupationRegex, "Enter a valid occupation") &&
    validate(address, addressRegex, "Enter a valid address");

  if (!idProof.files.length) {
    showError(idProof, "Please upload an ID proof");
    return;
  }

  if (isValid) {
    alert("Form submitted successfully!");
  }
});