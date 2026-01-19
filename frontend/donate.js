document.getElementById("donationForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = localStorage.getItem("name") || 
               document.getElementById("donorName").value;
  const amount = document.getElementById("donationAmount").value;

  if (typeof payhere === "undefined") {
    alert("PayHere SDK not loaded");
    return;
  }

  const payment = {
    sandbox: true,
    merchant_id: "1233650", // sandbox merchant id
    return_url: "http://127.0.0.1:5500/success.html",
    cancel_url:  "http://127.0.0.1:5500/cancel.html",
    notify_url: "http://localhost/api/payhere/notify",
    order_id: "DON_" + Date.now(),
    items: "NGO Donation",
    amount: amount,
    currency: "LKR",
    first_name: name,
    last_name: "Donor",
    email: "test@test.com",
    phone: "0771234567",
    address: "Colombo",
    city: "Colombo",
    country: "Sri Lanka"
  };

  payhere.onCompleted = async function () {
    // ✅ save ONLY after success
    await fetch("http://localhost:5000/api/donations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        amount,
        status: "SUCCESS"
      })
    });

    alert("Donation Successful!");
    window.location.href = "success.html";
  };

  payhere.onDismissed = function () {
    alert("Payment cancelled");
  };

  payhere.onError = function (error) {
    alert("Payment error: " + error);
  };

  payhere.startPayment(payment);
});
