const form = document.getElementById("donationForm");
const message = document.getElementById("message");
const button = document.getElementById("donateBtn");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  button.disabled = true;
  button.textContent = "Processing...";
  message.textContent = "";

  const donorName = document.getElementById("name").value;
  const donorEmail = document.getElementById("email").value;
  const amount = document.getElementById("amount").value;

  try {
    const res = await fetch("http://localhost:5000/api/donations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ donorName, donorEmail, amount }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message || "Failed");

    message.style.color = "green";
    message.textContent = "Donation created. Proceeding to payment...";

    console.log("Donation created:", data);

    // NEXT: redirect to payment (Person A handles backend)

  } catch (err) {
    message.style.color = "red";
    message.textContent = err.message;
  } finally {
    button.disabled = false;
    button.textContent = "Send Donation ❤️";
  }
});
