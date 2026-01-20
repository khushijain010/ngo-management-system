
document.getElementById("donationForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const name =
    localStorage.getItem("name") ||
    document.getElementById("donorName").value;
  
  const amount = document.getElementById("donationAmount").value;


  if (!amount || amount <= 0) {
    alert("Please enter a valid amount");
    return;
  }


  // Sandbox simulation confirmation
  const proceed = confirm(
    `Proceed with sandbox donation of Rs. ${amount}?`
  );

  if (!proceed) {
    alert("Payment cancelled");
    return;
  }

document.querySelectorAll(".category-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".category-btn")
      .forEach(b => b.classList.remove("active"));

    btn.classList.add("active");
    categoryInput.value = btn.textContent.trim();
  });
});


  // Save ONLY successful donation
  const email = localStorage.getItem("email");
  fetch("http://localhost:5000/api/donations", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      email,
      amount,
      category,
      status: "SUCCESS"
    })
  })
    .then(res => {
      if (!res.ok) throw new Error("Save failed");
      return res.json();
    })
    .then(() => {
      alert("Donation Successful (Sandbox)");
      window.location.href = "success.html";
    })
    .catch(() => {
      alert("Donation failed. Please try again.");
    });
});
