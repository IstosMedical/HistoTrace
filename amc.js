export function createStatusCard(entry) {
  const card = document.createElement("div");
  card.className = "card";

  const statusColor = {
    Warranty: "#22c55e",
    AMC: "#facc15",
    Expired: "#ef4444"
  };

  card.style.border = `2px solid ${statusColor[entry.Status] || "#d1d5db"}`;

  card.innerHTML = `
    <h3>${entry.Customer}</h3>
    <p><strong>Equipment:</strong> ${entry.Equipment}</p>
    <p><strong>Status:</strong> <span style="color:${statusColor[entry.Status] || "#000"}">${entry.Status}</span></p>
    <p><strong>Warranty Expiry:</strong> ${entry["Warranty Expiry"]}</p>
    <p><strong>AMC Expiry:</strong> ${entry["AMC Expiry"]}</p>
  `;

  return card;
}

fetch("https://script.google.com/macros/s/AKfycbzbTMJTuvtsQEUHZyHfpf5u9SrgPboVptTHYrgTT41myd_c8coeb2djh2aUXaP5zF9t/exec?status=Warranty")
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("warrantyCards");
    container.innerHTML = "";
    data.forEach(entry => container.appendChild(createStatusCard(entry)));
  })
  .catch(err => console.error("Failed to load Warranty data:", err));

const spinner = document.getElementById("loadingSpinner");
const container = document.getElementById("warrantyCards");

spinner.style.display = "block"; // Show spinner

fetch("https://script.google.com/macros/s/AKfycbzbTMJTuvtsQEUHZyHfpf5u9SrgPboVptTHYrgTT41myd_c8coeb2djh2aUXaP5zF9t/exec?status=Warranty")
  .then(res => res.json())
  .then(data => {
    container.innerHTML = "";
    data.forEach(entry => container.appendChild(createStatusCard(entry)));
  })
  .catch(err => {
    container.innerHTML = "<p style='color:red;'>Failed to load data.</p>";
    console.error("Fetch error:", err);
  })
  .finally(() => {
    spinner.style.display = "none"; // Hide spinner
  });
