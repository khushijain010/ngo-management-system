const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const tabs = document.querySelectorAll(".tab");

/* =========================
   TAB SWITCHING
========================= */
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

/* =========================
   LOGIN
========================= */
/*loginForm.onsubmit = async (e) => {
  e.preventDefault();

  const email = loginForm.querySelector('input[type="email"]').value;
  const password = loginForm.querySelector('input[type="password"]').value;

  const res = await fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (!res.ok) {
    alert(data.message || "Login failed");
    return;
  }

  // ✅ STORE AUTH DATA
  localStorage.setItem("token", data.token);
  localStorage.setItem("role", data.user.role);

  // 🔀 ROLE BASED REDIRECT
  if (data.user.role === "admin") {
    window.location.href = "admin.html";
  } else {
    window.location.href = "index.html";
  }
};*/
loginForm.onsubmit = (e) => {
  e.preventDefault();
  localStorage.setItem("token", "test-token");
  localStorage.setItem("role", "admin");

  window.location.href = "admin.html";
};
registerForm.onsubmit = async (e) => {
  e.preventDefault();

  const name = registerForm.querySelector('input[type="text"]').value;
  const email = registerForm.querySelector('input[type="email"]').value;
  const password = registerForm.querySelector('input[type="password"]').value;
  const role = registerForm.querySelector("select").value;

  const res = await fetch("http://localhost:5000/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password, role })
  });

  const data = await res.json();

  if (!res.ok) {
    alert(data.message || "Registration failed");
    return;
  }

  // ✅ STORE AUTH DATA
  localStorage.setItem("token", data.token);
  localStorage.setItem("role", data.user.role);

  // 🔀 ROLE BASED REDIRECT
  if (data.user.role === "admin") {
    window.location.href = "admin.html";
  } else {
    window.location.href = "index.html";
  }
};
document.addEventListener("DOMContentLoaded", () => {
  console.log("auth.js loaded");

  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  const tabs = document.querySelectorAll(".tab");

  if (!loginForm || !registerForm) {
    alert("Forms not found. Check IDs.");
    return;
  }

  /* =========================
     TAB SWITCHING
  ========================= */
  window.showLogin = function () {
    loginForm.style.display = "block";
    registerForm.style.display = "none";

    tabs[0].classList.add("active");
    tabs[1].classList.remove("active");
  };

  window.showRegister = function () {
    loginForm.style.display = "none";
    registerForm.style.display = "block";

    tabs[1].classList.add("active");
    tabs[0].classList.remove("active");
  };

  /* =========================
     LOGIN (TEMP MOCK)
  ========================= */
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("Login clicked");

    // TEMP ADMIN LOGIN
    localStorage.setItem("token", "test-token");
    localStorage.setItem("role", "admin");

    window.location.href = "admin.html";
  });

  /* =========================
     REGISTER (TEMP)
  ========================= */
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Register clicked (backend not wired yet)");
  });
});
