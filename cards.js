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
