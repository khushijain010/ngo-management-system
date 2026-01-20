document.getElementById("donationForm").addEventListener("submit", function (e) {
  e.preventDefault();

  if (typeof payhere === "undefined") {
    alert("PayHere SDK not loaded");
    return;
  }

  const name = document.getElementById("donorName").value;
  const email = document.getElementById("donorEmail").value;
  const amount = document.getElementById("donationAmount").value;

  if (!amount || amount <= 0) {
    alert("Enter a valid amount");
    return;
  }

  const orderId = "DON_" + Date.now();

  const payment = {
    sandbox: true, // ✅ THIS enables sandbox
    merchant_id: "1233650", // PayHere SANDBOX merchant ID
    return_url: "success.html",
    cancel_url: "index.html",
    notify_url: "http://localhost:5000/api/donation/notify",

    order_id: orderId,
    items: "NGO Donation",
    amount: amount,
    currency: "LKR",

    first_name: name,
    last_name: "Donor",
    email: email,
    phone: "0771234567",
    address: "Colombo",
    city: "Colombo",
    country: "Sri Lanka"
  };

  // 🔔 Payment completed
  payhere.onCompleted = function (orderId) {
    fetch("http://localhost:5000/api/donations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        amount,
        status: "SUCCESS"
      })
    });

    alert("Donation successful 💜");
    window.location.href = "donations.html";
  };

  // ❌ Payment cancelled
  payhere.onDismissed = function () {
    alert("Payment cancelled");
  };

  // ⚠️ Error
  payhere.onError = function (error) {
    alert("Payment error: " + error);
  };

  // 🚀 OPEN PAYHERE SANDBOX POPUP
  payhere.startPayment(payment);
});
