const form = document.getElementById("donationForm");
const message = document.getElementById("message");
const button = document.getElementById("donateBtn");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  message.textContent = "";
  button.disabled = true;
  button.textContent = "Processing...";

  const donorName = document.getElementById("name").value;
  const donorEmail = document.getElementById("email").value;
  const amount = document.getElementById("amount").value;

  try {
    const res = await fetch("http://localhost:5000/api/donations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        donorName,
        donorEmail,
        amount,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Something went wrong");
    }

    message.style.color = "green";
    message.textContent = "Donation created. Redirecting to payment...";

    console.log("Donation:", data);

    // NEXT STEP: redirect to PayHere (Step 8)
    // window.location.href = `/pay.html?orderId=${data.orderId}`;

  } catch (err) {
    message.style.color = "red";
    message.textContent = err.message;
  } finally {
    button.disabled = false;
    button.textContent = "Donate Now";
  }
});
