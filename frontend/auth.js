const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const tabs = document.querySelectorAll(".tab");

function showLogin() {
  loginForm.style.display = "block";
  registerForm.style.display = "none";

  tabs[0].classList.add("active");
  tabs[1].classList.remove("active");
}

function showRegister() {
  loginForm.style.display = "none";
  registerForm.style.display = "block";

  tabs[1].classList.add("active");
  tabs[0].classList.remove("active");
}

/* TEMP DEMO LOGIC */
loginForm.onsubmit = (e) => {
  e.preventDefault();
  window.location.href = "index.html";
};

registerForm.onsubmit = (e) => {
  e.preventDefault();
  window.location.href = "index.html";
};
