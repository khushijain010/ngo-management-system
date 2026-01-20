// document.addEventListener("DOMContentLoaded", () => {
//   console.log("auth.js loaded");

//   const loginForm = document.getElementById("loginForm");
//   const registerForm = document.getElementById("registerForm");
//   const tabs = document.querySelectorAll(".tab");

//   if (!loginForm || !registerForm) {
//     console.error("Forms not found");
//     return;
//   }

//   /* =========================
//      TAB SWITCHING
//   ========================= */
//   window.showLogin = function () {
//     loginForm.style.display = "block";
//     registerForm.style.display = "none";
//     tabs[0].classList.add("active");
//     tabs[1].classList.remove("active");
//   };

//   window.showRegister = function () {
//     loginForm.style.display = "none";
//     registerForm.style.display = "block";
//     tabs[1].classList.add("active");
//     tabs[0].classList.remove("active");
//   };

//   /* =========================
//      REGISTER
//   ========================= */
//   registerForm.addEventListener("submit", async (e) => {
//     e.preventDefault();
//     console.log("Register clicked");

//     const name = registerForm.querySelector('input[type="text"]').value;
//     const email = registerForm.querySelector('input[type="email"]').value;
//     const password = registerForm.querySelector('input[type="password"]').value;

//     const res = await fetch("http://localhost:5000/api/auth/register", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ name, email, password })
//     });

//     const data = await res.json();

//     if (!res.ok) {
//       alert(data.message || "Registration failed");
//       return;
//     }

//     alert("Registration successful. Please login.");
//     showLogin();
//   });

//   /* =========================
//      LOGIN
//   ========================= */
//   loginForm.addEventListener("submit", async (e) => {
//     e.preventDefault();
//     console.log("Login clicked");

//     const email = loginForm.querySelector('input[type="email"]').value;
//     const password = loginForm.querySelector('input[type="password"]').value;

//     const res = await fetch("http://localhost:5000/api/auth/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, password })
//     });

//     const data = await res.json();

//     if (!res.ok) {
//       alert(data.message || "Login failed");
//       return;
//     }

//     localStorage.setItem("token", data.token);
//     localStorage.setItem("role", data.user.role);

//     if (data.user.role === "ADMIN") {
//       window.location.href = "admin.html";
//     } else {
//       window.location.href = "index.html";
//     }
//   });
// });







const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const tabs = document.querySelectorAll(".tab");

// Tab switching
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

// REGISTER (MOCK, WORKING)
registerForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = registerForm.querySelector('input[type="text"]').value;
  const email = registerForm.querySelector('input[type="email"]').value;

  const role =
    email === "chikki240806@gmail.com" ? "ADMIN" : "USER";
  const password = registerForm.querySelector(
  'input[type="password"]'
).value;

  localStorage.setItem("registeredUser", JSON.stringify({
    name,
    email,
    password,
    role
  }));

  alert("Registration successful. Please login.");
  showLogin();
});

// LOGIN (MOCK, WORKING)
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = loginForm.querySelector('input[type="email"]').value;
  const password = loginForm.querySelector(
    'input[type="password"]'
  ).value;

  //  AUTO-ADMIN LOGIN (NO REGISTER NEEDED)
  if (email === "chikki240806@gmail.com") {
    localStorage.setItem("token", "mock-token");
    localStorage.setItem("role", "ADMIN");
    localStorage.setItem("name", "Admin");
    window.location.href = "admin.html";
    return;
  }

  //  NORMAL USER LOGIN (REGISTER REQUIRED)
  const stored = JSON.parse(localStorage.getItem("registeredUser"));

  if (!stored || stored.email !== email || stored.password !== password) {
    alert("Invalid email or password");
    return;
  }

  localStorage.setItem("token", "mock-token");
  localStorage.setItem("role", stored.role);
  localStorage.setItem("name", stored.name);
  localStorage.setItem("email", email);

  window.location.href = "index.html";
});

