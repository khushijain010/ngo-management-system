document.getElementById("donationForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("donorName").value;
    const email = document.getElementById("donorEmail").value;
    const amount = document.getElementById("donationAmount").value;

    console.log("--- 1. Checking PayHere SDK ---");
    if (typeof payhere === "undefined") {
        alert("Error: PayHere SDK is not loaded. Check your internet or Ad Blocker.");
        return;
    }

    try {
        console.log("--- 2. Sending Request to Backend ---");
        const res = await fetch("http://localhost:5000/api/donation/init", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, amount })
        });

        if (!res.ok) {
            const errText = await res.text();
            throw new Error(errText);
        }

        const paymentData = await res.json();
        console.log("--- 3. Backend Response Received ---", paymentData);

        // Define PayHere Callbacks
        payhere.onCompleted = function (orderId) {
            alert("✅ Payment Completed! Order ID: " + orderId);
            window.location.href = "success.html";
        };

        payhere.onDismissed = function () {
            alert("⚠️ Payment Dismissed");
        };

        payhere.onError = function (error) {
          console.log('onError', error);
          alert("Payment Error: " + error);
        };

        console.log('PAYMENT DATA:', paymentData);
        payhere.startPayment(paymentData);


        // Open the Window
        console.log("--- 4. Opening PayHere Window ---");
        payhere.startPayment(paymentData);

    } catch (err) {
        console.error("❌ DONATION ERROR:", err);
        alert("Failed to start payment: " + err.message);
    }
});