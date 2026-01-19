async function startDonation() {
  const amount = document.getElementById("amount").value;
  const name = localStorage.getItem("name");

  if (!amount || amount <= 0) {
    alert("Enter valid amount");
    return;
  }

  // Simulate sandbox success
  const paymentSuccess = true;

  if (!paymentSuccess) {
    alert("Payment failed");
    return;
  }

  // Store only SUCCESS donations
  const res = await fetch("http://localhost:5000/api/donations", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      amount,
      name,
      status: "SUCCESS"
    })
  });

  if (!res.ok) {
    alert("Donation failed");
    return;
  }

  alert("Donation successful");
}
