// // 🔒 Protect admin page
// const token = localStorage.getItem("token");
// const role = localStorage.getItem("role");

// if (!token || role !== "ADMIN") {
//   window.location.href = "auth.html";
// }

// // API base
// const API = "http://localhost:5000/api/admin";

// // Elements
// const userList = document.getElementById("userList");
// const donationList = document.getElementById("donationList");

// // Fetch stats
// async function loadStats() {
//   const res = await fetch(`${API}/stats`, {
//     headers: { Authorization: `Bearer ${token}` }
//   });
//   const data = await res.json();

//   document.getElementById("totalUsers").innerText = data.totalUsers;
//   document.getElementById("totalDonations").innerText = data.totalDonations;
//   document.getElementById("totalAmount").innerText = `LKR ${data.totalAmount}`;
//   document.getElementById("pendingFailed").innerText =
//     `${data.pending} / ${data.failed}`;
// }

// // Fetch users
// let users = [];

// async function loadUsers() {
//   const res = await fetch(`${API}/users`, {
//     headers: { Authorization: `Bearer ${token}` }
//   });
//   users = await res.json();
//   renderUsers(users);
// }

// function renderUsers(list) {
//   userList.innerHTML = "";
//   list.forEach(u => {
//     const div = document.createElement("div");
//     div.className = "donation-item";
//     div.innerHTML = `
//       <div>
//         <strong>${u.name}</strong>
//         <p>${u.email}</p>
//       </div>
//       <span>${u.role}</span>
//     `;
//     userList.appendChild(div);
//   });
// }

// // Search filter
// document.getElementById("userSearch").addEventListener("input", e => {
//   const value = e.target.value.toLowerCase();
//   const filtered = users.filter(u =>
//     u.email.toLowerCase().includes(value)
//   );
//   renderUsers(filtered);
// });

// // Export CSV
// function exportUsers() {
//   let csv = "Name,Email,Role,Joined\n";
//   users.forEach(u => {
//     csv += `${u.name},${u.email},${u.role},${u.createdAt}\n`;
//   });

//   const blob = new Blob([csv], { type: "text/csv" });
//   const url = URL.createObjectURL(blob);
//   const a = document.createElement("a");
//   a.href = url;
//   a.download = "users.csv";
//   a.click();
// }

// // Fetch donations
// async function loadDonations() {
//   const res = await fetch(`${API}/donations`, {
//     headers: { Authorization: `Bearer ${token}` }
//   });
//   const donations = await res.json();

//   donationList.innerHTML = "";
//   donations.forEach(d => {
//     const div = document.createElement("div");
//     div.className = "donation-item";
//     div.innerHTML = `
//       <div>
//         <strong>LKR ${d.amount}</strong>
//         <p>${new Date(d.createdAt).toLocaleString()}</p>
//       </div>
//       <span class="status ${d.status.toLowerCase()}">${d.status}</span>
//     `;
//     donationList.appendChild(div);
//   });
// }

// // INIT
// loadStats();
// loadUsers();
// loadDonations();


// 🔒 Protect admin page
const token = localStorage.getItem("token");
const role = localStorage.getItem("role");

if (!token || role !== "ADMIN") {
  window.location.href = "auth.html";
}

// Fetch ONLY successful donations
async function loadDonations() {
  const res = await fetch("http://localhost:5000/api/donations/admin");
  const donations = await res.json();

  const donationList = document.getElementById("donationList");
  donationList.innerHTML = "";

  donations.forEach(d => {
    const div = document.createElement("div");
    div.className = "donation-item";
    div.innerHTML = `
      <strong>${d.name}</strong>
      <p>₹${d.amount}</p>
      <small>${new Date(d.createdAt).toLocaleString()}</small>
    `;
    donationList.appendChild(div);
  });
}

loadDonations();
