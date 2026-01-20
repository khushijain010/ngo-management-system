const name = localStorage.getItem("name");
const email = localStorage.getItem("email");
const role = localStorage.getItem("role");

if (!email) {
  window.location.href = "auth.html";
}

document.getElementById("profileName").innerText = name;
document.getElementById("profileEmail").innerText = email;
document.getElementById("profileRole").innerText = role;


fetch(`http://localhost:5000/api/donations/user/${email}`)
  .then(res => res.json())
  .then(donations => {
    const list = document.getElementById("donationHistory");
    const emptyMsg = document.getElementById("noDonations");

    list.innerHTML = "";

    if (!donations || donations.length === 0) {
      emptyMsg.style.display = "block";
      return;
    }

    emptyMsg.style.display = "none";

    donations.forEach(d => {
      const div = document.createElement("div");
      div.className = "donation-item";

      div.innerHTML = `
        <div>
          <strong>₹ ${d.amount}</strong>
          <p>Order ID: DON_${d.id}</p>
          <small>${new Date(d.createdAt).toLocaleString()}</small>
        </div>
        <span class="status ${d.status.toLowerCase()}">${d.status}</span>
      `;

      list.appendChild(div);
    });
  })
  .catch(() => {
    document.getElementById("noDonations").innerText =
      "Unable to load donation history";
  });

