// 🌀 Spinner toggle
function toggleSpinner(show) {
  document.getElementById("spinner").style.display = show ? "block" : "none";
}

// ✅ Toast feedback
function showToast(message, success = true) {
  const toast = document.createElement("div");
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%);
    background: ${success ? "#28a745" : "#dc3545"}; color: white;
    padding: 10px 20px; border-radius: 5px; z-index: 9999;
  `;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

// 📡 Fetch installation details
window.fetchInstallation = async function () {
  const customer = document.getElementById("searchInput").value.trim();
  if (!customer) return showToast("❗ Enter a customer name", false);

  toggleSpinner(true);
  try {
    const res = await fetch(`https://script.google.com/macros/s/AKfycbyesB2CEglAW9p0RHy3U4WMLfGiOgSkLJwUKSedOjkrGse29woYUvbjDZnwht_c4v4y/exec?customer=${encodeURIComponent(customer)}`);
    const data = await res.json();
    document.getElementById("installationDetails").innerHTML = `
      <p><strong>Machine:</strong> ${data.machine || "N/A"}</p>
      <p><strong>Installed On:</strong> ${data.date || "N/A"}</p>
    `;
  } catch (err) {
    showToast("❌ Failed to fetch installation", false);
  } finally {
    toggleSpinner(false);
  }
};

// 💾 Save service entry
document.getElementById("saveButton").addEventListener("click", async () => {
  const payload = {
    serviceDate: document.getElementById("serviceDate").value,
    issueReported: document.getElementById("issueReported").value,
    actionTaken: document.getElementById("actionTaken").value,
    technicianName: document.getElementById("technicianName").value,
    customerName: document.getElementById("searchInput").value
  };

  if (!payload.serviceDate || !payload.issueReported || !payload.technicianName) {
    return showToast("❗ Fill all required fields", false);
  }

  toggleSpinner(true);
  try {
    const res = await fetch("https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" }
    });
    const result = await res.json();
    showToast(result.status || "✅ Service saved");
    document.getElementById("serviceForm").reset();
  } catch (err) {
    showToast("❌ Error saving service", false);
  } finally {
    toggleSpinner(false);
  }
});

// 🛠️ Modal logic
window.openServiceModal = function () {
  document.getElementById("serviceModal").classList.remove("hidden");
};

window.closeServiceModal = function () {
  document.getElementById("serviceModal").classList.add("hidden");
};

window.saveModalServiceEntry = function () {
  const modalData = {
    serviceDate: document.getElementById("modalServiceDate").value,
    issueReported: document.getElementById("modalIssueReported").value,
    actionTaken: document.getElementById("modalActionTaken").value,
    technicianName: document.getElementById("modalTechnicianName").value
  };

  // You can extend this to update history or send to backend
  showToast("✅ Modal service saved");
  closeServiceModal();
};
