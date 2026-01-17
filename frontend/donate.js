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

let selectedCategory = "People";
let selectedCause = null;

const causeListEl = document.getElementById("causeList");
const searchInput = document.querySelector(".search-box input");

function renderCauses() {
  causeListEl.innerHTML = "";

  const filtered = causes.filter(cause => {
    const matchesCategory = cause.category === selectedCategory;
    const matchesSearch =
      cause.title.toLowerCase().includes(searchInput.value.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  filtered.forEach(cause => {
    const div = document.createElement("div");
    div.className = "cause-card";
    div.innerHTML = `
      <h4>${cause.title}</h4>
      <p>${cause.description}</p>
    `;
    div.onclick = () => selectCause(cause);
    causeListEl.appendChild(div);
  });
}

function selectCause(cause) {
  selectedCause = cause;
  document.getElementById("message").innerText =
    `Selected Cause: ${cause.title}`;
}

searchInput.addEventListener("input", renderCauses);

// Category buttons
document.querySelectorAll(".cat").forEach(cat => {
  cat.onclick = () => {
    document.querySelectorAll(".cat").forEach(c => c.classList.remove("active"));
    cat.classList.add("active");
    selectedCategory = cat.innerText;
    renderCauses();
  };
});

renderCauses();

document.getElementById("donationForm").onsubmit = async (e) => {
  e.preventDefault();

  if (!selectedCause) {
    alert("Please select a cause before donating");
    return;
  }

  const amount = document.getElementById("amount").value;

  const payload = {
    amount,
    causeId: selectedCause.id,
    causeTitle: selectedCause.title,
    category: selectedCause.category,
  };

  // send to backend later
  console.log("Donation Payload:", payload);
};
