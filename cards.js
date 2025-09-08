export function createStatusCard(entry) {
  const card = document.createElement("div");
  card.className = "card";

  const statusColor = {
    Warranty: "#22c55e",
    AMC: "#facc15",
    Expired: "#ef4444"
  };

  card.style.border = `2px solid ${statusColor[entry.Status] || "#d1d5db"}`;

  function formatDate(raw) {
    const date = new Date(raw);
    if (isNaN(date)) return raw;
    const day = String(date.getDate()).padStart(2, "0");
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

const alertMsg = entry["Alert msg"] || "";
let alertColor = "#6b7280"; // default gray
let alertEmoji = "ℹ️";

if (alertMsg.includes("Warranty Active")) {
  alertColor = "#22c55e"; // green
  alertEmoji = "✅";
} else if (alertMsg.includes("No Warranty Date")) {
  alertColor = "#ef4444"; // red
  alertEmoji = "❌";
} else if (alertMsg.includes("Warranty Expired")) {
  alertColor = "#ef4444"; // red
  alertEmoji = "🔴";
} else if (alertMsg.includes("Follow up")) {
  alertColor = "#facc15"; // yellow
  alertEmoji = "🟡";
}


card.innerHTML = `
  <h3>${entry.Customer}</h3>
  <p><strong>Equipment:</strong> ${entry.Equipment}</p>
  <p><strong>Status:</strong> <span style="color:${statusColor[entry.Status] || "#000"}">${entry.Status}</span></p>
  <p><strong>Warranty Expiry:</strong> ${formatDate(entry["Warranty Expiry"])}</p>
  <p><strong>AMC Expiry:</strong> ${formatDate(entry["AMC Expiry"])}</p>
  <p><strong>Alert:</strong> <span style="color:${alertColor}">${alertEmoji} ${alertMsg}</span></p>
`;

  return card;
}
